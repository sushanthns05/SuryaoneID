import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { FieldValue, Timestamp, Transaction } from 'firebase-admin/firestore';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { applicationId, adminUid } = await request.json();

    if (!applicationId || !adminUid) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Verify admin
    // In a real app, you would verify the session cookie or authorization header using adminAuth.verifySessionCookie()
    // Here we'll just check if the user is an admin in the database
    const adminDoc = await adminDb.collection('users').doc(adminUid).get();
    if (!adminDoc.exists || adminDoc.data()?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const appRef = adminDb.collection('applications').doc(applicationId);
    
    // We run the generation in a transaction
    const generatedId = await adminDb.runTransaction(async (transaction: Transaction) => {
      const appDoc = await transaction.get(appRef);
      if (!appDoc.exists) {
        throw new Error('Application not found');
      }
      
      const appData = appDoc.data()!;
      if (appData.status === 'Approved') {
        throw new Error('Application is already approved');
      }
      
      const userId = appData.userId;
      const type = appData.credentialType || 'SOID';
      
      const counterRef = adminDb.collection('metadata').doc('counters');
      const counterDoc = await transaction.get(counterRef);
      
      let currentCount = 0;
      const counterKey = `${type.toLowerCase()}Count`;
      
      if (counterDoc.exists) {
        currentCount = counterDoc.data()?.[counterKey] || 0;
      }
      
      const nextCount = currentCount + 1;
      transaction.set(counterRef, { [counterKey]: nextCount }, { merge: true });
      
      const year = new Date().getFullYear();
      const paddedCount = nextCount.toString().padStart(6, '0');
      const newCredentialId = `${type}-${year}-${paddedCount}`;
      
      const verificationHash = crypto.createHash('sha256').update(`${newCredentialId}-${userId}-${Date.now()}`).digest('hex');
      
      const credentialRef = adminDb.collection('credentials').doc(newCredentialId);
      
      const credentialData = {
        credentialId: newCredentialId,
        type: type,
        userId: userId,
        applicantName: appData.applicantName || 'Unknown',
        applicationId: applicationId,
        issuedAt: FieldValue.serverTimestamp(),
        expiresAt: Timestamp.fromDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1))),
        status: 'Active',
        verificationHash: verificationHash,
        data: appData.credentialData || {},
        email: appData.email || '',
        photoUrl: appData.photoUrl || ''
      };
      
      transaction.set(credentialRef, credentialData);
      
      // Update application status
      transaction.update(appRef, { status: 'Approved', updatedAt: FieldValue.serverTimestamp() });
      
      // Update User profile if it's SOID
      if (type === 'SOID') {
        const userRef = adminDb.collection('users').doc(userId);
        transaction.set(userRef, {
          oneId: newCredentialId,
          updatedAt: FieldValue.serverTimestamp()
        }, { merge: true });
      }
      
      return newCredentialId;
    });

    // Add Audit Log (outside transaction to avoid limits if needed, but could be inside)
    await adminDb.collection('auditLogs').add({
      action: 'CREDENTIAL_ISSUED',
      adminId: adminUid,
      applicationId: applicationId,
      credentialId: generatedId,
      timestamp: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, credentialId: generatedId }, { status: 200 });

  } catch (error: any) {
    console.error('Error approving application:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

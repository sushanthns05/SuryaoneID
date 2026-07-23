import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const auth = getAdminAuth();
    const db = getAdminDb();
    const email = 'admin@gmail.com';
    const password = 'admin@1410';
    let uid = '';

    try {
      const userRecord = await auth.getUserByEmail(email);
      uid = userRecord.uid;
      // Update password just in case
      await auth.updateUser(uid, { password });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        const userRecord = await auth.createUser({
          email,
          password,
          displayName: 'System Admin',
          emailVerified: true
        });
        uid = userRecord.uid;
      } else {
        throw error;
      }
    }

    // Set admin role in Firestore
    await db.collection('users').doc(uid).set({
      email,
      name: 'System Admin',
      role: 'admin',
      createdAt: new Date()
    }, { merge: true });

    return NextResponse.json({ success: true, message: 'Admin account created/updated successfully', uid });
  } catch (error: any) {
    console.error('Failed to seed admin:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

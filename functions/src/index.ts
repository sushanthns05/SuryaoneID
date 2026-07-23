import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Trigger when an application status is updated to 'Approved'
export const onApplicationApproved = functions.firestore
  .document("applications/{applicationId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();

    // Only proceed if status changed to 'Approved'
    if (newData.status === "Approved" && previousData.status !== "Approved") {
      const userId = newData.userId;
      const type = newData.credentialType || "SOID"; // default to SOID if not specified
      
      const counterRef = db.collection("metadata").doc("counters");
      
      const generatedId = await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let currentCount = 0;
        
        // Use a specific counter for each credential type
        const counterKey = `${type.toLowerCase()}Count`;
        
        if (counterDoc.exists) {
          currentCount = counterDoc.data()?.[counterKey] || 0;
        }
        
        const nextCount = currentCount + 1;
        transaction.set(counterRef, { [counterKey]: nextCount }, { merge: true });
        
        // Format ID: TYPE-YYYY-000001
        const year = new Date().getFullYear();
        const paddedCount = nextCount.toString().padStart(6, '0');
        const newCredentialId = `${type}-${year}-${paddedCount}`;
        
        const crypto = require("crypto");
        const verificationHash = crypto.createHash("sha256").update(`${newCredentialId}-${userId}-${Date.now()}`).digest("hex");

        // 3. Create the Credential record
        const credentialRef = db.collection("credentials").doc(newCredentialId);
        
        // Dynamic data extraction from application
        const credentialData: any = {
          credentialId: newCredentialId,
          type: type,
          userId: userId,
          applicantName: newData.applicantName || "Unknown",
          applicationId: context.params.applicationId,
          issuedAt: admin.firestore.FieldValue.serverTimestamp(),
          expiresAt: admin.firestore.Timestamp.fromDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1))), // 1 year expiry
          status: "Active",
          verificationHash: verificationHash,
          // Extract specific data fields from the application
          data: newData.credentialData || {}
        };

        transaction.set(credentialRef, credentialData);
        return newCredentialId;
      });

      // 4. Update the User profile
      // Only set oneId if it's an SOID, otherwise append to a list of credentials or just let the credentials collection handle it.
      if (type === 'SOID') {
        await db.collection("users").doc(userId).set({
          oneId: generatedId,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }

      // 5. Add Audit Log
      await db.collection("auditLogs").add({
        action: "CREDENTIAL_ISSUED",
        userId: userId,
        applicationId: context.params.applicationId,
        credentialId: generatedId,
        type: type,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log(`Credential ${generatedId} successfully issued for user ${userId}`);
    }
    
    return null;
  });

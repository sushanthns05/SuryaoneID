"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onApplicationApproved = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// Trigger when an application status is updated to 'Approved'
exports.onApplicationApproved = functions.firestore
    .document("applications/{applicationId}")
    .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    // Only proceed if status changed to 'Approved'
    if (newData.status === "Approved" && previousData.status !== "Approved") {
        const userId = newData.userId;
        // 1. Generate sequential SOID number
        // In production, you would use a transaction with a counter document to avoid race conditions.
        const counterRef = db.collection("metadata").doc("counters");
        const newSoid = await db.runTransaction(async (transaction) => {
            var _a;
            const counterDoc = await transaction.get(counterRef);
            let currentCount = 0;
            if (counterDoc.exists) {
                currentCount = ((_a = counterDoc.data()) === null || _a === void 0 ? void 0 : _a.soidCount) || 0;
            }
            const nextCount = currentCount + 1;
            transaction.set(counterRef, { soidCount: nextCount }, { merge: true });
            // Format SOID: SOID-2026-000001
            const year = new Date().getFullYear();
            const paddedCount = nextCount.toString().padStart(6, '0');
            const generatedSoid = `SOID-${year}-${paddedCount}`;
            // 2. Generate Verification Hash (simplified for demo)
            const crypto = require("crypto");
            const verificationHash = crypto.createHash("sha256").update(`${generatedSoid}-${userId}-${Date.now()}`).digest("hex");
            // 3. Create the Credential record
            const credentialRef = db.collection("credentials").doc();
            const credentialData = {
                credentialId: credentialRef.id,
                soid: generatedSoid,
                userId: userId,
                applicationId: context.params.applicationId,
                accountType: newData.accountType,
                issuedAt: admin.firestore.FieldValue.serverTimestamp(),
                expiresAt: admin.firestore.Timestamp.fromDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1))),
                status: "Active",
                verificationHash: verificationHash,
            };
            transaction.set(credentialRef, credentialData);
            return generatedSoid;
        });
        // 4. Update the User profile with the new SOID
        await db.collection("users").doc(userId).set({
            oneId: newSoid,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        // 5. Add Audit Log
        await db.collection("auditLogs").add({
            action: "CREDENTIAL_ISSUED",
            userId: userId,
            applicationId: context.params.applicationId,
            soid: newSoid,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`Credential ${newSoid} successfully issued for user ${userId}`);
    }
    return null;
});
//# sourceMappingURL=index.js.map
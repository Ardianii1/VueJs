import admin from "firebase-admin";

import serviceAccount from "../credentials/policemanagementsystem-firebase-adminsdk-fmft0-f6090d8c8d.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

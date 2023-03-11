import admin from "firebase-admin";

import serviceAccount from "../credentials/projekti-ec037-firebase-adminsdk-9vzoe-8591c48019.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

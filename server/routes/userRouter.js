import express from "express";
import userController from "../controllers/userController";
const admin = require("firebase-admin");
const router = express.Router();

router.post("/register", userController.register);
router.get("/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) =>
      userRecord.toJSON()
    );
    res.json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).send("Error listing users");
  }
});

export default router;

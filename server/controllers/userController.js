import { ReasonPhrases, StatusCodes } from "http-status-codes";
import admin from "../services/firebase";
import registerUserSchema from "../validators/user/registerUserSchema";

const adminEmails = [
  "ah54088@ubt-uni.net",
  "rumejsakadiri@ubt-uni.net",
  "vesagashi@ubt-uni.net",
  "agnesaramadani@ubt-uni.net",
];

export default {
  register: async (req, res) => {
    // validate the user input
    const validationResult = registerUserSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validationResult.error.message,
        message: ReasonPhrases.BAD_REQUEST,
      });
    }

    const { name, email, password } = req.body;
    try {
      const user = await admin.auth().createUser({
        email,
        password,
      });

      await admin.auth().updateUser(user.uid, { displayName: name });

      if (adminEmails.includes(user.email)) {
        const userClaim = { role: "admin" };
        await admin.auth().setCustomUserClaims(user.uid, userClaim);
        await admin.firestore().collection("roles").doc(user.uid).set({
          email: user.email,
          role: userClaim,
        });
      } else {
        const userClaim = { role: "user" };
        await admin.auth().setCustomUserClaims(user.uid, userClaim);
        await admin.firestore().collection("roles").doc(user.uid).set({
          email: user.email,
          role: userClaim,
        });
      }

      return res.json({ user });
    } catch (error) {
      console.log(error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.code, message: error.message });
    }
  },
};

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

async function signupUser(payload) {
  const { name, email, password } = payload;

  const auth = getAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(result.user, {
    displayName: name,
  });

  await signOut(auth);
}

export default signupUser;

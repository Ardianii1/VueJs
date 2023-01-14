import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

async function loginUser(payload) {
  const auth = getAuth();

  // const email = payload.email;
  // const password = payload.password;
  const { email, password } = payload;

  return await signInWithEmailAndPassword(auth, email, password);
}

export default loginUser;

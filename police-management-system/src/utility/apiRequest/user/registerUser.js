import apiCaller from "../apiCaller";

const registerUser = async (payload) => {
  try { 
    await apiCaller.post("/users/register", payload);
  } catch(error) {
    throw error;
  }
}

export default registerUser;

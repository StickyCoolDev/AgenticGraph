"use server"; 
import { createUserWithEmailAndPassword, sendEmailVerification, UserCredential } from "firebase/auth";
import { auth } from "../lib/firebase/client";



export async function handleSignup(formData: FormData) {
  const email = formData.get("email") as string ;
  const password = formData.get("password") as string; 

  if (!email || !password){
    throw new Error("No password or email");
  }

  console.log(`[INFO]: Attempting to log in with: Email: ${email}.`)
  
  if (password.length < 6){
    throw new Error("Password has to be more than 6 charecter.");
    
  }

  let user : UserCredential;
  try {
    user = await createUserWithEmailAndPassword(auth, email, password);
    
  } catch (error) {
    throw error;
  }
  if (user){
    console.log("[INFO]: User login sucsesful. Sending email verification.");
    await sendEmailVerification(user.user);
  }
}


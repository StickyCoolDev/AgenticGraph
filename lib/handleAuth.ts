"use server";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import { FirebaseError } from "firebase/app";
import {Logger} from '@/lib/logger';

const minPasswordLength: number = 8;

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions,
  );
  return session;
}

// handling signup
export async function handleSignup(formData: FormData) {
  // change all console.error to throw new Error so
  // we can display ui in the tsx acordingly
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const userName = formData.get("name") as string;

  let inputErrors: string = "Missing ";
  if (!email) {
    inputErrors += "email ";
  }
  if (!userName) {
    inputErrors += "name ";
  }
  if (!password || !confirmPassword) {
    inputErrors += "passwords ";
  }

  if (inputErrors != "Missing ") {
    throw new Error(inputErrors);
  }

  if (password.length < minPasswordLength) {
    throw new Error(
      `Password has to be more than or equal to ${minPasswordLength} charecter.`,
    );
  }
  if (confirmPassword != password) {
    throw new Error("Password and Confirm password dont match");
  }

  let user: UserCredential | null = null;

  try {
    console.log(`[INFO]: Attempting to create acount with: Email: ${email}.`);
    user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user.user, { displayName: userName });
  } catch (e) {
    const error = e as FirebaseError;
    throw new Error("A error happend while signin : " + error.message);
  }
  if (user) {
    Logger.info("User login sucsesful. Sending email verification.");
    await sendEmailVerification(user.user);
    const session = await getSession(); // removed as i am getting to much emails
    // Sometimes this email is marked as spam in gmail , so also check the spam tab
    session.userID = user.user.uid;
    session.loggedIn = true;
    session.verefiedEmail = false;

    await session.save();

    Logger.info("Data saved to session with iron-session");
    return { success: true, message: "Sign in successful." };
  }
}

export async function handleSignin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing password or email, please input both");
  }

  let user: UserCredential | null;

  try {
    user = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    Logger.error("[ERROR] A error happend while signin" + error)
    throw new Error("[ERROR] A error happend while signin" + error);

  }

  if (user) {
    const session = await getSession();
    session.userID = user.user.uid;
    session.loggedIn = true;
    session.verefiedEmail = false;

    await session.save();
  }
}

export async function Logout() {
  const session = await getSession();
  session.destroy();
  Logger.info("Logout success")
}

import { SessionOptions } from "iron-session";

export interface SessionData {
  userID: string;
  verefiedEmail: boolean;
  loggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,

  cookieName: "AgenticGraphSession",

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export const defaultSession: SessionData = {
  loggedIn: false,
  verefiedEmail: false,
  userID: "",
};

"use client";

import { useEffect } from "react"; // 👈 1. Import useEffect
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { handleSignup } from "@/lib/handleAuth";
import { auth } from "@/lib/firebase/client";
// 👇 2. Import getRedirectResult
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  // 👇 3. Add this useEffect hook
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // This is where you get the user info after redirect
          const user = result.user;
          const idToken = await user.getIdToken();

          console.info("User details after redirect:", user);
          console.info("User ID Token:", idToken);

          // You can now redirect them to a dashboard, update state, etc.
        }
      } catch (error) {
        console.error("Google Redirect result error: " + error);
      }
    };

    checkAuth();
  }, []); // The empty array [] means this runs once when the component mounts

  // This function is now correct. It just *starts* the redirect.
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google Sign-in error: " + error);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSignup}>
          <FieldGroup>
            {/* ...your form fields... */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

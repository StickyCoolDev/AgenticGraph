import { SignupForm } from "@/components/signup-form";
import { getSession } from "@/lib/handleAuth";
import { Logger } from '@/lib/logger'
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getSession();
  if (session.loggedIn == true) {
    Logger.info("User already logged in, session found. Redirecting to /message to show message")
    redirect("message/?title=Already logged in&description=");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}

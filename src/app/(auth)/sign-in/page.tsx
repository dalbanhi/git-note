import React from "react";
import LoginForm from "~/components/shared/Form/Login/LoginForm";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getSession();

  console.log("session: ", session);
  if (session) {
    if (!session?.hasOnboarded) {
      console.log("redirecting to onboarding");
      redirect("/onboarding?step=1");
    } else if (session?.hasOnboarded) {
      redirect("/");
    }
  }

  return (
    <div className="mt-4 w-5/12 text-myWhite-100">
      <LoginForm type="sign-in" title="Login" />
    </div>
  );
};

export default SignIn;

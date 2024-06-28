import React from "react";
import LoginForm from "@/components/shared/Form/Login/LoginForm";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getSession();

  if (session) {
    if (!session?.hasOnboarded) {
      redirect("/onboarding?step=1");
    } else if (session?.hasOnboarded) {
      redirect("/");
    }
  }

  return (
    <div className=" max_sm:w-full mt-4 text-myWhite-100 sm:w-5/12">
      <LoginForm type="sign-in" title="Login" />
    </div>
  );
};

export default SignIn;

import React from "react";
import LoginForm from "@/components/shared/Form/Login/LoginForm";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getSession();

  if (session) {
    if (!session?.hasOnboarded) {
      redirect("/onboarding?step=1");
    } else if (session?.hasOnboarded) {
      redirect("/");
    }
  }
  return (
    <div className="mt-4 text-myWhite-100 max-sm:w-full max-sm:p-4 md:w-5/12">
      <LoginForm type="sign-up" title="Create an Account" />
    </div>
  );
};

export default SignUp;

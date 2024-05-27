import React from "react";
import LoginForm from "~/components/shared/Form/Login/LoginForm";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mt-4 w-5/12 text-myWhite-100">
      <LoginForm type="sign-in" title="Login" />
    </div>
  );
};

export default SignIn;

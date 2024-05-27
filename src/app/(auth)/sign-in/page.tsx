import React from "react";
import LoginForm from "~/components/shared/Form/Login/LoginForm";

const SignIn = () => {
  return (
    <div className="mt-4 w-5/12 text-myWhite-100">
      <LoginForm type="sign-in" title="Login" />
    </div>
  );
};

export default SignIn;

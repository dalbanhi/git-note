"use client";
import React from "react";
import LoginForm from "@components/shared/Form/Login/LoginForm";

const SignUp = () => {
  return (
    <div className="mt-4 w-5/12 text-myWhite-100">
      <LoginForm type="sign-up" title="Create an Account" />
    </div>
  );
};

export default SignUp;

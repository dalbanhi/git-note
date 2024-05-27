"use client";
import React from "react";
import LoginForm from "@components/shared/Form/Login/LoginForm";

const providers = ["google", "github"];

const SignUp = () => {
  return (
    <div className="mt-4 w-5/12 text-myWhite-100">
      <LoginForm type="sign-up" title="Create an Account" />
    </div>
  );
};

export default SignUp;

{
  /* <h1 className="text-display2">Create an Account</h1>
      {providers.map((provider) => (
        <Button
          key={provider}
          image=""
          onClick={() => signIn(provider)}
          text={`Sign in with ${provider}`}
        />
      ))}
      <button
        onClick={() =>
          signIn("credentials", { email: "test", password: "test" })
        }
        className="bg-myBlack-700 p-2 text-p4Med text-myWhite-100"
      >
        {" "}
        Sign in with credentials
      </button>
      <button
        onClick={() => signOut()}
        className="bg-myBlack-700 p-2 text-p4Med text-myWhite-100"
      >
        {" "}
        Sign out
      </button> */
}

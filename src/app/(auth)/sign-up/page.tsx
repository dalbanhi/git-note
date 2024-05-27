"use client";
import React, { useState, useEffect } from "react";
import Button from "~/components/ui/Button";
import { signIn, signOut } from "next-auth/react";

const providers = ["google", "github"];

const SignUp = () => {
  return (
    <div className="mt-4 flex text-display2 text-myWhite-100">
      SignUp
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
      </button>
    </div>
  );
};

export default SignUp;

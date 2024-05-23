import React from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="mt-4 flex justify-start">
      <h1 className="text-display2 text-myWhite-100">Login</h1>
    </div>
  );
};

export default SignIn;

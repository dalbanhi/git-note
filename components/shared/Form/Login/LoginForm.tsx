"use client";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  type: string;
  title: string;
}

//TODO: Add error handling with Zod and useForm hook: https://ui.shadcn.com/docs/components/form

const LoginForm: React.FC<LoginFormProps> = ({ type, title }) => {
  const providers = ["Google", "GitHub"];
  const isSignUp = type === "sign-up";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="mt-4 flex w-full flex-col justify-center">
      {/* {error && <p className="text-myRed-500">{error}</p>} */}
      <h1 className="text-display2 text-myWhite-100">{title}</h1>
      <div className="flex flex-col gap-4">
        {isSignUp && (
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="full name"
            type="text"
            placeholder="Enter your full name"
          />
        )}
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your email address"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Button
          backgroundColor="bg-primary-500"
          textColor="text-myBlack-900"
          text={title}
          onClick={(e) => {
            e.preventDefault();
            //save the result and see if there is an error, also redirect to the home page
            signIn("credentials", {
              email: email,
              password: password,
              fullName: fullName,
            });
          }}
        ></Button>
      </div>
      <Link
        href={isSignUp ? "/sign-in" : "/sign-up"}
        className="mt-4 text-center text-p3Med text-myWhite-300 underline hover:text-myWhite-100"
      >
        {isSignUp ? "Already have an account" : "I don't have an account"}
      </Link>
      <div className="my-4 flex items-center justify-center gap-1">
        <hr className="w-5/12 border-t border-myWhite-500"></hr>
        <span className="w-1/6 text-center text-p4Reg text-myWhite-300">
          or
        </span>
        <hr className="w-5/12 border-t border-myWhite-500"></hr>
      </div>
      <div className="flex flex-col gap-4">
        {providers.map((provider) => {
          return (
            <Button
              key={provider}
              image={`icons/${provider}.svg`}
              backgroundColor="bg-myBlack-700"
              textColor="text-myWhite-100"
              text={`Continue with ${provider}`}
              onClick={() => signIn(provider)}
            ></Button>
          );
        })}
      </div>
    </div>
  );
};

export default LoginForm;

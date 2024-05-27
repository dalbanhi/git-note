"use client";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  type: string;
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ type, title }) => {
  const isSignUp = type === "sign-up";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  return (
    <div className="mt-4 flex w-full flex-col justify-center">
      <h1 className="text-display2 text-myWhite-100">{title}</h1>
      <form className="flex flex-col gap-4">
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
          onClick={() => console.log("Login")}
        ></Button>
      </form>
      {/* <div className="w-full"> */}
      <Link
        href={isSignUp ? "/sign-in" : "/sign-up"}
        className="mt-4 text-center text-p3Med text-myWhite-300 underline hover:text-myWhite-100"
      >
        {isSignUp ? "Already have an account" : "I don't have an account"}
      </Link>
      {/* </div> */}
    </div>
  );
};

export default LoginForm;

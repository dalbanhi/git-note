"use client";
import Input from "@/components/interface/Input";
import Button from "@/components/interface/Button";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import { showError } from "@/components/shared/utils/FormErrorHandlers";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from "~/lib/validators/user.schema";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  type: string;
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ type, title }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserFormSchema),
  });

  const providers = ["Google", "GitHub"];
  const isSignUp = type === "sign-up";

  useEffect(() => {
    let errorMsg = "";
    if (errors.email) {
      errorMsg = errors.email.message as string;
    } else if (errors.password) {
      errorMsg = errors.password.message as string;
    } else if (errors.fullName) {
      errorMsg = errors.fullName.message as string;
    }
    if (errorMsg !== "") {
      showError(errorMsg);
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      redirect: false,
      callbackUrl: "/onboarding?step=1",
    });
    if (result?.error) {
      showError(result.error);
    } else {
      //router refresh make sure redirects to onboarding
      router.push(result?.url ?? "/onboarding?step=1");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col justify-center"
    >
      <h1 className="text-display2 text-myWhite-100">{title}</h1>
      <div className="flex flex-col gap-4">
        {isSignUp && (
          <Input
            label="fullName"
            type="text"
            placeholder="Enter your full name"
            register={register}
          />
        )}

        <Input
          label="email"
          type="email"
          placeholder="Enter your email address"
          register={register}
        />
        <Input
          label="password"
          type="password"
          placeholder="Enter your password"
          register={register}
        />

        <Button
          backgroundColor="bg-primary-500"
          textColor="text-myBlack-900"
          onClick={handleSubmit(onSubmit)}
        >
          {title}
        </Button>
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
              image={`/icons/${provider.toLowerCase()}.svg`}
              backgroundColor="bg-myBlack-700"
              textColor="text-myWhite-100"
              onClick={() =>
                signIn(provider.toLowerCase(), {
                  callbackUrl: "/onboarding?step=1",
                })
              }
            >
              {`Continue with ${provider}`}
            </Button>
          );
        })}
      </div>
    </form>
  );
};

export default LoginForm;

import UpdateProfileForm from "@/components/shared/Form/Update/Profile/UpdateProfileForm";
import { redirect } from "next/navigation";
import React from "react";
import { getSession } from "~/auth/auth";
import { getUser } from "~/lib/actions/users";

const EditProfile = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const userFromDB = await getUser(session.user.id);
  //clean the user object
  const userJSON = JSON.parse(JSON.stringify(userFromDB));
  return (
    <section className="flex min-h-screen flex-col justify-start p-4 max-sm:w-full md:w-6/12">
      <h1 className="mt-4 text-display1">Edit Profile</h1>
      <UpdateProfileForm session={session} userFromDB={userJSON} />
    </section>
  );
};

export default EditProfile;

import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ContributionsTracker = dynamic(
  () => import("@components/shared/Home/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);
import RecentPosts from "@components/shared/Home/RecentPosts";
import { getSession } from "~/auth/auth";

export default async function Home() {
  const session = await getSession();
  const userName = session?.user?.name as string;
  //get only the first name
  let firstName = userName?.split(" ")[0];

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
      <h1 className="mt-4 text-display1">
        {" "}
        Hello, {firstName ? firstName : "there"}
      </h1>
      <p className="mb-4 text-p1Reg text-myWhite-300">
        {"Time to jot down your latest learnings today!"}
      </p>
      <ContributionsTracker />
      <RecentPosts />
    </section>
  );
}

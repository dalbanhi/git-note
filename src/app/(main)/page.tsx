import dynamic from "next/dynamic";

const ContributionsTracker = dynamic(
  () => import("@components/shared/Home/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);
import RecentPosts from "@components/shared/Home/RecentPosts";

export default function Home() {
  const userName = "Nikky Eya";
  //get only the first name
  let firstName = userName.split(" ")[0];

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
      <h1 className="mt-4 text-display1"> Hello, {firstName}</h1>
      <p className="mb-4 text-p1Reg text-myWhite-300">
        {"Time to jot down your latest learnings today!"}
      </p>
      <ContributionsTracker />
      <RecentPosts />
    </section>
  );
}

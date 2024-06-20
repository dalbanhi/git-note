import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ContributionsTracker = dynamic(
  () => import("@/components/shared/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);

import RecentPostsHeader from "@/components/shared/Home/RecentPostsHeader";
import { getSession } from "~/auth/auth";
import { getPostsByPage, getTotalPages } from "~/lib/actions/posts";
import { Note } from "~/types/index";
import PostCard from "@/components/shared/Home/PostCard";

import PaginationButtons from "@/components/shared/Home/PaginationButtons";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getSession();
  const userName = session?.user?.name as string;

  if (searchParams.page === undefined) {
    searchParams.page = "1";
  }
  const posts: Note[] = (await getPostsByPage(
    parseInt(searchParams.page as string)
  )) as Note[];

  const totalPages = (await getTotalPages()) as number;
  //get only the first name
  let firstName = userName?.split(" ")[0];

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start gap-4 p-4">
      <h1 className="mt-4 text-display1">
        {" "}
        Hello, {firstName ? firstName : "there"}
      </h1>
      <p className="mb-4 text-p1Reg text-myWhite-300">
        {"Time to jot down your latest learnings today!"}
      </p>
      <ContributionsTracker />
      <RecentPostsHeader />
      <div className="mt-2 flex flex-col gap-4">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} isShort={false} />;
        })}
      </div>
      <PaginationButtons
        page={searchParams.page?.toString()}
        totalPages={totalPages}
      />
    </section>
  );
};

export default Home;

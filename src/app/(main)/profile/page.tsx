import dynamic from "next/dynamic";
import React from "react";
import { getSession } from "~/auth/auth";
import { getUser } from "~/lib/actions/users";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import LearningGoalsPreview from "@/components/shared/Profile/LearningGoalsPreview";
import TechStackPreview from "@/components/shared/Profile/TechStackPreview";
import KnowledgeLevelPreview from "@/components/shared/Profile/KnowledgeLevelPreview";
import ScheduleAvailabilityPreview from "@/components/shared/Profile/ScheduleAvailabilityPreview";

const ContributionsTracker = dynamic(
  () => import("@/components/shared/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);

function formatDateToCustomString(date: Date) {
  if (!date) return "not set";
  // Define the custom format
  const customFormat = "MMM d, yyyy - haaa OOO";

  // Format the date
  return format(date, customFormat);
}

const MyProfile = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const userAvatar = session?.user?.image as string;
  const userImageURL = session?.image as string;

  const userFromDB = await getUser(session.user.id);

  const createdAt = userFromDB?.createdAt;
  const formattedCreatedAtDate = format(new Date(createdAt), "MMMM yyyy");

  const portfolio = userFromDB?.portfolio;
  const location = userFromDB?.location;

  const startDate = formatDateToCustomString(
    userFromDB?.scheduleAvailability.startDate
  );
  const endDate = formatDateToCustomString(
    userFromDB?.scheduleAvailability.endDate
  );

  return (
    <section className="flex min-h-screen flex-col justify-start p-4 max-sm:w-full md:w-6/12">
      <ProfileHeader
        formattedCreatedAtDate={formattedCreatedAtDate}
        location={location}
        name={session?.user?.name}
        portfolio={portfolio}
        userAvatar={userAvatar}
        userImageURL={userImageURL}
      />
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <p className="mb-4 text-p1Bold text-myWhite-100">
            {"Contribution Grid"}
          </p>
          <ContributionsTracker userID={session.user.id} />
        </div>
        <LearningGoalsPreview learningGoals={userFromDB?.learningGoals} />
        <TechStackPreview techStack={userFromDB?.techStack} />
        <KnowledgeLevelPreview knowledgeLevels={userFromDB?.knowledgeLevels} />

        <ScheduleAvailabilityPreview
          available={userFromDB?.scheduleAvailability.available}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </section>
  );
};

export default MyProfile;

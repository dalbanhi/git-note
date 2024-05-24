import { Schema, model, models } from "mongoose";
import {
  LearningGoal,
  TechStackType,
  ScheduleAvailability,
  SocialMediaLink,
} from "~/types";

import { TechStackOptions } from "~/constants";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
  notes: Schema.Types.ObjectId[];
  learningGoals: LearningGoal;
  techStack: TechStackType[];
  knowledgeLevels: string[];
  scheduleAvailability: ScheduleAvailability;
  socialMediaLinks: SocialMediaLink;
}

// Define the LearningGoal sub-schema
const LearningGoalSchema = new Schema<LearningGoal>({
  done: { type: Boolean, required: true },
  goal: { type: String, required: true },
});

//define the scheduleAvailability sub-schema
const ScheduleAvailabilitySchema = new Schema<ScheduleAvailability>({
  startDate: { type: Date },
  endDate: { type: Date },
  available: { type: Boolean },
});

//define the socialMediaLinks sub-schema
const SocialMediaLinkSchema = new Schema<SocialMediaLink>({
  url: { type: String, required: true },
  username: { type: String, required: true },
});

// Enum values for TechStackType
const techStackEnumValues: TechStackType = TechStackOptions;

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username must be between 8 and 30 characters long and can only contain letters, numbers, and periods",
    ],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    maxlength: 30,
    // match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/, // generated to capture at least 1 letter and at least one number --needs to be tested
  },

  image: {
    type: String,
  },

  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],

  learningGoals: [LearningGoalSchema],

  techStack: {
    type: [String],
    enum: techStackEnumValues,
    //should I validate that the each value in the array is a valid tech stack option?
  },

  knowledgeLevels: [String],
  scheduleAvailability: ScheduleAvailabilitySchema,
  socialMediaLinks: [SocialMediaLinkSchema],
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;

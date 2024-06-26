import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import {
  LearningGoal,
  TechStackType,
  ScheduleAvailability,
  SocialMediaLink,
} from "~/types";

import { TechStackOptions } from "~/constants";

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  portfolio: string;
  location: string;
  notes: Schema.Types.ObjectId[];
  learningGoals: LearningGoal;
  techStack: TechStackType[];
  knowledgeLevels: string[];
  scheduleAvailability: ScheduleAvailability;
  socialMediaLinks: SocialMediaLink;
  hasOnboarded: boolean;
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
  site: { type: String, required: true },
});

// Enum values for TechStackType
const techStackEnumValues: TechStackType = TechStackOptions;

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    portfolio: {
      type: String,
    },
    location: {
      type: String,
    },
    password: {
      type: String,
    },

    image: {
      type: String,
    },

    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],

    learningGoals: [LearningGoalSchema],

    techStack: {
      type: [String],
      enum: techStackEnumValues,
    },

    knowledgeLevels: [String],
    scheduleAvailability: ScheduleAvailabilitySchema,
    socialMediaLinks: [SocialMediaLinkSchema],
    hasOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password as string, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.error(err);
  }
});

const User = models?.User || model<User>("User", UserSchema);

export default User;

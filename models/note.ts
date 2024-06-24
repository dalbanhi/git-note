import { Schema, model, models } from "mongoose";
import { ResourcesAndLinks } from "~/types";
import { NoteType as NoteTypeEnum } from "~/constants";
import { Code } from "~/types";

export interface INote extends Document {
  title: string;
  type: NoteTypeEnum;
  tags: string[];
  description: string;
  createdAt: Date;
  creator: Schema.Types.ObjectId;
  stars: number;
  views: number;
  code?: Code;
  whatYouLearned?: string[];
  stepsToFollow?: string[];
  content: string;
  resourcesAndLinks: ResourcesAndLinks[];
  relatedNotes: Schema.Types.ObjectId[];
}

//declare resources and links sub-schema
const ResourcesAndLinksSchema = new Schema<ResourcesAndLinks>({
  resource: { type: String, required: true },
  url: { type: String, required: true },
});

const CodeSchema = new Schema<Code>({
  code: { type: String, required: true },
  codePreviewImage: { type: String, required: false },
});

const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    type: {
      type: String,
      required: [true, "Type is required"],
    },

    tags: [String],

    description: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required."],
    },
    stars: Number,
    views: Number,
    code: CodeSchema,
    whatYouLearned: {
      type: [String],
      required: false,
    },
    stepsToFollow: {
      type: [String],
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    resourcesAndLinks: [ResourcesAndLinksSchema],
    relatedNotes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  },
  { timestamps: true }
);

const Note = models?.Note || model<INote>("Note", NoteSchema);

export default Note;

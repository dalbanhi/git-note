import { Schema, model } from "mongoose";
import { ResourcesAndLinks } from "~/types";

export interface INote extends Document {
  title: string;
  type: string; //do the same thing as the enum
  tags: Schema.Types.ObjectId[];
  description: string;
  createdAt: Date;
  creator: Schema.Types.ObjectId;
  stars: number;
  views: number;
  code?: string;
  learnings?: string[];
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

const NoteSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  type: {
    type: String,
    required: [true, "Type is required"],
  },

  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],

  description: String,

  createdAt: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required."],
  },
  stars: Number,
  views: Number,
  code: {
    type: String,
    required: false,
  },
  learnings: {
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
});

const Note = model<INote>("Note", NoteSchema);

export default Note;

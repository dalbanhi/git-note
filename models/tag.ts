import { Schema, model } from "mongoose";

export interface ITag extends Document {
  title: string;
}

const TagSchema: Schema = new Schema({
  title: { type: String, required: true },
});

const Tag = model<ITag>("Tag", TagSchema);

export default Tag;

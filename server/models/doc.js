import mongoose from "mongoose";

const { Schema } = mongoose;

const docSchema = new Schema({
  docName: {
    type: String,
    default: "Untitled Document",
  },
  content: {
    type: Object,
    default: "",
  },
  accessList: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      isOwner: {
        type: Boolean,
        default: false,
      },
      userAccessType: {
        type: String,
        enum: ["viewer", "editor"],
        default: "editor",
      },
    },
  ],
  docAccessType: {
    type: String,
    enum: ["public", "private"],
    default: "private"
  },
});

export const Doc = mongoose.model("Doc", docSchema);

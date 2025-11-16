import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
      required:true,
    },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Tasks", TaskSchema);

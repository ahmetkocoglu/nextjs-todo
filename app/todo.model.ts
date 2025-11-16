// TypeScript
import mongoose, { Schema, Model } from 'mongoose';

export interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo: Model<ITodo> =
  (mongoose.models.Todo as Model<ITodo>) || mongoose.model<ITodo>('Todo', TodoSchema);

import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema<PostType>(
  {
    customId: { type: String, required: true, unique: true },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      max: 40,
    },
    event: {
      type: String,
      // required: true,
    },
    region: {
      type: String,
      // required: true,
      max: 20,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: Boolean,
      default: false,
    },
    mypage: {
      url: { type: String, max: 80, default: '' },
      id: { type: String, max: 40, default: '' },
      password: { type: String, max: 40, default: '' },
    },
    taskFlow: [
      {
        customId: { type: String },
        task: { type: String },
        situation: { type: String, default: '未完了' },
        testFormat: { type: String, max: 20 },
        date: { type: String },
        limitDate: { type: String },
        current: { type: Boolean, default: false },
        failed: { type: Boolean, default: false },
        // next: { type: Boolean, default: false },
        finished: { type: Boolean, default: false },
        // edit: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const PostModel = mongoose.models.Post || mongoose.model('Post', PostSchema)

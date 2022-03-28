
import mongoose from "mongoose";
const schema = mongoose.Schema;

const blogSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    slug:{
      type:String,
      required: true,

    },
    body: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

//!! creating Model
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;


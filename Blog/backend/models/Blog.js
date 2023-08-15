const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    likes: {
      type: [String]
    }
  }, {timestamps: true}
)

module.exports = mongoose.model('Blog', blogSchema)
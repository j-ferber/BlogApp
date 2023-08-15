const Blog = require('../models/Blog')

const getAllPosts = async (req, res) => {
  const posts = await Blog.find().sort({ createdAt: -1 })
  if (posts?.length) return res.status(200).json(posts)
  return res.status(400).json({error: 'No posts found.'})
}

const createNewPost = async (req, res) => {
  const { title, text, username } = req.body
  if (!title || !text) return res.status(400).json({error: 'All fields must be filled.'})
  const response = await Blog.create({ title, text, username })
  if (response) return res.status(200).json({message: 'New post created.'})
}

const getSinglePost = async (req, res) => {
  const username = req.user.username
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'ID is required' })
  const post = await Blog.find({ _id: id })
  if (!post.length) return res.status(400).json({ error: 'Post not found' })
  if (post[0].username !== username) return res.status(400).json({error: 'You can only edit your own posts.'})
  return res.status(200).json({post: post[0]})
}

const deletePost = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'ID is required' })
  const post = await Blog.findOneAndDelete({ _id: id })
  if (post) return res.status(200).json({post})
}

const updatePost = async (req, res) => {
  const { id } = req.params
  const {text, title} = req.body
  if (!id) return res.status(400).json({ error: 'ID is required' })
  if (!title || !text) return res.status(400).json({error: 'Both text and title required.'})
  const post = await Blog.findOneAndUpdate({ _id: id }, {text, title})
  if (post) return res.status(200).json({message: `Post titled '${post.title}' updated successfully.`})
}

const getUserPosts = async (req, res) => {
  const posts = await Blog.find({ username: req.user.username }).sort({ createdAt: -1 })
  if (!posts?.length > 0) return res.status(400).json({ error: 'No posts found.' })
  return res.status(200).json({posts})
}

const likePost = async (req, res) => {
  const {id} = req.params
  const username = req.body.username
  console.log(username)
  const post = await Blog.find({ _id: id })
  if (!id) return res.status(400).json({ error: 'ID is required' })
  if (!post?.length) return res.status(400).json({ error: 'No post found with that ID' })
  const likes = post[0].likes
  if (likes.includes(username)) {
    const index = likes.indexOf(username)
    likes.splice(index, 1)
    await Blog.findOneAndUpdate({ _id: id }, { likes })
  } else {
    likes.push(username)
    await Blog.findOneAndUpdate({_id: id}, {likes})
  }
  return res.status(200).json({likes})
}

module.exports = {getAllPosts, createNewPost, getSinglePost, deletePost, updatePost, getUserPosts, likePost}
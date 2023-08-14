require('dotenv').config()
const express = require('express')
const app = express()
const blogRoutes = require('./routes/blogRoutes')
const connectDB = require('./config/dbConn')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const userRoutes = require('./routes/userRoutes')

connectDB()

app.use(cors(corsOptions))

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/blogs', blogRoutes)
app.use('/user', userRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
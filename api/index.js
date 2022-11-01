require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

// import { VueQueryPlugin } from 'vue-query'

// app.use(VueQueryPlugin)
app.use(bodyParser.json())

app.get('/ping', (req, res) => {
  res.send('pong')
})

// TODO: Error handling
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  // No user found
  if (!user) {
    res.status(403)
    return
  }

  const match = await bcrypt.compare(password, user.password)
  console.log(match)
  // Invalid password
  if (!match) {
    res.status(403)
    return
  }

  const token = jwt.sign({ email }, 'shhhhh')

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

// todo: error handling
app.post('/profile', async (req, res) => {
  const { authorization } = req.headers
  const token = authorization.split(' ')[1]

  let decoded

  try {
    decoded = jwt.verify(token, 'shhhhh')
  } catch (err) {
    res.status(403)
    return
  }

  const { email } = decoded

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  // No user found
  if (!user) {
    res.status(403)
    return
  }

  res.send({ user: { name: user.name, email: user.email, role: user.role } })
})

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}

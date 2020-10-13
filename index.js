const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const cartRoutes = require('./routes/cart')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5f85c7636b11db1034e3ed63')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const URL =
      'mongodb+srv://admin:30Afuckup@cluster0.0wr14.mongodb.net/shop?retryWrites=true&w=majority'

    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'wolfykey@gmail.com',
        name: 'Vlad',
        cart: { items: [] }
      })

      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

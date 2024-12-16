const express = require('express')
const { sequelize } = require('./models')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const topicRouter = require('./routes/topics')
const authRouter = require('./routes/auth')
app.use('/topics', topicRouter)
app.use('/auth', authRouter)

app.listen(4000, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})



    //Day 1 Learn
    //Day 2 Review 1 day
    //Day 4 review (Second review) 3 days
    //Day 7 review (Third Review) 6 days
    //Day 16 review (Fourth Review) 15 days
    //Day Day 35 review (fifth review) 34 days
    // Every 3 Weeks after
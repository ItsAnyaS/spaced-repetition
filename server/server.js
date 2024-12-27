const express = require('express')
const { sequelize } = require('./models')
const cors = require('cors')
require('dotenv/config')
const app = express()
const PORT = process.env.PORT || 4000
const path = require('path')
app.use(express.json())
    app.use(cors({
        origin: 'https://spaced-repetition-883p.onrender.com'
      }));





const topicRouter = require('./routes/topics')
const authRouter = require('./routes/auth')

app.use('/api/topics', topicRouter)
app.use('/api/auth', authRouter)



// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
}

console.log('Serving static files from:', path.join(__dirname, 'client/build'));


app.listen(PORT, async() => {
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
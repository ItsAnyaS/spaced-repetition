const express = require('express')
const { sequelize } = require('./models')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const { Topic } = require('./models')

app.get('/topics', async(req,res)=> {
try {
    let topics = await Topic.findAll()
    console.log(topics)
    return res.json({Message: topics})
} catch (error) {
    return res.json(error)
}
})

app.post('/create-topic', (req, res)=> {
    try {
        const {title, link, interval, lastReview, nextReviewDate } = req.body
        // console.log(title, new Date(), 1, nextReviewDate, link)
        console.log(title, link, interval, lastReview, nextReviewDate)
        return res.json({"title": title, "link": link})
    } catch (error) {
        
    }
})


app.listen(4000, async() => {
    console.log('server is up')
    await sequelize.authenticate()
    console.log('database connected')
})
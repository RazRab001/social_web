require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const routers = require('./routers/index')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', routers)

const start = async() =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`Sucsessfull add to database by post ${PORT}`))
    } catch (e){
        console.log(e)
    }
}
start()
const express = require('express')
require('dotenv').config()
const connection = require('./config/db.Connect')
const expresserrorHandler = require('express-error-handler')
const userRoutes = require('./routes/userRoutes')


const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRoutes)

app.get('/', (req:any, res:any) => {
    res.json({ message: "Hello, world!" });
});




connection().then(()=>{
    app.listen(port,()=>{console.log(`app is running on ${port}`)})
}).catch((err:any)=>{
    console.error(`error occured in connecting to server: ${err}`)
    process.exit(1)
})




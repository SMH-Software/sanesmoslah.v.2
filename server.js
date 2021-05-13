import express from "express"
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import Routers from './routes/routes.js'
const app = express()
dotenv.config()

//Moteur de template 
app.set('views', './src/views')
app.set('view engine', 'ejs')

//Midllware
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//Route
app.use('/', Routers)

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})


app.listen(process.env.PORT, () => console.log(`La base de donnée a bien démarré : http://localhost:${process.env.PORT}`))

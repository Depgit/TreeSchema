const express = require('express')
const mongoose = require('mongoose')
const tree = require('./models/tree')
const treeRouter = require('./routes/tree')
const app = express()
const url = 'mongodb://localhost:27017/mongotree'
mongoose.connect(url,
    { },()=>{
    console.log('cool');
 })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req,res) =>{
    res.send("hello");
})

app.use('/tree',treeRouter)

app.listen(process.env.PORT || 5000,()=>{
    console.log('yep running');
})
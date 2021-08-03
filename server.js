const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const server = express();

const cors = require('cors');
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;



mongoose.connect('mongodb://rafeefdb:rafeefdb@cluster0-shard-00-00.exjki.mongodb.net:27017,cluster0-shard-00-01.exjki.mongodb.net:27017,cluster0-shard-00-02.exjki.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-sumry6-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

server.get('/', (req, res) => {
    res.send('HOME ROUTE');
});


let colorSchema = mongoose.Schema({
    title: String,
    imageUrl: String
})

let userSchema = mongoose.Schema({
    email: String,
    colors: [colorSchema]
})

let userModel = new mongoose.model('usersColors', userSchema);

let seedCollection = () => {
    let rafeef = new userModel({
        email: 'alhayek214@gmail.com',
        colors: [{
            title: "Black",
            imageUrl: "http://www.colourlovers.com/img/000000/100/100/Black.png"
        }]
    }); rafeef.save();

    let razan = new userModel({
        email: 'quraanrazan282@gmail.com',
        colors: [{
            title: "dutch teal",
            imageUrl:  "http://www.colourlovers.com/img/1693A5/100/100/dutch_teal.png"
        }]
    }); razan.save();
}
// seedCollection();

server.get('/colors', (req,res)=>{
    axios.get('https://ltuc-asac-api.herokuapp.com/allColorData').then(
    (dataResult)=>{
        res.send(dataResult.data.colors);
    }
    ).catch((error)=> res.send(error));
});

server.get('/addToFav', (req,res)=>{
    userModel.findOne({email:req.query.email},(error,result)=>{
        if(error){
            res.send(error)
        }else{
            res.send(result.colors);
        }
    }
        )
});








server.listen(PORT, () => { console.log(`LIVE ON ${PORT}`) });
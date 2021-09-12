const express = require("express")
const app = express()
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"))


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoitems', {useNewUrlParser: true, useUnifiedTopology: true});



const todolistSchema = new mongoose.Schema({
    name: String,
    date: String,
    
});
const Item = mongoose.model('item', todolistSchema);




app.get("/", (req, res) =>{

    Item.find({}, function(err,f){
        res.render("body", {newlists:f});
    })
 
   
});

app.post("/", (req, res) =>{
    const itemName = req.body.n;
    const itemdate = req.body.date;
    const additem = new Item({
        name: itemName,
        date:itemdate,
    });
    additem.save();
    res.redirect("/");

});

app.post("/delete", (req, res)=>{
    const check = req.body.checkbox;
    Item.findByIdAndRemove(check, function(err){
        if(!err){
            console.log("deleted")
            res.redirect("/")
        }
    })
})


app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`)
});
const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const mongoose = require('mongoose');
const today = require(`${__dirname}/date.js`);
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


let taskData = [];
let title = "";
formattedDate = today.formattedDate;

// Fuejr9C4oQxW9prC
mongoose.connect("mongodb+srv://fatokilawrence2002:Fuejr9C4oQxW9prC@cluster0.vcmakaz.mongodb.net/todolistDB?retryWrites=true&w=majority", {useNewUrlParser: true})
.then(function(db){
    console.log("Database is connected successfully");
})
.catch(function(err){
    console.log(err);
});


const taskSchema = new mongoose.Schema ({
    name: String
})

const Task = new mongoose.model("Task", taskSchema);


const listSchema = new mongoose.Schema({
    name: String,
    items: [taskSchema]
})

const List = new mongoose.model ("List", listSchema)



app.get("/", function(req, res){
    res.render("create", {date: formattedDate})
})




app.post("/new", function(req, res){
    let data = req.body.newTask;
    let listTitle = req.body.title;

    if (data.length > 0 && data != " ") {
        
        const newTask = new Task ({
            name: data
        })

        async function f() {
            const info = await List.updateOne({name: listTitle}, {$push: {items: newTask}})

            res.redirect("/" + listTitle);
        }

        f();

    } else {
        res.redirect("/" + listTitle);
    }

    
})


app.post("/delete", function(req, res){
    let categoryTitle = req.body.categoryTitle
    async function f(){
        const taskToBeDeleted = await List.updateOne({name: categoryTitle}, {$pull: {items: {_id: req.body.idOfTask}}});
        
        res.redirect("/" + categoryTitle);
    }

    f();
})


app.post("/create", function(req, res){
    let createdTitle = req.body.title;

    res.redirect("/" + createdTitle);
})

app.get("/:categoryName", function(req, res){
    const category = lodash.capitalize(req.params.categoryName);

    

    async function f(){
        const currentCategory = await List.find({name: category});

        if(currentCategory.length > 0){
            taskData = currentCategory[0].items;
        
            title = category;
            res.render("index", {
                title: category,
                data: taskData,
                date: formattedDate
            })
        } else {
            const list1 = new List ({
                name: category,
                items: []
            })
        
            list1.save();
            res.redirect("/" + category);

        }
        
    }

    f();

    

    
    


})


app.listen(3000, function(){
    console.log("Server is up and running!");
})
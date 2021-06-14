const express = require("express")
const mongoose = require("mongoose")


//////////////////////////////////Basic setup boilerplate//////////////////////////////////
const app = express();

mongoose.connect("mongodb://localhost:27017/bookDB",{
    useNewUrlParser: true, useUnifiedTopology: true
});

const bookSchema = {
    title : {
        type : String,
        require : true
    },
    content : String
}

const Book = mongoose.Model("Book",bookSchema)


app.listen(3000,(req,res) => {
    console.log("Server started at port 3000");
})

//////////////////////////////////This section is for each and every book//////////////////////////////////

app.route("/book")
.get((req,res) => {

})
.post((req,res) => {

})
.delete((req,res) => {

})

//////////////////////////////////This section is for a single book//////////////////////////////////

app.route("/book/:bookTitle")
.get((req,res) => {

})
.put((req,res) => {

})
.delete((req,res) => {

})
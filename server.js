const express = require("express")
const mongoose = require("mongoose")
const bodyParse = require("body-parser")


//////////////////////////////////Basic setup boilerplate//////////////////////////////////
const app = express();

app.use(bodyParse.urlencoded({
    extended : true
}));

mongoose.connect("mongodb://localhost:27017/bookDB",{
    useNewUrlParser: true, useUnifiedTopology: true
});

const bookSchema = {
    title : String,
    content : String
}

const Book = mongoose.model("Book",bookSchema);

app.listen(3000,(req,res) => {
    console.log("Server is started");
});

////////////////////////////////// THIS SECTION IS FOR EACH AND EVERY Books//////////////////////////////////

app.route("/books")
.get((req,res) => {
    
    Book.find({},(err,foundBooks) => {
        if (err) {
            res.send(err);
        } else {
            res.send(foundBooks);
        }
    });
})
.post((req,res) => {
    console.log(req.body.title);
    console.log(req.body.content);

    const book = new Book({
        title : req.body.title,
        content : req.body.content
    });

    book.save((err) => {
        if (err) {
            res.send("Error occured");
        } else {
            res.send("Successful OK!");
        }
    });
})
.delete((req,res) => {
    Book.deleteMany({},(err) => {
        if (err) {
            res.send("Error occured");
        } else {
            res.send("Successfully deleted all articles"); 
        }
    });
});

////////////////////////////////// THIS SECTION IS FOR SPECIFIC ARTICLES//////////////////////////////////

app.route("/books/:bookTitle")
.get((req,res) => {
    Book.findOne({title : req.params.bookTitle},(err,foundBook) => {
        if (err) {
            res.send("Not Match Found");
        } else {
            res.send(foundBook);     
        }
    });
})
.put((req,res) => {
    Book.updateOne(
        {title : req.params.bookTitle},
        {title : req.body.title , content : req.body.Content},
        (err) => {
            if (err) {
                console.log(err);
                res.send("Error occured.");
            } else {
                console.log(err);
                res.send("Changes are made successfully.");
            }
        }
      );
})
.delete((req,res) => {
    Book.deleteOne({title : req.params.bookTitle},(err) => {
        if (err) {
            res.send("Error occured");
        } else {
            res.send("Successfully deleted.");
        }
    });
});
const mongoose=require("mongoose");
const Genre=require("./genre");
const Author=require("./author");


//create schema
const schema = mongoose.Schema({
title: {
    type: String,
    required: [true,"Book's title is required"],
    trim: true,
},
description:{
    type: String,
    required: [false],
    trim: true,
},
genres:Array,
author:Object
});


schema.pre('save', async function(next) {
this.author=await Author.findById(this.author);
const genreArray=this.genres.map(async(el)=>await Genre.findById(el));
this.genres=await Promise.all(genreArray)
    next();
  });




const Book=mongoose.model("Book",schema);
module.exports=Book;


// const authorObj=await Author.findById(author)
// const genreArray = genres.map(async el=>await Genre.findById(el));
// const a = await Promise.all(genreArray)

// toySchema.pre('save', function(next) {
//     if (!this.created) this.created = new Date;
//     next();
//   });

//create model

//export model


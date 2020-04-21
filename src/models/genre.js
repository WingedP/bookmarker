const mongoose=require("mongoose");

const genreSchema=mongoose.Schema({
    genre:{
        type:String,
        require:[true,"Genre name is required"],
        trim:true,
        unique:true,
    }
})

const Genre=mongoose.model('Genre',genreSchema)
module.exports=Genre
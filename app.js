const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const {readAuthor, createAuthor, updateAuthor, deleteAuthor}=require("./src/controllers/authorControllers");
const {readGenres, createGenre}=require("./src/controllers/genreControllers");
const {createBook}=require("./src/controllers/bookControllers");



mongoose.connect(process.env.DB_LOCAL,{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
}).then(()=>console.log("successfully connected to database")).catch(err=>console.log(err))

const app=express();
const router=express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

router.get("/",(req,res)=>{
    res.status(200).json({status:"okokok",data:[]  })
})
//POST REQUEST CREATE NEW AUTHOR
router.route("/authors")
.get(readAuthor)
.post(createAuthor)

router.delete("/authors/:id",deleteAuthor)
router.put("/authors/:id",updateAuthor)

router.route("/genres")
.post(createGenre)
.get(readGenres)

router.route("/books")
.post(createBook)

app.listen(process.env.PORT,()=>{
console.log("App is running on port", process.env.PORT);
});



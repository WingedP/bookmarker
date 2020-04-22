const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const {readAuthor, createAuthor, updateAuthor, deleteAuthor}=require("./src/controllers/authorControllers");
const {readGenres, createGenre, deleteGenre}=require("./src/controllers/genreControllers");
const {createBook, readBooks, deleteBook, readMyBooks }=require("./src/controllers/bookControllers");
const {createUser}=require("./src/controllers/userControllers");
const {auth, login, logout, logoutAll}=require("./src/controllers/authControllers");



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

//AUTHOR ROUTES:
router.route("/authors")
.get(readAuthor)
.post(createAuthor)
router.delete("/authors/:id",deleteAuthor)
router.put("/authors/:id",updateAuthor)

//GENRE ROUTES:
router.route("/genres")
.post(createGenre)
.get(readGenres)
router.delete("/genres/:id",deleteGenre)

//BOOK ROUTES:
router.route("/books")
.post(auth,createBook)
.get(readBooks)

router.route("/books/me").get(auth, readMyBooks)
router.delete("/books/:id",auth, deleteBook)

//USER ROUTES:
router.route("/users")
.post(createUser)
//AUTHENTICATION/LOGIN/LOGOUT ROUTES:
router.route("/auth/login")
.post(login)        
router.get("/logout", auth, logout);
router.get("/logoutall", auth, logoutAll);






app.listen(process.env.PORT,()=>{
console.log("App is running on port", process.env.PORT);
});



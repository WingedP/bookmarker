const Book = require("../models/book");

exports.createBook = async function (req, res) {
    const { title, description, genres, author } = req.body;
    const book = await new Book({
        owner: {
            _id: req.user._id, 
            name: req.user.name,
            email: req.user.email
          },
        title: title,
        description: description,
        genres: genres,
        author: author
    })
    await book.save()
    return res.json({ status: "ok", data: book })
}

//READ ALL BOOKS:
exports.readBooks = async (req, res) => {    
    try {
      const books = await Book.find();
      res.status(200).json({ status: "successfully show all books", data: books });
    } catch (error) {
      res.status(400).json({ status: "fail to show all books", message: error.message });
    };
  };

  //READ ALL BOOKS FROM OWNER:
  exports.readMyBooks = async (req, res) => {
    try {
      const books = await Book.find({"owner._id": req.user._id});
      res.status(200).json({ status: "successfully show all your books", data: books });
    } catch (error) {
      res.status(400).json({ status: "fail to show all your books", message: error.message });
    };
  };



exports.deleteBook=async(req,res)=>{
    const {id}=req.params;
    try{
    await Book.findByIdAndDelete(id)
    return res.status(204).json({status:"Book successfully removed",data:null})
    }   
    catch(er){
    return res.status(400).json({status:"fail to remove book",error:err.message})   
    }
    }   
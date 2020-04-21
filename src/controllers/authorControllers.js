
const Author=require("../models/author");


exports.createAuthor=async(req,res)=>{
    const {name}=req.body;
    //create an author with name = name
    try{
    const author=await Author.create({name:name});
    return res.status(201).json({status:"okayy",data:author})   
    } catch(err){
    return res.status(400).json({status:"failfailfailfail",error:err.message})   
    }
    }

exports.updateAuthor=async(req,res)=>{
    const {id}=req.params;
    try{
    const author=await Author.findByIdAndUpdate(id,{name:req.body.name},{new:true})
    return res.status(200).json({status:"ok",data:author})
}   
    catch(er){
    return res.status(400).json({status:"failed",error:err.message})   
    }
}

exports.readAuthor=async(req,res)=>{
    const authors=await Author.find();
    return res.status(200).json({status:"ok",data:authors})
}


exports.deleteAuthor=async(req,res)=>{
    const {id}=req.params;
    try{
    await Author.findByIdAndDelete(id)
    return res.status(204).json({status:"delete success",data:null})
}   
    catch(er){
    return res.status(400).json({status:"failed",error:err.message})   
    }
}
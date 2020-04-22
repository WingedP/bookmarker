const mongoose=require("mongoose");
const validator=require("validator");    
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const schema = new mongoose.Schema({
    //need name, email, password, tokens
    name: {
        type: String,
        required: [true, "User must have a name"],
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        trim: true,
        unique: true,
        lowercase: true,        
        validate:{
            validator: function(value){
        return validator.isEmail(value);
            }
        }
    },
    password: {
        type: String,   
        required: [true, "User must have a password"]
  },
  tokens: [String] 
}, {
    timestamps: true
});


// var jsonToken=jwt.sign({email:'bar'},process.env.SECRET);
schema.statics.loginWithCredentials=async (email,password)=>{
    const user=await User.findOne({email:email});
    if(!user) throw new Error("user not found");
    const allow = await bcrypt.compare(password.toString(),user.password);
    console.log("YOUR EMAIL",email,"YOUR PASSWORD",password)
    if(!allow) throw new Error("incorrect password")
    return user
}   

schema.methods.generateToken=async function(){
const jsonToken=jwt.sign({email:this.email,id:this._id},process.env.SECRET);
//save token to db (not yet)
this.tokens.push(jsonToken);
await this.save();
return jsonToken
}

schema.methods.toJSON = function () {
    let newObj=this.toObject();
    delete newObj.password;
    delete newObj.__v;
    return newObj;
};


schema.pre('save',async function(next) {
if (!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, saltRounds);
next();
});


const User=mongoose.model('User',schema);
module.exports=User
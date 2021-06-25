const { User } = require("../db/models");
const jwt = require("jsonwebtoken");


const verifyJWT =  async (token,next)=>{

    try{
        const userId = jwt.verify(token, process.env.SESSION_SECRET).id
        console.log("this is the token", userId)
        await User.findByPk(userId)
       
    }
    catch(error){
        console.log("auth error")
        next(error);
    }


}

const signUserJWT = (user)=>{
    return (jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      ));

}


module.exports = {verifyJWT, signUserJWT};
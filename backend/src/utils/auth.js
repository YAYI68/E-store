const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var { expressjwt } = require("express-jwt");


const hashPassword = (password)=>{
    return bcrypt.hash(password,10)
}

const verifyPassword = async(password,hashPassword)=>{
    const isValid = await bcrypt.compare(password,hashPassword)
    return isValid
}

const createJwt = (user)=>{
    const token = jwt.sign({userId: user.id,isAdmin:user.isAdmin},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
)
        return token;
}

const authJwt = ()=>{ 
    return expressjwt({
        secret:process.env.JWT_SECRET,
        algorithms:["HS256"]
    }).unless({
        path:[
            {url:/\public\/images(.*)/, method:['GET','OPTIONS']},
            {url:/\/api\/v1\/products(.*)/, method:['GET','OPTIONS']},
            {url:/\/api\/v1\/categories(.*)/, method:['GET','OPTIONS']},
            '/api/v1/users/login',
            '/api/v1/users/register',
        ]
    })
}


// OR The for Route protection

const protect = (req,res,next)=>{
    const bearer = req.headers.authorization
    if(!bearer){
        res.status(401)
        res.json({"message":"not authorized"});
        return 
    }
    const [,token] = bearer.split(" ");
    if(!token){
        res.status(401)
        res.json({"message":"not authorized"});
        return
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
        return 
    }
    catch(e){
        res.status(401)
        res.json({"message":"not authorized"});
        return
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    createJwt,
    protect,
    authJwt
}
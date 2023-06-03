const jwt = require("jsonwebtoken");
require("dotenv").config();


const authentication = (req,res,next) => {

    const token = req.headers.authentication?.split(" ")[1];

    if(token){
        const decoded = jwt.verify(token, process.env.secret_key, (err,decoded) => {
            if(decoded){

                if(req.url === "/add/project"){
                    
                    const user_id = decoded._id;
                    req.body.user_id = user_id;

                    next()
                }
                
                else{
                    next()
                }
            }

            else{
                res.status(403).send({"message":"Please login first"});
            }
        })
    }

    else{
        res.status(403).send({"message":"Please login first"});
    }
}

module.exports = { authentication };
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");
require("dotenv").config();

const saltRound = 4;

const userRoutes = express.Router();


userRoutes.post("/signup", async(req,res) => {

    const {name,email,password} = req.body;

    const userEmail = await UserModel.findOne({email});

    if(userEmail){
        res.send({"message":"This Email is already registered"});
    }

    else{
        try {
            bcrypt.hash(password,saltRound, async(err,myPassword) => {
                const user = new UserModel({name,email,password:myPassword});
                await user.save();
                res.status(201).send({"message":"Signup Successfully"});
            })
        } 
        
        catch (err) {
            console.log(err);
            res.send("Internal Server Error");
        }
    }
})


userRoutes.post("/login", async(req,res) => {

    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});

        if(!user){
            return res.send({ "message": "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if(match){
            const userInfo = {...user.toObject(), password: undefined};
            const token = jwt.sign(userInfo, process.env.secret_key, { expiresIn: "7d"});
            res.status(201).send({token, "user": userInfo, "message": "Logged In successfully"});
        }

        else {
            res.send({ "message": "Invalid credentials" });
        }
    } 
    
    catch (err) {
        console.log(err);
        res.send("Internal Server Error");
    }
})


module.exports = { userRoutes };
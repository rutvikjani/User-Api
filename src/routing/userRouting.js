const express = require("express")
const app = express()
const user = require("../Models/usersModel")

app.use(express.json())


app.post("/users", async(req, res) => {
    try{
        console.log(req.body)
        const newUser = new user(req.body)
        newUser.save()
        res.send("User Added Successfully")
        
    }catch(err){
        res.status(400).send({
            message: "Something went wrong",
            statusCode: 400
        })
    }
    })


app.get("/users", async (req, res) => {
    try{
        const searchingUsers = await user.find()
        res.send(searchingUsers)
    }catch(e){
        res.status(400).send({
            statusCode: 400,
            message : "User Not Found"
        })
    }
})

app.patch("/users/:id", async(req, res) => {
    try{ 
        const id = req.params.id;
        const updateUser = await user.findByIdAndUpdate(id, req.body,{
            new: true
        })
        res.send(updateUser)
    }catch(e){
        res.status(400).send({
            statusCode: 400,
            message:"Unable to Update User."
        })
    }
})

app.delete("/users/:id", async(req, res) => {
    try{
        const deleteUser = await user.findByIdAndDelete(req.params.id)
        // console.log("Your Data is Deleted Successfully: ", deleteUser)
        if(!req.params.id){
            return res.send("No User found")
        }
        res.send("Deleted User",deleteUser)
    }catch(err){
        res.status(400).send({
            statusCode: 400,
            message: "Unable to delete User!!"
        })
    }
})

app.post("/login", async (req, res) => {
    try{
        const enteredUsername = req.body.username
        const enteredPassword = req.body.password


        console.log(`${enteredUsername} , ${enteredPassword}`)
        
        const userName = await user.findOne({username : enteredUsername})
        
        const isMatch = await bcrypt.compare(enteredPassword, userName.password)
        console.log(isMatch)
        
        if(isMatch){
            res.send("You are Logged in")
        }
        else{
            res.status(200).send("Wrong Password")
        }
            }catch(e){
                res.status(200).send({
                statusCode: 200,
                message: "Invalid username"
            })
            }
    }) 

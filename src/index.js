const express = require("express")
const app = express()
require("../src/db/connection")
const user = require("../src/Models/usersModel")
app.use(express.json())
require("../src/routing/userRouting")

app.listen(3000, ()=> {
    console.log("Server running on port-3000")
})


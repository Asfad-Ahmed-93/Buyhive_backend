const express =require("express");
const bodyParser = require("body-parser")
const routes = require("./Routes/MainRoutes");
const cors =require("cors");
const app = express();
const path = require("path")

const mongoose =require('mongoose');
mongoose.connect("mongodb+srv://Asfad:Kalash9999@cluster0.yshflsu.mongodb.net/",{useNewUrlParser:true})
mongoose.connection.once("open",()=> {
    console.log("Database is connected")
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true ,limit : 100000}))



app.use('/uploads',express.static(path.join(__dirname, "/Assests/User")))
app.use("/main",routes)



const port = 4000;
app.listen(port,()=> {
    console.log("Server is running on the port ", port);
})





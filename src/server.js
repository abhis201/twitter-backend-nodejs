const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

console.log(process.env.DB_CONN+"/Twitter");

mongoose.connect(process.env.DB_CONN+"/Twitter",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
},()=>{
    console.log("Database connected")
},(e)=>{
    console.error(e)
});

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port http://localhost:${PORT}`)
);

let userRouter = require('./routes/user');
let tweetRouter = require('./routes/tweet');
let authRouter = require('./routes/auth');

app.use('/user', userRouter)
app.use('/twitter',tweetRouter)
app.use('/auth',authRouter)


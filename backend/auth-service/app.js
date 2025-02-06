require('dotenv').config(); 

const express = require('express');
const app = express();
const userRouter = require("./routes/userRoute")
const cookieParser = require('cookie-parser'); 
const restrictToLoggedinUserOnly = require("./middleware/user")


app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

const PORT = process.env.PORT; 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/", userRouter)
app.use("/doc", restrictToLoggedinUserOnly, docRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

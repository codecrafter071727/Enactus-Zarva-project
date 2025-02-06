require('dotenv').config(); 

const express = require('express');
const app = express();
const userRouter = require("./routes/userRoute")

const PORT = process.env.PORT; 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/", userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

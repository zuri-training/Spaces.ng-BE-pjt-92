const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./routes/userRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

/* app.use('/', (req, res) => {
    res.send('Up and running');
}) */

app.use('/api/v1/', userRouter);

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
})
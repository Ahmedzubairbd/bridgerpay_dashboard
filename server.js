
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// DB Config
const db = require('./config/database');

// Connect to MongoDB
mongoose
    .connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Route files
const auth = require('./routes/auth');
const user = require('./routes/user');
const transaction = require('./routes/transaction');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/transactions', transaction);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

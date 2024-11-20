const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')

dotenv.config();
connectDB();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/api', userRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.get('/', (req, res) => {
    res.send("API running...")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

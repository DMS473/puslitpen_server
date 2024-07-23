const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
require("dotenv").config();
const cors = require("cors");

// // mengambil dat
app.use(cors({
  origin: 'http://localhost:3001',
  // origin: 'http://192.168.252.185:3001', // URL frontend Anda
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes")

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  // res.header('Access-Control-Allow-Origin', 'http://192.168.252.90:3001');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/api', routes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
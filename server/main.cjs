const express = require("express");
const connection = require("../database/connection.cjs");
const app = express();
const port = 3000;
const cors = require('cors');
const userRoutes = require("./routes/userRoutes.cjs");
const productRoutes = require("./routes/productRoutes.cjs");
const adminRoutes = require("./routes/adminRoutes.cjs");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: ['http://localhost:3000', "http://127.0.0.1:5173"],
  methods: 'GET, POST',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser(""));
app.use(express.json());
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

const db = connection();
if (db) {
  app.listen(port, () => {
    console.log(`server is listening ${port}`);
  });
}

app.use('/user', userRoutes);  //--> every request on this route will be directed to this route.
app.use('/product', productRoutes);  //--> every request on this route will be directed to this route.
app.use('/admin', adminRoutes); //--> every request on this route will be directed to adminroutes.
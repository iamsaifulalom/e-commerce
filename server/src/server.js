const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database/db');
const { expressLimiter } = require("./middleware/rateLimiter");
const helmet = require("helmet");
const morgan = require("morgan");


//routes
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const adminDashBoardRoutes = require('./routes/adminDashBoardRoutes');
const landingpageRoutes = require('./routes/landingpageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const keywordsRoutes = require('./routes/keywordsRoutes');
const checkOrigin = require('./middleware/corsMiddleWare');
const forceIPv4 = require('./helper/common/forceIPv4');
forceIPv4()


const PORT = process.env.PORT || 3002;

const app = express();
connectDB();


//middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan("dev"))
app.use(helmet());
app.use(expressLimiter);
app.use(cors({
    origin: checkOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// test route
app.get("/test", (_, res) => {
    res.send("Server working");
});


app.use("/users", userRoutes);
app.use("/media", imageRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/admin-dashboard", adminDashBoardRoutes);
app.use("/landing-page", landingpageRoutes);
app.use("/orders", orderRoutes);
app.use("/keywords", keywordsRoutes);

app.use((_, res) => {
    res.status(400).json({ error: "No route found" })
})
// server start
app.listen(PORT, () => {
    console.log(`server run at http://localhost:${PORT}`)
});
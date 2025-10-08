const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const setupSubscriptionNotifier = require('./utils/notificationScheduler');
const paymentRoutes = require('./routes/paymentRoutes');



dotenv.config();

//connect DB
connectDb();


const app = express();

//yr
const cors = require('cors');
app.use(cors());
///yr

app.use(express.json()); //middleware to accept json data



app.get('/', (req, res) => {
    res.send('API is running... 💹');
});
//mount the routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
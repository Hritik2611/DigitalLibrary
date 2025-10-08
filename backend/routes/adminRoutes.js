// src/routes/adminRoutes.js
const express = require('express');
const { getAllUsers, deleteUser, getAllSubscriptions } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// The request will be processed from left to right: first 'protect', then 'admin'
router.route('/users').get(protect, admin, getAllUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);

//subscriptio management route
router.route('/subscriptions').get(protect, admin, getAllSubscriptions);

module.exports = router;
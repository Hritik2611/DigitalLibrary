const User = require('../models/userModel');
// const subscription = require('../models/subscriptionModel');
const Subscription = require('../models/subscriptionModel');

//get all users
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password'); // find all users, exclude password
    res.json(users);
};

//delete a user
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await Subscription.deleteMany({ user: user.id });
    await user.deleteOne();
    return res.json({ message: 'User deleted successfully' }); 
  } else {
    return res.status(404).json({ message: 'User not found' }); 
  }
};

//get all subscription with user details
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1});
  res.json(subscriptions)  
  } catch (error) {
    res.status(500).json({message: 'Server Error' });
  }
};

module.exports = {getAllUsers, deleteUser, getAllSubscriptions }; 
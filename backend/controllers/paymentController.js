const Razorpay = require('razorpay');
const crypto = require('crypto');
const Subscription = require('../models/subscriptionModel');
const sendEmail = require('../utils/emailService');
const { error } = require('console');
//const { default: orders } = require('razorpay/dist/types/orders');

const prices = {
  '1-month': 299,
  '3-month': 899,
  '6-month': 1799,
  '12-month': 2599,
}; 

//create order
const createPaymentOrder = async (req, res) => {
    try{
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { plan } = req.body;
        const amount = prices[plan] * 100; //amount in paise

        const options = {
            amount : amount,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex'),
        };

        instance.orders.create(options, (error, order) => {
            if(error) {
                console.log(error);
                return res.status(500).json({message: 'Somthing went Wrong!'});
            }
            res.status(200).json({data: order});
        });
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
    }
};

//verify payment and create subscription
const verifyPayment = async (req, res)=> {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan} = req.body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

        if (razorpay_signature === expectedSign) {
            const startDate = new Date();
            const endDate = new Date();
            switch (plan) {
                case '1-month': endDate.setMonth(startDate.getMonth() + 1); break;
          case '3-month': endDate.setMonth(startDate.getMonth() + 3); break;
          case '6-month': endDate.setMonth(startDate.getMonth() + 6); break;
          case '12-month': endDate.setMonth(startDate.getMonth() + 12); break;
            }

            await Subscription.create({
             user: req.user._id,
             plan,
             startDate,
             endDate,
             status: 'active',
             paymentId: razorpay_payment_id,   
            });

            //send notification email to Admin
            await sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: `New Subscription Payment Received!`,
          html: `<h3>Payment Details</h3>
                 <p><strong>Student Name:</strong> ${req.user.name}</p>
                 <p><strong>Email:</strong> ${req.user.email}</p>
                 <p><strong>Plan:</strong> ${plan}</p>
                 <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>`,
      });
       return res.status(200).json({message: 'payment verified successfully'});
        } else {
            return res.status(400).json({message: 'Invalid signature sent!'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!'});
    }
}; 

module.exports = {createPaymentOrder, verifyPayment};
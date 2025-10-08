import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import Header from '../components/Header';

const DashboardPage = () => {
  // ... (existing useState and useEffect code)
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/subscriptions/my', config);
        setSubscription(data);
      } catch (err) {
        setError('No active subscription found. Please select a plan to get started!');
      } finally {
        setLoading(false);
      }
    };
    if (userInfo) fetchSubscription();
  }, [userInfo]);


  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          {loading ? (
            <p>Loading your details...</p>
          ) : subscription ? (
            // ... (existing Virtual ID card JSX)
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Virtual ID Card</h2>
              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
                <p className="text-sm opacity-80">Student Name</p>
                <p className="text-2xl font-bold mb-4">{userInfo.name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">Plan</p>
                    <p className="font-semibold">{subscription.plan}</p>
                  </div>
                   <div>
                    <p className="text-sm opacity-80">Expires On</p>
                    <p className="font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-500 text-center">
                    <p className="text-sm opacity-80">Days Remaining</p>
                    <p className="text-4xl font-bold">{subscription.remainingDays}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome!</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              {/* Change button to a Link */}
              <Link to="/plans" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                View Subscription Plans
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;


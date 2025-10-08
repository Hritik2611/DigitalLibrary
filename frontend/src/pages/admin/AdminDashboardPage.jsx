import React from 'react';
import AdminMenu from '../../components/AdminMenu'; // Make sure this import exists

const AdminDashboardPage = () => {
    // In a real app, you would fetch these stats from the backend
    const stats = {
        totalUsers: 57,
        activeSubscriptions: 41,
        revenueThisMonth: '₹25,000',
    };

    return (
        // The main div needs to be a flex container to hold the sidebar and the main content
        <div className="flex min-h-screen bg-gray-100">
            {/* THIS IS THE MISSING PIECE */}
            <AdminMenu />

            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
                        <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
                    </div>
                    {/* Stat Card 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-600">Active Subscriptions</h3>
                        <p className="text-4xl font-bold text-green-600 mt-2">{stats.activeSubscriptions}</p>
                    </div>
                    {/* Stat Card 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-600">Revenue This Month</h3>
                        <p className="text-4xl font-bold text-purple-600 mt-2">{stats.revenueThisMonth}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardPage;


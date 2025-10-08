import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const AdminMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <div className="font-bold text-lg mb-1">Admin Panel</div>
        {userInfo && (
          <div className="text-sm text-gray-600">
            <div>User ID: <span className="font-mono">{userInfo._id || userInfo.id}</span></div>
            <div className="text-xs text-green-600">{userInfo.email}</div>
          </div>
        )}
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li><Link to="/admin/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
          <li><Link to="/admin/users" className="hover:text-blue-600">Users</Link></li>
          <li><Link to="/admin/subscriptions" className="hover:text-blue-600">Subscriptions</Link></li>
          <li><Link to="/admin/payments" className="hover:text-blue-600">Payments</Link></li>
          <li><Link to="/admin/data" className="hover:text-blue-600">Data Controller</Link></li>
        </ul>
      </nav>
      <button
        className="m-4 mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminMenu;
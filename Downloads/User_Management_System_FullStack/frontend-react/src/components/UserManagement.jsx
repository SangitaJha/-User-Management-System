import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        userName: '',
        userPassword: '',
        userPhoneNumber: '',
        status: 'ACTIVE',
        addresses: []
    });
    const [newAddress, setNewAddress] = useState({
        fullAddress: '',
        addressType: 'HOME'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getAllUsers();
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addAddressToForm = () => {
        if (newAddress.fullAddress.trim()) {
            setFormData(prev => ({
                ...prev,
                addresses: [...prev.addresses, { ...newAddress }]
            }));
            setNewAddress({ fullAddress: '', addressType: 'HOME' });
        }
    };

    const removeAddressFromForm = (index) => {
        setFormData(prev => ({
            ...prev,
            addresses: prev.addresses.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.userName || !formData.userPassword || !formData.userPhoneNumber) {
            setError('Please fill in all required fields');
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.userPhoneNumber)) {
            setError('Phone number must be 10 digits');
            return;
        }

        try {
            if (editingUser) {
                await userAPI.updateUser(editingUser.userId, formData);
                setSuccess('User updated successfully!');
            } else {
                await userAPI.createUser(formData);
                setSuccess('User created successfully!');
            }
            
            resetForm();
            fetchUsers();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            userName: user.userName,
            userPassword: '',
            userPhoneNumber: user.userPhoneNumber,
            status: user.status,
            addresses: user.addresses || []
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userAPI.deleteUser(userId);
                setSuccess('User deleted successfully!');
                fetchUsers();
                setTimeout(() => setSuccess(null), 3000);
            } catch (err) {
                setError('Failed to delete user');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            userName: '',
            userPassword: '',
            userPhoneNumber: '',
            status: 'ACTIVE',
            addresses: []
        });
        setEditingUser(null);
        setError(null);
    };

    return (
        <div>
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="form-container">
                <h2 className="form-title">
                    {editingUser ? 'Edit User' : 'Create New User'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Username *</label>
                            <input
                                type="text"
                                name="userName"
                                className="form-control"
                                value={formData.userName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password *</label>
                            <input
                                type="password"
                                name="userPassword"
                                className="form-control"
                                value={formData.userPassword}
                                onChange={handleInputChange}
                                required
                                placeholder={editingUser ? 'Enter new password' : ''}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="text"
                                name="userPhoneNumber"
                                className="form-control"
                                value={formData.userPhoneNumber}
                                onChange={handleInputChange}
                                placeholder="10 digits"
                                maxLength="10"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Status *</label>
                            <select
                                name="status"
                                className="form-control"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="SUSPENDED">Suspended</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Add Addresses</label>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullAddress"
                                    className="form-control"
                                    value={newAddress.fullAddress}
                                    onChange={handleAddressInputChange}
                                    placeholder="Enter full address"
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    name="addressType"
                                    className="form-control"
                                    value={newAddress.addressType}
                                    onChange={handleAddressInputChange}
                                >
                                    <option value="HOME">Home</option>
                                    <option value="OFFICE">Office</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={addAddressToForm}>
                            Add Address
                        </button>
                    </div>

                    {formData.addresses.length > 0 && (
                        <div className="address-list">
                            <h4>Added Addresses:</h4>
                            {formData.addresses.map((addr, index) => (
                                <div key={index} className="address-item">
                                    <div>
                                        <span className="address-type">{addr.addressType}</span>
                                        {addr.fullAddress}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeAddressFromForm(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: '20px' }}>
                        <button type="submit" className="btn btn-primary">
                            {editingUser ? 'Update User' : 'Create User'}
                        </button>
                        {editingUser && (
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="table-container">
                <h2 className="form-title" style={{ padding: '20px' }}>All Users</h2>
                {loading ? (
                    <div className="loading">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📭</div>
                        <p>No users found. Create your first user!</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Registration Date</th>
                                <th>Status</th>
                                <th>Addresses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.userPhoneNumber}</td>
                                    <td>{new Date(user.dateOfRegistration).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge status-${user.status.toLowerCase()}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{user.addresses?.length || 0}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(user.userId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserManagement;

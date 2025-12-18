import React, { useState, useEffect } from 'react';
import { addressAPI, userAPI } from '../services/api';

const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        userId: '',
        fullAddress: '',
        addressType: 'HOME'
    });

    useEffect(() => {
        fetchAddresses();
        fetchUsers();
    }, []);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await addressAPI.getAllAddresses();
            setAddresses(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch addresses: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await userAPI.getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userId || !formData.fullAddress) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            if (editingAddress) {
                await addressAPI.updateAddress(editingAddress.addressId, {
                    fullAddress: formData.fullAddress,
                    addressType: formData.addressType
                });
                setSuccess('Address updated successfully!');
            } else {
                await addressAPI.createAddress(formData);
                setSuccess('Address created successfully!');
            }

            resetForm();
            fetchAddresses();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setFormData({
            userId: address.userId,
            fullAddress: address.fullAddress,
            addressType: address.addressType
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await addressAPI.deleteAddress(addressId);
                setSuccess('Address deleted successfully!');
                fetchAddresses();
                setTimeout(() => setSuccess(null), 3000);
            } catch (err) {
                setError('Failed to delete address');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            userId: '',
            fullAddress: '',
            addressType: 'HOME'
        });
        setEditingAddress(null);
        setError(null);
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.userId === userId);
        return user ? user.userName : 'Unknown';
    };

    return (
        <div>
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="form-container">
                <h2 className="form-title">
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select User *</label>
                        <select
                            name="userId"
                            className="form-control"
                            value={formData.userId}
                            onChange={handleInputChange}
                            required
                            disabled={editingAddress !== null}
                        >
                            <option value="">-- Select User --</option>
                            {users.map(user => (
                                <option key={user.userId} value={user.userId}>
                                    {user.userName} ({user.userPhoneNumber})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Full Address *</label>
                        <textarea
                            name="fullAddress"
                            className="form-control"
                            value={formData.fullAddress}
                            onChange={handleInputChange}
                            rows="3"
                            required
                            placeholder="Enter complete address"
                        />
                    </div>

                    <div className="form-group">
                        <label>Address Type *</label>
                        <select
                            name="addressType"
                            className="form-control"
                            value={formData.addressType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="HOME">Home</option>
                            <option value="OFFICE">Office</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">
                            {editingAddress ? 'Update Address' : 'Add Address'}
                        </button>
                        {editingAddress && (
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="table-container">
                <h2 className="form-title" style={{ padding: '20px' }}>All Addresses</h2>
                {loading ? (
                    <div className="loading">Loading addresses...</div>
                ) : addresses.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📍</div>
                        <p>No addresses found. Add your first address!</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addresses.map(address => (
                                <tr key={address.addressId}>
                                    <td>{address.addressId}</td>
                                    <td>{getUserName(address.userId)}</td>
                                    <td>{address.fullAddress}</td>
                                    <td>
                                        <span className="address-type">
                                            {address.addressType}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(address)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(address.addressId)}
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

export default AddressManagement;

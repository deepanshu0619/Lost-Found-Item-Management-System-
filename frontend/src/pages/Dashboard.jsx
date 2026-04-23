import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchItems();
        }
    }, [user, navigate, searchQuery]);

    const fetchItems = async () => {
        try {
            const { data } = await API.get(`/items/search?name=${searchQuery}`);
            setItems(data);
        } catch (error) {
            console.error('Error fetching items', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleItemAdded = () => {
        fetchItems(); // Refresh the list
    };

    const handleItemDeleted = async (id) => {
        try {
            await API.delete(`/items/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item', error);
            alert(error.response?.data?.message || 'Failed to delete');
        }
    };

    return (
        <div className="container mt-4 animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Welcome, {user?.name}</h2>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <ItemForm onItemAdded={handleItemAdded} />
                </div>
                <div className="col-md-8">
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search items by name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ItemList items={items} onDelete={handleItemDeleted} currentUserId={user?._id} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import { useState } from 'react';
import API from '../api/axios';

const ItemForm = ({ onItemAdded, itemToEdit, onEditComplete }) => {
    const [itemName, setItemName] = useState(itemToEdit ? itemToEdit.itemName : '');
    const [description, setDescription] = useState(itemToEdit ? itemToEdit.description : '');
    const [type, setType] = useState(itemToEdit ? itemToEdit.type : 'Lost');
    const [location, setLocation] = useState(itemToEdit ? itemToEdit.location : '');
    const [date, setDate] = useState(itemToEdit ? itemToEdit.date.split('T')[0] : '');
    const [contactInfo, setContactInfo] = useState(itemToEdit ? itemToEdit.contactInfo : '');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { itemName, description, type, location, date, contactInfo };
            if (itemToEdit) {
                await API.put(`/items/${itemToEdit._id}`, payload);
                if (onEditComplete) onEditComplete();
            } else {
                await API.post('/items', payload);
                // Reset form
                setItemName('');
                setDescription('');
                setType('Lost');
                setLocation('');
                setDate('');
                setContactInfo('');
            }
            if (onItemAdded) onItemAdded();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save item');
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h4 className="card-title">{itemToEdit ? 'Edit Item' : 'Report an Item'}</h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Item Name</label>
                        <input type="text" className="form-control" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label>Type</label>
                        <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Location</label>
                        <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Date</label>
                        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Contact Info</label>
                        <input type="text" className="form-control" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{itemToEdit ? 'Update Item' : 'Add Item'}</button>
                    {itemToEdit && (
                        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onEditComplete}>Cancel</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ItemForm;

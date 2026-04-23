import { useState } from 'react';
import ItemForm from './ItemForm';

const ItemList = ({ items, onDelete, currentUserId }) => {
    const [editingItemId, setEditingItemId] = useState(null);

    const getEditingItem = () => {
        return items.find(item => item._id === editingItemId);
    };

    return (
        <div>
            {editingItemId && (
                <div className="mb-4">
                    <ItemForm 
                        itemToEdit={getEditingItem()} 
                        onEditComplete={() => setEditingItemId(null)} 
                        onItemAdded={() => {
                            setEditingItemId(null);
                            // Normally we would pass an onItemEdited handler up to fetch again,
                            // but the parent Dashboard will fetch eventually. We can trigger a refresh manually or through context.
                            // The easiest way is to reload window or pass the fetch function down.
                            // For a clean React flow, we'll suggest passing handleItemAdded. Let's fix that.
                            window.location.reload(); 
                        }}
                    />
                </div>
            )}
            
            <div className="row">
                {items.length === 0 ? (
                    <div className="col-12 text-center text-muted">No items found.</div>
                ) : (
                    items.map(item => (
                        <div key={item._id} className="col-12 mb-3">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="card-title">{item.itemName} <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>{item.type}</span></h5>
                                            <p className="card-text text-muted mb-1">{item.description}</p>
                                            <small className="d-block"><strong>Location:</strong> {item.location}</small>
                                            <small className="d-block"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</small>
                                            <small className="d-block"><strong>Contact:</strong> {item.contactInfo}</small>
                                        </div>
                                        {currentUserId && item.userId && item.userId._id === currentUserId && (
                                            <div>
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingItemId(item._id)}>Edit</button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 text-muted" style={{ fontSize: '0.8rem' }}>
                                        Reported by {item.userId ? item.userId.name : 'Unknown User'} on {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ItemList;

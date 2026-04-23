import Item from '../models/Item.js';

export const getItems = async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};
        
        if (name) {
            query.itemName = { $regex: name, $options: 'i' };
        }
        
        const items = await Item.find(query).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('userId', 'name email');
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createItem = async (req, res) => {
    try {
        const { itemName, description, type, location, date, contactInfo } = req.body;

        if (!itemName || !description || !type || !location || !date || !contactInfo) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const item = await Item.create({
            itemName,
            description,
            type,
            location,
            date,
            contactInfo,
            userId: req.user._id
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to update this item' });
        }

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this item' });
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

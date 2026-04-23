import express from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route to search or get items, or protect it all? Let's assume all users can view items.
router.route('/items')
    .get(getItems)
    .post(protect, createItem);

router.route('/items/search')
    .get(getItems); // Already handles query params

router.route('/items/:id')
    .get(getItemById)
    .put(protect, updateItem)
    .delete(protect, deleteItem);

export default router;

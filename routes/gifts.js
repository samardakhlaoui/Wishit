const express = require ('express');
const router = express.Router();

const { readselflist,readotherslist, createlist, updatelist, deletelist, readGiftlist, likeGift } = require('../controllers/gifts.js');

router.get('/', readGiftlist);
router.get('/:id', readselflist);
router.get('/wishlist/:id', readotherslist);
router.post('/', createlist);
router.put('/:id', updatelist);
router.patch('/:id',likeGift);
router.delete('/:id', deletelist);


module.exports = router ;

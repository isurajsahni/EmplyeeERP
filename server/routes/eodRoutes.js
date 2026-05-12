const express = require('express');
const router = express.Router();
const { submitEOD, getMyEODs, getAllEODs, reviewEOD } = require('../controllers/eodController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.post('/', submitEOD);
router.get('/my', getMyEODs);
router.get('/all', authorize('super_admin', 'admin', 'hr'), getAllEODs);
router.put('/:id/review', authorize('super_admin', 'admin'), reviewEOD);

module.exports = router;

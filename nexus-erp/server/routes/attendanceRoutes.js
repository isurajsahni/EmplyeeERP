const express = require('express');
const router = express.Router();
const { markLogin, markLogout, startBreak, endBreak, getToday, getMyAttendance, getAllAttendance, getLiveStatus } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.post('/login', markLogin);
router.post('/logout', markLogout);
router.post('/break/start', startBreak);
router.post('/break/end', endBreak);
router.get('/today', getToday);
router.get('/my', getMyAttendance);
router.get('/all', authorize('super_admin', 'admin', 'hr'), getAllAttendance);
router.get('/live', authorize('super_admin', 'admin', 'hr'), getLiveStatus);

module.exports = router;

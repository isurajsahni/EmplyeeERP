const Attendance = require('../models/Attendance');

// Helper to get today at midnight
const getToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

// @desc    Mark Login (employee clocks in)
// @route   POST /api/attendance/login
exports.markLogin = async (req, res, next) => {
  try {
    const today = getToday();
    const now = new Date();
    const shiftStart = new Date(today); shiftStart.setHours(9, 0, 0, 0); // 9 AM
    const isLate = now > shiftStart;
    const lateMinutes = isLate ? Math.round((now - shiftStart) / (1000 * 60)) : 0;

    let record = await Attendance.findOne({ user: req.user._id, date: today });
    if (record && record.isLoggedIn) {
      return res.status(400).json({ success: false, message: 'Already logged in today' });
    }

    record = await Attendance.findOneAndUpdate(
      { user: req.user._id, date: today },
      {
        user: req.user._id, date: today, loginTime: now, status: isLate ? 'late' : 'present',
        isLate, lateMinutes, isLoggedIn: true,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        deviceInfo: req.headers['user-agent'] || '',
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, attendance: record, message: isLate ? `Logged in ${lateMinutes}m late` : 'Logged in on time!' });
  } catch (error) { next(error); }
};

// @desc    Mark Logout (employee clocks out)
// @route   POST /api/attendance/logout
exports.markLogout = async (req, res, next) => {
  try {
    const today = getToday();
    const record = await Attendance.findOne({ user: req.user._id, date: today });
    if (!record || !record.loginTime) {
      return res.status(400).json({ success: false, message: 'No login found for today' });
    }
    if (!record.isLoggedIn) {
      return res.status(400).json({ success: false, message: 'Already logged out' });
    }
    // End any active break
    if (record.isOnBreak && record.breaks.length > 0) {
      const lastBreak = record.breaks[record.breaks.length - 1];
      if (!lastBreak.end) {
        lastBreak.end = new Date();
        lastBreak.duration = Math.round((lastBreak.end - lastBreak.start) / (1000 * 60));
      }
      record.isOnBreak = false;
    }
    record.logoutTime = new Date();
    record.isLoggedIn = false;
    record.calculateHours();
    await record.save();
    res.status(200).json({ success: true, attendance: record, message: `Logged out. Worked ${record.effectiveHours}h today.` });
  } catch (error) { next(error); }
};

// @desc    Start Break
// @route   POST /api/attendance/break/start
exports.startBreak = async (req, res, next) => {
  try {
    const today = getToday();
    const record = await Attendance.findOne({ user: req.user._id, date: today });
    if (!record || !record.isLoggedIn) return res.status(400).json({ success: false, message: 'Not logged in' });
    if (record.isOnBreak) return res.status(400).json({ success: false, message: 'Already on break' });
    record.breaks.push({ start: new Date() });
    record.isOnBreak = true;
    await record.save();
    res.status(200).json({ success: true, attendance: record, message: 'Break started' });
  } catch (error) { next(error); }
};

// @desc    End Break
// @route   POST /api/attendance/break/end
exports.endBreak = async (req, res, next) => {
  try {
    const today = getToday();
    const record = await Attendance.findOne({ user: req.user._id, date: today });
    if (!record || !record.isOnBreak) return res.status(400).json({ success: false, message: 'Not on break' });
    const lastBreak = record.breaks[record.breaks.length - 1];
    lastBreak.end = new Date();
    lastBreak.duration = Math.round((lastBreak.end - lastBreak.start) / (1000 * 60));
    record.isOnBreak = false;
    await record.save();
    res.status(200).json({ success: true, attendance: record, message: `Break ended (${lastBreak.duration}m)` });
  } catch (error) { next(error); }
};

// @desc    Get today's status for current user
// @route   GET /api/attendance/today
exports.getToday = async (req, res, next) => {
  try {
    const today = getToday();
    let record = await Attendance.findOne({ user: req.user._id, date: today });
    res.status(200).json({ success: true, attendance: record });
  } catch (error) { next(error); }
};

// @desc    Get my attendance history
// @route   GET /api/attendance/my
exports.getMyAttendance = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    let filter = { user: req.user._id };
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }
    const records = await Attendance.find(filter).sort({ date: -1 }).limit(60);
    res.status(200).json({ success: true, count: records.length, attendance: records });
  } catch (error) { next(error); }
};

// @desc    Get all employees' attendance (admin)
// @route   GET /api/attendance/all
exports.getAllAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find()
      .populate('user', 'name email avatar department designation role')
      .sort({ date: -1 }).limit(300);
    res.status(200).json({ success: true, count: records.length, attendance: records });
  } catch (error) { next(error); }
};

// @desc    Get live status of all employees (admin dashboard)
// @route   GET /api/attendance/live
exports.getLiveStatus = async (req, res, next) => {
  try {
    const today = getToday();
    const records = await Attendance.find({ date: today })
      .populate('user', 'name email avatar department designation role');
    res.status(200).json({ success: true, attendance: records });
  } catch (error) { next(error); }
};

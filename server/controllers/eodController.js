const EODReport = require('../models/EODReport');
const Attendance = require('../models/Attendance');

// @desc    Submit EOD report
// @route   POST /api/eod
exports.submitEOD = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check existing report for today
    const existing = await EODReport.findOne({ user: req.user._id, date: today });
    if (existing && existing.status === 'submitted') {
      return res.status(400).json({ success: false, message: 'EOD already submitted for today' });
    }

    const wordCount = (req.body.tasksCompleted || '').split(/\s+/).filter(Boolean).length;

    const eod = existing
      ? await EODReport.findByIdAndUpdate(existing._id, { ...req.body, wordCount, status: 'submitted' }, { new: true })
      : await EODReport.create({ ...req.body, user: req.user._id, date: today, wordCount, status: 'submitted' });

    // Auto-mark attendance from EOD submission
    await Attendance.findOneAndUpdate(
      { user: req.user._id, date: today },
      { user: req.user._id, date: today, status: 'present', autoMarked: true, checkIn: new Date() },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, eod });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my EOD reports
// @route   GET /api/eod/my
exports.getMyEODs = async (req, res, next) => {
  try {
    const eods = await EODReport.find({ user: req.user._id }).sort({ date: -1 }).limit(30);
    res.status(200).json({ success: true, eods });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all EOD reports (admin/manager)
// @route   GET /api/eod/all
exports.getAllEODs = async (req, res, next) => {
  try {
    const eods = await EODReport.find()
      .populate('user', 'name email avatar department')
      .sort({ date: -1 })
      .limit(100);
    res.status(200).json({ success: true, count: eods.length, eods });
  } catch (error) {
    next(error);
  }
};

// @desc    Review EOD report (approve/reject)
// @route   PUT /api/eod/:id/review
exports.reviewEOD = async (req, res, next) => {
  try {
    const { status, reviewNote } = req.body;
    const eod = await EODReport.findByIdAndUpdate(req.params.id, {
      status, reviewNote, reviewedBy: req.user._id
    }, { new: true }).populate('user', 'name email avatar');

    if (!eod) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, eod });
  } catch (error) {
    next(error);
  }
};

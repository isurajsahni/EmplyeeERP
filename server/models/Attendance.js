const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  loginTime: { type: Date },
  logoutTime: { type: Date },
  breaks: [{
    start: { type: Date },
    end: { type: Date },
    duration: { type: Number, default: 0 } // minutes
  }],
  status: { type: String, enum: ['present', 'absent', 'late', 'half_day', 'leave', 'wfh', 'holiday'], default: 'absent' },
  workHours: { type: Number, default: 0 },
  breakHours: { type: Number, default: 0 },
  effectiveHours: { type: Number, default: 0 },
  isLate: { type: Boolean, default: false },
  lateMinutes: { type: Number, default: 0 },
  eodSubmitted: { type: Boolean, default: false },
  attendanceScore: { type: Number, min: 0, max: 100, default: 0 },
  ipAddress: { type: String, default: '' },
  deviceInfo: { type: String, default: '' },
  notes: { type: String, default: '' },
  autoMarked: { type: Boolean, default: false },
  isOnBreak: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
}, { timestamps: true });

attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

// Calculate effective hours
attendanceSchema.methods.calculateHours = function () {
  if (this.loginTime && this.logoutTime) {
    this.workHours = parseFloat(((this.logoutTime - this.loginTime) / (1000 * 60 * 60)).toFixed(2));
    this.breakHours = parseFloat((this.breaks.reduce((sum, b) => sum + (b.duration || 0), 0) / 60).toFixed(2));
    this.effectiveHours = parseFloat((this.workHours - this.breakHours).toFixed(2));
  }
  // Attendance score: 100 if 8+ hours, proportional otherwise
  this.attendanceScore = Math.min(100, Math.round((this.effectiveHours / 8) * 100));
  return this;
};

module.exports = mongoose.model('Attendance', attendanceSchema);

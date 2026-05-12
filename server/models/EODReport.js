const mongoose = require('mongoose');

const eodReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  tasksCompleted: { type: String, required: true },
  tasksInProgress: { type: String, default: '' },
  blockers: { type: String, default: '' },
  plannedForTomorrow: { type: String, default: '' },
  mood: { type: String, enum: ['great', 'good', 'neutral', 'stressed', 'bad'], default: 'neutral' },
  productivityScore: { type: Number, min: 1, max: 10, default: 5 },
  status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected'], default: 'draft' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewNote: { type: String, default: '' },
  wordCount: { type: Number, default: 0 },
}, { timestamps: true });

eodReportSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('EODReport', eodReportSchema);

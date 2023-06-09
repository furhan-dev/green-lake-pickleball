const mongoose = require('mongoose');
const Event = require('../models/event');

module.exports = {};

module.exports.create = async (userId, eventObj) => {
  try {
    const { start, end } = eventObj;
    return await Event.create({
      createdBy: userId,
      start: new Date(start),
      end: new Date(end),
      ...eventObj,
    });
  } catch (e) {
    throw new BadDataError('Create event failed!');
  }
};

module.exports.updateById = async (userId, eventId, newEventObj) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return false;
  }

  try {
    await Event.updateOne(
      { _id: eventId },
      { modifiedBy: userId, ...newEventObj }
    ).lean();
    return true;
  } catch (e) {
    throw new BadDataError(`Updating event: ${eventId} failed!`);
  }
};

module.exports.getById = async (eventId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return null;
  }

  try {
    return await Event.findOne({ _id: eventId }).lean();
  } catch (e) {
    throw new Error(`Getting event: ${eventId} failed!`);
  }
};

module.exports.getByDateRange = async (startDate, endDate) => {
  try {
    return await Event.find({
      start: { $gte: startDate },
      end: { $lte: endDate },
    })
      .sort({ start: 1 })
      .lean();
  } catch (e) {
    throw new Error(`Getting events by date range failed! ${e}`);
  }
};

module.exports.getAll = async (page, perPage) => {
  try {
    return await Event.find()
      .limit(perPage)
      .skip(perPage * page)
      .sort({ start: 1 })
      .lean();
  } catch (e) {
    throw new Error('Getting all events failed!');
  }
};

module.exports.deleteById = async (eventId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return false;
  }

  try {
    await Event.deleteOne({ _id: eventId }).lean();
  } catch (e) {
    throw new Error(`Deleting event: ${eventId} failed!`);
  }
};

class BadDataError extends Error {}
module.exports.BadDataError = BadDataError;

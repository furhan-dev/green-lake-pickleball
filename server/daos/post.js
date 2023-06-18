const mongoose = require('mongoose');
const Post = require('../models/post');

module.exports = {};

module.exports.create = async (userId, postObj) => {
  try {
    return await Post.create({ userId, ...postObj });
  } catch (e) {
    throw new BadDataError('Create post failed!');
  }
};

module.exports.updateById = async (postId, newPostObj) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return false;
  }

  try {
    await Post.updateOne({ _id: postId }, newPostObj).lean();
    return true;
  } catch (e) {
    throw new BadDataError(`Updating post: ${postId} failed!`);
  }
};

module.exports.getById = async (postId) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return null;
  }

  try {
    return await Post.findOne({ _id: postId }).lean();
  } catch (e) {
    throw new Error(`Getting post: ${postId} failed!`);
  }
};

module.exports.getAll = async (page, perPage) => {
  try {
    return await Post.find()
      .limit(perPage)
      .skip(perPage * page)
      .lean();
  } catch (e) {
    throw new Error('Getting all posts failed!');
  }
};

module.exports.deleteById = async (postId) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return false;
  }

  try {
    await Post.deleteOne({ _id: postId }).lean();
  } catch (e) {
    throw new Error(`Deleting post: ${postId} failed!`);
  }
};

class BadDataError extends Error {}
module.exports.BadDataError = BadDataError;

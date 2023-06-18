const User = require('../models/user');
const testUtils = require('../test-utils');

// const thoughtSeeds = require('./thoughtSeeds.json');

await testUtils.connectDB();
try {
  // await Thought.deleteMany({});
  await User.deleteMany({});

  await User.create(userSeeds);

  // for (let i = 0; i < thoughtSeeds.length; i++) {
  //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
  //   const user = await User.findOneAndUpdate(
  //     { username: thoughtAuthor },
  //     {
  //       $addToSet: {
  //         thoughts: _id,
  //       },
  //     }
  //   );
  // }
} catch (err) {
  console.error(err);
  process.exit(1);
}

testUtils.stopDB();
console.log('all done!');
process.exit(0);

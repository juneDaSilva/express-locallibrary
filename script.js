const mongoose = require('mongoose');
const User = require('./models/User.js');

mongoose.connect('mongodb://localhost/testdb');

run();

async function run() {
  try {
    const user = new User({ name: 'June', age: 32 });
    await user.save();
    console.log(user);
  } catch (e) {
    console.log('ERROR: ', e.message);
  }
}

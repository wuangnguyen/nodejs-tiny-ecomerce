const users = require('./users/users.service.js');
const activityServiceV1 = require('./activities/v1/activities.service');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(activityServiceV1);
};

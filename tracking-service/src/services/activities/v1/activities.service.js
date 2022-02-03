// Initializes the `activities` service on path `v1/activities`
const { Activities } = require('./activities.class');
const createModel = require('../../../models/activities.model');
const hooks = require('./activities.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('v1/activities', new Activities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/activities');

  service.hooks(hooks);
};

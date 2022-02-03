const { authenticate } = require('@feathersjs/authentication').hooks;
const restrictAccess = require('../../../hooks/restrict');
module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [restrictAccess],
    update: [restrictAccess],
    patch: [restrictAccess],
    remove: [restrictAccess]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

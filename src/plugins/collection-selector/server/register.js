'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'collection',
    plugin: 'collection-selector',
    type: 'string',
  });
};

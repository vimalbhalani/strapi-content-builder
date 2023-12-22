"use strict";
const { sanitize, validate } = require("@strapi/utils");

module.exports = ({ strapi }) => ({
  async index(ctx) {
    // try {
    //   ctx.body = await strapi
    //   .plugin("collection-selector")
    //   .service("myService")
    //   .getWelcomeMessage();
    // } catch (error) {
    //   console.log('error', error);
    //   throw error
    // }
    const { collectionName} = ctx.query;

    try {
      const contentType = strapi.contentType(collectionName);
      await validate.contentAPI.query(ctx.query, contentType, {
        auth: ctx.state.auth,
      });
      const sanitizedQueryParams = await sanitize.contentAPI.query(
        ctx.query,
        contentType,
        { auth: ctx.state.auth }
      );


      const entities = await strapi.entityService.findMany(
        contentType.uid,
        sanitizedQueryParams
      );
      const result = await sanitize.contentAPI.output(entities, contentType, {
        auth: ctx.state.auth,
      });

      ctx.send(result);
    } catch (error) {
      console.log('error', error);
      ctx.throw(500, 'Error fetching data', { error });
    }
  },
});

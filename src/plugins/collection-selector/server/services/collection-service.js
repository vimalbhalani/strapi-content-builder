'use strict';

const { request, useFetchClient, auth } = require("@strapi/helper-plugin");
const qs = require("qs");

module.exports = ({ strapi }) => ({
  async getWelcomeMessage() {
    // const fetch = useFetchClient();
    const query = qs.stringify({
      filters: {
        $and: [
          {
            kind: {
              $eq: "collectionType"
            }
          },
          {
            isDisplayed: {
              $eq: true
            }
          }
        ]
      }
    }, {
      encodeValuesOnly: true
    })

    const response = await fetch(`http://localhost:1337/content-manager/content-types?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${auth.get("jwtToken")}`
      }
    });
    console.log('response', response);
    return response.json();
    // const response =
    // return 'Welcome to Strapi 🚀';
  },
});

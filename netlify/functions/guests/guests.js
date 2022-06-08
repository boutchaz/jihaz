// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const table = require('../../utils/Airtable');

const handler = async (event) => {

  try {
    let user = undefined;
    const {uid} = event.queryStringParameters;
    if(uid){
      const user = await table.find(uid);
      return {
        statusCode: 200,
        body: JSON.stringify({ guest: user.fields }),
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ guest:'Oops Make sure you are invited '}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }

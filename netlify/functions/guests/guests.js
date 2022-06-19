// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const table = require('../../utils/Airtable');

const handler = async (event) => {
  const {uid} = event.queryStringParameters;
  const eventBody = JSON.parse(event.body)
  if(eventBody.wish){
    try {
      await table.update([
        {
          "id": uid,
          "fields": {
            "wish": eventBody.wish
          }
        }])
    } catch (error) {
      if (err) {
        return { statusCode: 500, body: error.toString() }
      }
    }
  }else{
    try {
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
 
}
module.exports = { handler }

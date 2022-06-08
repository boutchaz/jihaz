// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const table = require('../../utils/Airtable');

const handler = async (event) => {
  try {
    table.select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
          console.log('Retrieved', record.get('fullname'));
      });
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }

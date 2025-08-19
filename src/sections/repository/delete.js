const dynamo = require('../../utils/dynamoClient');

const TABLE = process.env.SECTION_TABLE;

module.exports = async (sectionID) => {
  console.log("Deleting sectionID:", sectionID);
  const params = {
    TableName: TABLE,
    Key: { sectionID }
  };

  await dynamo.delete(params).promise();
  return { message: `Section ${sectionID} deleted.` };
};

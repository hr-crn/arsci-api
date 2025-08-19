const dynamo = require('../../utils/dynamoClient');

const TABLE = process.env.SECTION_TABLE;

module.exports = async (sectionID) => {
  const params = {
    TableName: TABLE,
    Key: { sectionID }
  };

  const result = await dynamo.get(params).promise();
  return result.Item;
};

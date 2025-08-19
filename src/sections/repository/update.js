const dynamo = require('../../utils/dynamoClient');

const TABLE = process.env.SECTION_TABLE;

module.exports = async (sectionID, data) => {
  const params = {
    TableName: TABLE,
    Key: { sectionID },
    UpdateExpression: 'set #sectionName = :sectionName',
    ExpressionAttributeNames: {
      '#sectionName': 'sectionName'
    },
    ExpressionAttributeValues: {
      ':sectionName': data.sectionName
    },
    ReturnValues: 'ALL_NEW'
  };

  const result = await dynamo.update(params).promise();
  return result.Attributes;
};
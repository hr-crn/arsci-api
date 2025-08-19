const dynamo = require('../../utils/dynamoClient');

const TABLE = process.env.STUDENT_TABLE;

module.exports = async (studentID) => {
  const params = {
    TableName: TABLE,
    Key: { studentID }
  };

  const result = await dynamo.get(params).promise();
  return result.Item;
};

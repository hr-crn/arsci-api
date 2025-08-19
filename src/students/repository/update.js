const dynamo = require('../../utils/dynamoClient');

const TABLE = process.env.STUDENT_TABLE;

module.exports = async (studentID, data) => {
  const params = {
    TableName: TABLE,
    Key: { studentID },
    UpdateExpression: 'set #name = :name, #sectionID = :sectionID, #username = :username, #password = :password',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#sectionID': 'sectionID',
      '#username': 'username',
      '#password': 'password'
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':sectionID': data.sectionID,
      ':username': data.username,
      ':password': data.password
    },
    ReturnValues: 'ALL_NEW'
  };

  const result = await dynamo.update(params).promise();
  return result.Attributes;
};

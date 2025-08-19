const dynamo = require('../../utils/dynamoClient');
const { v4: uuidv4 } = require('uuid');
const TABLE = process.env.STUDENT_TABLE;

module.exports = async function createStudent(data) {
  const item = {
    studentID: uuidv4(),
    name: data.name,
    sectionID: data.sectionID,
    username: data.username,
    password: data.password,
    createdAt: new Date().toISOString()
  };

  await dynamo.put({ TableName: TABLE, Item: item }).promise();
  return item;
};
const dynamo = require('../../utils/dynamoClient');

const TABLE = process.env.STUDENT_TABLE;

module.exports = async (studentID) => {
  console.log("Deleting studentID:", studentID); // 
  const params = {
    TableName: TABLE,
    Key: { studentID }
  };

  await dynamo.delete(params).promise();
  return { message: `Student ${studentID} deleted.` };
};

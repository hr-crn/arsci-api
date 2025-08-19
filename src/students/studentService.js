const verifyAuth = require('../utils/verifyAuth');
const create = require('./repository/create');
const get = require('./repository/get');
const update = require('./repository/update');
const remove = require('./repository/delete');
const list = require('./repository/list');
const { success, failure } = require('../utils/response');

module.exports = {
  async createStudent(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const data = JSON.parse(event.body);
      // Business Logics such as existing email;
      const student = await create(data);
      return success(student, 201);
    } catch (err) {
      return failure(err);
    }
  },
  async getStudent(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const { studentID } = event.pathParameters;
      const student = await get(studentID);
      return success(student);
    } catch (err) {
      return failure(err);
    }
  },
  async updateStudent(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const { studentID } = event.pathParameters;
      const data = JSON.parse(event.body);
      const student = await update(studentID, data);
      return success(student);
    } catch (err) {
      return failure(err);
    }
  },
  async deleteStudent(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const { studentID } = event.pathParameters;
      const result = await remove(studentID);
      return success(result);
    } catch (err) {
      return failure(err);
    }
  },
  async listStudents(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const students = await list();
      return success(students);
    } catch (err) {
      return failure(err);
    }
  }
};

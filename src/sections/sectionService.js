const verifyAuth = require('../utils/verifyAuth');
const create = require('./repository/create');
const get = require('./repository/get');
const update = require('./repository/update');
const remove = require('./repository/delete');
const list = require('./repository/list');
const { success, failure } = require('../utils/response');

module.exports = {
  async createSection(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const data = JSON.parse(event.body);
      // Business Logics such as existing email;
      const section = await create(data);
      return success(section, 201);
    } catch (err) {
      return failure(err);
    }
  },
  async getSection(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const { sectionID } = event.pathParameters;
      const section = await get(sectionID);
      return success(section);
    } catch (err) {
      return failure(err);
    }
  },
  async updateSection(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const { sectionID } = event.pathParameters;
      const data = JSON.parse(event.body);
      const section = await update(sectionID, data);
      return success(section);
    } catch (err) {
      return failure(err);
    }
  },
  async deleteSection(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const { sectionID } = event.pathParameters;
      const result = await remove(sectionID);
      return success(result);
    } catch (err) {
      return failure(err);
    }
  },
  async listSections(event) {
    const auth = verifyAuth(event);
    if (!auth.valid) return failure({ message: auth.message }, 401);
    try {
      const sections = await list();
      return success(sections);
    } catch (err) {
      return failure(err);
    }
  }
};

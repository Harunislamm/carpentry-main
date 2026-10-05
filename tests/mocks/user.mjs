import { state } from './state.mjs';
const User = {
  async findOne(query) {
    state.userFindOneQuery = query;
    return state.userFindOneResult;
  },
  async create(data) {
    state.userCreated.push(data);
    return state.userCreateResult || { _id: 'user-created', role: 'user', ...data };
  },
  findById(id) {
    state.userFindById = id;
    return {
      async select(fields) {
        state.userSelectFields = fields;
        return state.userByIdResult;
      }
    };
  }
};
export default User;

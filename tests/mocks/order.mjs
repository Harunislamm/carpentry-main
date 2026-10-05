import { state } from './state.mjs';
const Order = {
  find(query) {
    state.orderFindQuery = query;
    return {
      async sort(sortArg) {
        state.orderSortArg = sortArg;
        if (state.orderFindError) throw state.orderFindError;
        return state.orderList;
      }
    };
  },
  async findByIdAndUpdate(id, update, options) {
    state.orderUpdateArgs = { id, update, options };
    if (state.orderUpdateError) throw state.orderUpdateError;
    return state.orderUpdated;
  },
  async create(data) {
    if (state.orderCreateError) throw state.orderCreateError;
    state.orderCreated.push(data);
    return { _id: 'order-created-1', ...data };
  }
};
export default Order;

import { state } from './state.mjs';
const Product = {
  find(query) {
    state.productFindQuery = query;
    return { async sort(arg) { state.productSortArg = arg; return state.productList; } };
  },
  async create(data) { state.productCreated.push(data); return { _id: 'product-created', ...data }; },
  async findById(id) { state.productFindById = id; return state.productFindByIdResult; },
  async findByIdAndDelete(id) { state.productDeleteId = id; return state.productDeleted; }
};
export default Product;

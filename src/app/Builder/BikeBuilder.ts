import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter() {
    const queryObject = { ...this.query };

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getQuery();
    const total = await this.modelQuery.model.countDocuments(totalQueries);

    return {
      total,
    };
  }
}

export default QueryBuilder;

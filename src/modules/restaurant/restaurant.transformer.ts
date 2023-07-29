export class RestaurantTransformer {
  static toResponse(board) {
    const { _id, __v, ...rest } = board;
    return {
      id: _id.toString(),
      ...rest,
    };
  }
}

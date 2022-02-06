// const productController = require('../../../src/controllers/product.controller');
// const ProductService = require('../../../src/services/product.service');
// jest.mock('ProductService');
describe('Product controller', () => {
  // let productService;
  // beforeEach(() => {
  //     jest.restoreAllMocks();
  //     productService = new ProductService();
  //   });
  //   test('should return 200 when product service return valid data', () => {
  //     const mockData = [{ name: 'product 1' }];
  //     ProductService.find.mockResolvedValue([{ name: 'product 1' }]);
  //     const mockRequest = (query) => ({
  //       query: query
  //     });
  //     const mockResponse = () => {
  //       const res = mockData;
  //       res.status = jest.fn().mockReturnValue(res);
  //       res.json = jest.fn().mockReturnValue(res);
  //       return res;
  //     };
  //     const productController = new productController(productService);
  //     productController.find(mockRequest({ name: 'test name', price: '>200', sort: '-name' }), mockResponse);
  //     expect(ProductService.find).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         filter: { name: 'test name', price: { $gt: 200 } },
  //         options: { sort: { name: 1 } }
  //       })
  //     );
  //     // expect(next).toHaveBeenCalledWith(
  //     //     expect.objectContaining({
  //     //       statusCode: error.statusCode,
  //     //       message: error.message,
  //     //       isOperational: false,
  //     //     })
  //     //   );
  //   });
});

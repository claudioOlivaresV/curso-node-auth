import { ProductModel } from "../data/mongooo/models/product.model";
import { CreateProductDto } from "../domain/dtos/products/create-product.dto";
import { PaginatorDto } from "../domain/dtos/shared/pagintation.dto";
import { UserEntity } from "../domain/entities/user-entity";
import { CustomError } from "../domain/erros/custom-error";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExists) throw CustomError.badRequest("Product already exists");

    try {
      const product = new ProductModel({
        ...createProductDto,
      });
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServerError(
        "Internal server - create category",
      );
    }
  }
  async getProducts(paginationDto: PaginatorDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user", "mame email role"),
      ]);
      return {
        products,
        page,
        limit,
        total,
      };
    } catch (error) {
      console.log(error);

      throw CustomError.internalServerError();
    }
  }
}

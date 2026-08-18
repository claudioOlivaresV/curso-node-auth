import { CategoryModel } from "../data/mongooo/models/category.mode";
import { CreateCategoryDto } from "../domain/dtos/categories/create-category.dto";
import { UserEntity } from "../domain/entities/user-entity";
import { CustomError } from "../domain/erros/custom-error";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists)
      throw CustomError.badRequest("Categoria already exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();

      return {
        id: category.id,
        name: category.name,
        avialable: category.available,
      };
    } catch (error) {
      throw CustomError.internalServerError(
        "Internal server - create category",
      );
    }
  }
  async getCategories() {
    try {
      const categories = await CategoryModel.find();
      return categories.map((category) => ({
        id: category.id,
        name: category.name,
        available: category.available,
      }));
    } catch (error) {
      console.log(error);

      throw CustomError.internalServerError();
    }
  }
}

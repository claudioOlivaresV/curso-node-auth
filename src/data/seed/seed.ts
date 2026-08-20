import { env } from "process";
import { envs } from "../../config/envs";
import { MongoDatabase } from "../mongooo/mong-database";
import { UserModel } from "../mongooo/models/user.model";
import { CategoryModel } from "../mongooo/models/category.mode";
import { ProductModel } from "../mongooo/models/product.model";
import { seedData } from "./data";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();

  MongoDatabase.disconnect();
})();

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);
  const randomBeetweend = (x: number) => {
    return Math.floor(Math.random() * x);
  };
  const users = await seedData.users();

  const user = await UserModel.insertMany(users);

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: user[0]._id,
      };
    }),
  );
  const product = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: user[randomBeetweend(user.length - 1)]._id,
        category:
          categories[randomBeetweend(seedData.categories.length - 1)]._id,
      };
    }),
  );
}

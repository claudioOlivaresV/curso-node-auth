import { env } from "process";
import { envs } from "../../config/envs";
import { MongoDatabase } from "../mongooo/mong-database";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();

  MongoDatabase.disconnect();
})();

async function main() {}

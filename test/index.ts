import { MongoDB } from "class-repo-mongo";
import { ExtendedBLL } from "./bllExtention/ExtendedBLL";

(async () => {
  const mongodb = new MongoDB(
    `mongodb://client:client@localhost:27017,localhost:27018,localhost:27019/main?replicaSet=rs0&readPreference=primary&ssl=false&authSource=admin`
  );

  try {
    await mongodb.init();

    console.log("Mongo connected");

    ExtendedBLL.test.getAll({ query: {} });

    // Run your http server
  } catch (e) {
    console.error("Error starting the server: ", e);
  }
})();

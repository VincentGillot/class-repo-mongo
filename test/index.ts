import { API } from "class-repo-mongo";
import mongoose from "mongoose";
import { ExtendedBLL } from "./bll/ExtendedBLL";

(async () => {
  const conn = mongoose.createConnection(
    `mongodb://client:client@localhost:27000/main?&ssl=false&authSource=admin`
  );
  const api = new API<ExtendedBLL>(conn, {
    BLL: ExtendedBLL,
  });
  // const api = new API(conn);

  try {
    await api.init();

    const bll = api.bll;

    const users = await bll.user.getAll({
      query: {},
    });
    console.log("users: ", users);

    const test = bll.test.getAll({ query: {} });
    console.log("test: ", test);

    // Run your http server
  } catch (e) {
    console.error("Error starting the server: ", e);
  }
})();

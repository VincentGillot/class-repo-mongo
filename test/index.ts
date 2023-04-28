import { API } from "class-repo-mongo";
import mongoose from "mongoose";
import { ExtendedBLL } from "./bll/ExtendedBLL";

(async () => {
  const conn = mongoose.createConnection(
    `mongodb://client:client@localhost:27000/main?&ssl=false&authSource=admin`
  );
  const api = new API(conn, {
    customBLL: ExtendedBLL,
  });
  // const api = new API(conn);

  try {
    await api.init();

    const bll = api.bll;

    const user = await bll.user.get({
      query: {},
    });
    console.log("users: ", user?.toObject());

    const test = await bll.test.get({ query: {} });
    console.log("test: ", test);

    // Run your http server
  } catch (e) {
    console.error("Error starting the server: ", e);
  }
})();

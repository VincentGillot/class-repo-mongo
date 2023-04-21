import { MongoDB } from "./repository/mongodb/mongodb";

(async () => {
  const mongodb = new MongoDB();

  try {
    await mongodb.init();

    // Run your http server
  } catch (e) {
    console.error("Error starting the server: ", e);
  }
})();

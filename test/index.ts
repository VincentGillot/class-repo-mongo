const { MongoDB } = require("class-repo-mongo");

(async () => {
  const mongodb = new MongoDB("");

  try {
    await mongodb.init();

    // Run your http server
  } catch (e) {
    console.error("Error starting the server: ", e);
  }
})();

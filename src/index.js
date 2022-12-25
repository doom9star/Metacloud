const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { connectDB } = require("./models");
const MainRouter = require("./routes/index");

const main = async () => {
  dotenv.config({ path: path.join(__dirname, "../.env") });

  await connectDB();

  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(cookieParser());
  app.use(
    express.json({
      limit: "15mb",
    })
  );
  app.use("/", MainRouter);
  app.use(express.static(path.join(__dirname, "public")));

  app.listen(process.env.PORT, () => {
    console.log(`web-server running at http://localhost:${process.env.PORT}`);
  });
};

main();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import {
  API_PORT,
  MONGO_CONNECTION_URI,
  MONGO_DB_NAME,
  MONGO_DB_PORT,
} from "./config";
// import categoryRouter from "./routes/categoriesRouter";
// import postRouter from "./routes/postRouter";
// import userRouter from "./routes/userRouter";
import caseRouter from "./routes/caseRouter";

mongoose
  .connect(`${MONGO_CONNECTION_URI}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`)
  .then(() => {
    console.log(`Connected to mongodb on port ${MONGO_DB_PORT}`);

    const app = express();

    app.use(
      cors({
        origin: "*",
      })
    );

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // app.use("/categories", categoryRouter);
    // app.use("/users", userRouter);
    // app.use("/posts", postRouter);
    app.use("/cases", caseRouter);
    app.get("*", (req, res) => res.status(404).json({ content: "not_found" }));

    app.listen(API_PORT, () => {
      console.log(`Server Api listening on port: ${API_PORT}`);
    });
  });

import express from "express";
import postRouter from "./routers/postRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

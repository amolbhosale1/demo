import express, { Request, Response } from "express";
import { config } from "dotenv";
const cookieParser = require("cookie-parser");
import access_control from "./controllers/access_control";
import { connectDB } from "./config/databaseConfig";

config({ path: "./config/.env" });

const app = express();
connectDB();

// require('./config/databaseConfig');
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

access_control();

app.get("/", (req: Request, res: Response) => {
  res.json({ greeting: "Hello world!" });
});
app.use("/api/v1/auth/", require("./router/user_route"));
app.use("/api/v1/iam/", require("./router/back_office_route"));

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});

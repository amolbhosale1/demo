import express, { Request, Response } from "express";
import { config } from "dotenv";
const cookieParser = require("cookie-parser");
import { connectDB } from "./config/databaseConfig";
import socketConnection from "./config/socket.config";
const hbs = require("hbs");
config({ path: "./config/.env" });

const app = express();
connectDB();

// require('./config/databaseConfig');
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "hbs");
// app.use(express.static(path.join(__dirname,'/view')));

const port = process.env.PORT || 3000;

// access_control();

app.get("/", (req: Request, res: Response) => {});
app.use("/api/v1/auth/", require("./router/user_route"));
app.use("/api/v1/iam/", require("./router/back_office_route"));

const server = app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});

socketConnection(server);

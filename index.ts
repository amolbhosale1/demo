import express, { Request, Response } from "express";
import { config } from "dotenv";
const cookieParser = require("cookie-parser");
import access_control from "./controllers/access_control";
import { connectDB } from "./config/databaseConfig";
const hbs = require('hbs')
config({ path: "./config/.env" });

const app = express();
connectDB();

// require('./config/databaseConfig');
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'hbs')
// app.use(express.static(path.join(__dirname,'/view')));

const port = process.env.PORT || 3000;

// access_control();

var emailTemplateBody = {
  name : 'Rahul', 
  skills : ['Data Mining', 'BlockChain Dev', 'nodejs'],
  link:"https://postmarkapp.com/guides/password-reset-email-best-practices"
}
app.get("/", (req: Request, res: Response) => {
  res.render('emailTemplate', {projects : emailTemplateBody});

});
app.use("/api/v1/auth/", require("./router/user_route"));
app.use("/api/v1/iam/", require("./router/back_office_route"));

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});

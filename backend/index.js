import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { submit } from "./raspberry.js";
import { get_info, get_photos } from "./frontend.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/raspberry/submit", submit);
app.get("/get_info", get_info);
app.get("/get_photos", get_photos);

app.listen(3000, () => {
  console.log("Server is running");
});

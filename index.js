import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import moment from "moment";
import fs from "fs";
import router from "./src/routes/router.js";
import path from "path";
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use(express.static(path.join("public")));

app.use(`${process.env.API}`,router);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.GZFASHION_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  console.log(`Server đang chạy port: ${process.env.PORT}`)
).catch((error)=> 
  console.log(`Server lỗi: `,error.message)
);


// const httpsOptions = {
//   cert: fs.readFileSync(path.join(__dirname,'server.crt')),
//   key: fs.readFileSync(path.join(__dirname,'server.key'))
// }

// https.createServer(httpsOptions, app).listen(port, function()
// {
//   console.log(`Serving the ${directoryToServe}/directory at https://localhost:${port}`)
// });

app.listen(process.env.PORT);

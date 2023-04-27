import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

const url = process.env.DB_CONNECTION_URL;

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to app...");
});

const PORT = process.env.PORT || 5000;

console.log("ln26", process.env.DB_CONNECTION_URL);

mongoose
  .connect(
    "mongodb+srv://idtobi8:Eniol%402012@open-fabric.qa9ghxx.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

mongoose.set("strictQuery", true);

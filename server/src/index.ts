import express from "express";
import mongoose from "mongoose";
import router from "./router";
import cors from "cors";

const PORT: number = 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/auth", router);

app.get("/", (req, res) => {
  res.json({ message: "test" });
});
async function main() {
  try {
    app.listen(PORT, () => {
      console.log("WORKING ON:", PORT);
    });
    await mongoose.connect(
      "mongodb+srv://admin:12345@cluster0.rfc8e.mongodb.net/Authentication?retryWrites=true&w=majority"
    );
  } catch (e) {
    console.log(e);
  }
}

main();

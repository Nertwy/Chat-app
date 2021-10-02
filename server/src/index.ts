import express from "express";
import mongoose from 'mongoose'
import router from './router'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors({
  origin:'*'
}))
const PORT: number = 5000;

app.use('/auth',router)


async function main() {
  try {
    await mongoose.connect('mongodb+srv://admin:12345@cluster0.rfc8e.mongodb.net/Authentication?retryWrites=true&w=majority')
    app.listen(PORT, () => {
      console.log("WORKING ON:", PORT);
    });
  } catch (e) {
    console.log(e);
  }  
}

main()
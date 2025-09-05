// yaha hum initaization ke liye code likhte hain
const mongoose = require('mongoose');
const InitData = require("./data.js");
const listing = require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
  console.log("connected to db");
}).catch((err)=>{
  console.log(err);
}); 

async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await listing.deleteMany({});
    InitData.data=InitData.data.map((obj)=>({...obj,owner:"689f49ba7dc94ffd9391d764"}));
    await listing.insertMany(InitData.data);
    console.log("Database initialized with sample listings");
};
initDB();
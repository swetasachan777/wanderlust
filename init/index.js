const mongoose=require ("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main()
.then(()=>{console.log("connection succesful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};
const initDB=async()=>{
   await Listing.deleteMany({});
   initdata.data=initdata.data.map((obj)=>({...obj,owner:"67d706bf1ff36be5a6916b7d"}));
   await Listing.insertMany(initdata.data);
   console.log("initialized");


}
initDB();
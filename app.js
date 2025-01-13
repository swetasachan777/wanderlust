const express=require("express");
const app =express();
const mongoose=require("mongoose");
const Listing =require("./models/listing.js");
const path=require("path");
main()
.then(()=>{console.log("connection succesful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("hi, i am root");
});

// app.get("/testListing",async(req,res)=>{
//   let sample=new Listing({
//     title:"my new villa",
//     des:"by the beach",
//     price:1200,
//     location:"goa",
//     country:"india",
//   });
//   await  sample.save();
//   console.log("sample");
//   res.send("success");
// });

app.get("/listings",async(req,res)=>{
  const alllist=await Listing.find({});
  res.render("listings/index.ejs",{alllist});
  });

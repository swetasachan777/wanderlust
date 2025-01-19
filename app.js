const express=require("express");
const app =express();
const mongoose=require("mongoose");
const Listing =require("./models/listing.js");
const path=require("path");
const ejsmate=require("ejs-mate");
main()
.then(()=>{console.log("connection succesful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

const methodoverride=require("method-override");
app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
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

     //new route
app.get("/listings/new",async(req,res)=>{
 
  res.render("listings/new.ejs",);
  });

  //show route
  
app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
  });

  //create route
  app.post("/listings",async(req,res)=>{
    // let {title,description,price,image,country,location}=req.body;
     let listing=new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
  })

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
  let{id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
  
})
app.put("/listings/:id",async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect("/listings");
  
})

app.delete("/listings/:id",async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndDelete(id,{...req.body.listing});
 res.redirect("/listings");
  
})



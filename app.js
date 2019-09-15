//jshint esversion: 6//

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const orange = new Fruit({
//   name: "Orange",
//   rating: 9,
//   review: "Juicy"

// orange.save();

// Fruit.deleteOne({ name: "Bananna" }, function (err) {});

const partnerSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Partner = mongoose.model("Partner", partnerSchema);

const orange = new Fruit({
  name: "Orange",
  rating: 9,
  review: "Juicy"
});

orange.save();
Partner.updateOne({name: "Sean"}, {favouriteFruit: orange}, function (err) {});

const partner = new Partner ({
  name: "Sean",
  age: 30,
  });

partner.save();

const mango = new Fruit({
  name: "Mango",
  rating: 9,
  review: "The Best in Business"
});

const bananna = new Fruit({
  name: "Bananna",
  rating: 9,
  review: "Healthy"
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 4,
  review: "😖"
});

Fruit.insertMany([mango, bananna, kiwi], function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("succesfully updated fruits in fruitsDB");
  }
});

Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  const mongoose = require('mongoose');
  require('dotenv').config();
  
  // Define Schema
  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] }
  });
  
  // Define Model
  const Person = mongoose.model('Person', personSchema);
  
  // Create and Save a Record
  const createPerson = (name, age, favoriteFoods, callback) => {
    const person = new Person({ name, age, favoriteFoods });
    person.save(callback);
  };
  
  // Create Many Records
  const createManyPeople = (arrayOfPeople, callback) => {
    Person.create(arrayOfPeople, callback);
  };
  
  // Find all people with a given name
  const findPeopleByName = (name, callback) => {
    Person.find({ name }, callback);
  };
  
  // Find one person with a certain food in favorites
  const findOnePersonByFood = (food, callback) => {
    Person.findOne({ favoriteFoods: food }, callback);
  };
  
  // Find by ID
  const findPersonById = (personId, callback) => {
    Person.findById(personId, callback);
  };
  
  // Update by ID
  const addHamburgerToFavorites = (personId, callback) => {
    Person.findById(personId, (err, person) => {
      if (err) return callback(err);
      person.favoriteFoods.push("hamburger");
      person.save(callback);
    });
  };
  
  // Update by Name
  const updatePersonAgeByName = (personName, newAge, callback) => {
    Person.findOneAndUpdate({ name: personName }, { age: newAge }, { new: true }, callback);
  };
  
  // Delete by ID
  const removePersonById = (personId, callback) => {
    Person.findByIdAndRemove(personId, callback);
  };
  
  // Delete Many by Name
  const removeMary = (callback) => {
    Person.remove({ name: "Mary" }, callback);
  };
  
  // Chain Search Query Helpers
  const findBurritoLovers = (callback) => {
    Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec(callback);
  };
  
  module.exports = {
    createPerson,
    createManyPeople,
    findPeopleByName,
    findOnePersonByFood,
    findPersonById,
    addHamburgerToFavorites,
    updatePersonAgeByName,
    removePersonById,
    removeMary,
    findBurritoLovers
  };
  
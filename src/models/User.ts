import mongoose, { Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Note: In your schema, 'password' has select: false, so it's not retrieved by default
  role: string;
  image?: string;
  authProviderId?: string;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  role: { type: String, default: "user" },
  image: { type: String },
  authProviderId: { type: String },
});

export const UserModel = mongoose.models?.User || mongoose.model<User>("User", userSchema);

// const user = {
//   "address": {
//     "building": "1007",
//     "coord": [-73.856077, 40.848447],
//     "street": "Morris Park Ave",
//     "zipcode": "10462"
//   },
//   "borough": "Bronx",
//   "cuisine": "Bakery",
//   "grades": [
//     { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
//     { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
//     { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
//     { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
//     { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
//   ],
//   "name": "Morris Park Bake Shop",
//   "restaurant_id": "30075445"
// }

//1. Write a MongoDB query to display all the documents in the collection restaurants.
// user.find({})

//2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine 
//for all the documents in the collection restaurant.

//user.find({} , {"_id": 1 , "restaurant_id":1, "name": 1 , "borough": 1})

//3. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine, 
//but exclude the field _id for all the documents in the collection restaurant.

//user.find({} , {"_id": 0 , "restaurant_id":1, "name": 1 , "borough": 1})

// 5. Write a MongoDB query to display all the restaurant which is in the borough Bronx.
// user.find({"borough" : "Bronx"})

//6. Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
//user.find({"borough" : "Bronx"}).limit(5)

//7.Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
// user.find({"borough" : "Bronx"}).skip(5).limit(5)

//8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
//  user.find({grads : {$elemMatch : {"score" : {$gt : 90}}}})

// db.restaurants.find({grades : { $elemMatch:{"score":{$gt : 90}}}});


//9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.

//user.find({grads : {$elemMatch : {"score" : {$gt : 80 , $lt : 100}}}})

//10. Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.

// user.find({address.cords : {$lt : -95.754168}})

// 11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' 
// and their grade score more than 70 and latitude less than -65.754168.

// user.find({$and : [{"cuisine" : {$ne : "American"}, {grade.score : {$gt : 70}} , {address.cords : {$lt : -65.754168} } }]}})
// {$and:[{"cuisine" : {$ne :"American "}}, {"grades.score" : {$gt : 70}},{"address.coord" : {$lt : -65.754168}}]}

//12.Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and 
//achieved a score more than 70 and located in the longitude less than -65.754168.


// user.find({"cuisine" : {$ne : "American"} , "grade.score" : {$gt : 70} , "address.coord" : {$lt : -65.754168}})

//13. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American'
// and achieved a grade point 'A' not belongs to the borough Brooklyn. 
//The document must be displayed according to the cuisine in descending order.

// user.find({"cuisine" : {$ne : "American"} , "grades.grad" : "A" , "borough" : {$ne : "Brooklyn"} }).sort({"cuisine" : -1})

//14 Write a MongoDB query to find the restaurant Id, name, borough and cuisine 
//for those restaurants which contain 'Wil' as first three letters for its name.
import mongoose from "mongoose";

const url =
  "mongodb+srv://faraz007:faraz007@cluster0.ntfymyw.mongodb.net/";
const connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
export default connect;

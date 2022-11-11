const mongoose = require("mongoose");
export async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
}
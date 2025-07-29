
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user"); 

mongoose.connect("mongodb+srv://pamelamalasi31:bloombloom77@projectmern.bgjnnfr.mongodb.net/bloombloom?retryWrites=true&w=majority&appName=ProjectMERN", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("lalala77", 8);

    const admin = new User({
      username: "pam",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();

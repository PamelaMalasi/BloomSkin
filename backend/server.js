const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const contactRoute = require("./routes/contactRoute");
const itemRoute = require("./routes/itemRoute");
const userRoute = require("./routes/userRoute");
const influencerRoute = require("./routes/influencerRoute");
const cartRoute = require("./routes/cartRoute"); 



const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
  exposedHeaders: ["set-cookie"],
}));

app.use(session({
  secret: "This will be secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use(express.json({ limit: "1000mb" }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

mongoose.connect(
  "mongodb+srv://pamelamalasi31:bloombloom77@projectmern.bgjnnfr.mongodb.net/bloombloom?retryWrites=true&w=majority&appName=ProjectMERN"
)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.use("/contact", contactRoute);
app.use("/item", itemRoute);
app.use("/user", userRoute);
app.use("/influencer", influencerRoute);
app.use("/cart", cartRoute);



app.listen(5001, () => {
  console.log("Server created on port 5001!");
});

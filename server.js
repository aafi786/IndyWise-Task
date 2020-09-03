const express = require("express");


const app = express();
const bodyParser = require("body-parser");
const path = require("path");



// middlewares
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


// database
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://ankush:ankushk2518@ds129352.mlab.com:29352/indywise", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


// routes
const bookings = require("./routes/bookings");
app.use("/booking", bookings);

// if (process.env.NODE_ENV === "production") {
//   // set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started On Port ${PORT}`);
})
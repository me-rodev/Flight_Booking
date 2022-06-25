const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flights.json");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());
app.use(express.urlencoded())

app.use("/", routes);
app.use("/bookflight", routes)
app.use("/getAllFlights", routes)
app.use("/getSingleFlight", routes)
app.use("/deleteFlight", routes)
app.use('/updateFlight', routes)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

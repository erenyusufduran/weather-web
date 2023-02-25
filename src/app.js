require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

// Setup handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath); // this is for maybe wanna make something different views path name like templates.
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Eren Yusuf Duran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Eren Yusuf Duran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Eren Yusuf Duran",
    helpText: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, { temperature }) => {
      if (error) {
        return res.send({ error });
      }
      const forecast = `It is currently ${temperature} degrees out.`;
      res.send({
        address: address,
        location,
        forecast,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Eren Yusuf Duran",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Eren Yusuf Duran",
    errorMessage: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    const { current } = body;
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, current);
    }
  });
};

module.exports = forecast;

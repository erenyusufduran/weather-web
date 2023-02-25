const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.GEOCODE_ACCESS_KEY}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const features = body.features[0];

      const latitude = features.center[1];
      const longitude = features.center[0];
      const location = features.place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;

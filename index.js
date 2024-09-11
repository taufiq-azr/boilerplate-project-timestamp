// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
 
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date_string = req.params.date;
  let dateNow;
  let unixDate;
  let formatedDate;
  let d;

  try {
    if (!date_string) { 
      // Jika tidak ada parameter tanggal, gunakan tanggal saat ini
      dateNow = new Date();
      unixDate = dateNow.getTime();
      formatedDate = dateNow.toUTCString();
    } else if (/^\d+$/.test(date_string)) {
      // Jika input adalah Unix timestamp
      unixDate = parseInt(date_string);
      d = new Date(unixDate);
      formatedDate = d.toUTCString();
    } else {
      // Tangani semua string yang bisa diparse oleh new Date()
      d = new Date(date_string);

      // Cek apakah tanggal valid
      if (d.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
      }

      unixDate = d.getTime();
      formatedDate = d.toUTCString();
    }

    // Mengirim respons JSON
    res.json({
      unix: unixDate,
      utc: formatedDate
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

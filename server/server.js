const express = require('express');
const path = require('path');
const app = express();

// const forceSSL = function() {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//        ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// }

app.use(express.static(__dirname + '/client'));
// app.use(forceSSL());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
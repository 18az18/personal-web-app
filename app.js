const express = require('express');
var app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false,
    }));
const path = require('path');
var http = require('http').createServer(app);
const PORT = process.env.PORT || 8080;
const cors = require('cors');
let corsOptions = {
    origin: ["http://localhost:4200"],
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
const validator = require('validator');
let MongoClient = require('mongodb').MongoClient;

app.use(session({
    secret: 'lymmd',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 1800000,
        httpOnly: true,
        sameSite: true,
        maxAge: null
    }
}));
if (app.get('env') === 'production') {
    session.cookie.secure = true;
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE', 'PUT']);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

// require('./routes/user.js')(app);
// var db;
// MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     }, function (err, client) {
//     if (err) {
//         console.log(err);
//         process.exit(1);
//     }

//   // Save database object from the callback for reuse.
//     db = client.db();
//     // Initialize the app.
// });
app.use(express.static(path.join(__dirname + "/public/")));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

http.listen(PORT, function() {
    console.log("http on port 8080");
})
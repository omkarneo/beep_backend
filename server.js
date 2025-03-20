const express = require("express")
const app = express();
const mongo = require("./service/mongoose")
const cors = require("cors");
const http = require("http");

// env
require('dotenv').config()


// Body Parser for Requesting Body
const bodyparse = require('body-parser');
app.use(bodyparse.json())
app.use(express.urlencoded({ extended: true })); // Parse form-data
app.use(express.json());

// Socket Implementation
const { socketServer } = require("./service/socket_server")
const server = http.createServer(app);
const io = socketServer(server);
app.set('socketio', io);


// Media Directory
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Router
app.use('/', require('./routes/routes'))
app.use('/login', require('./routes/loginroutes/loginroutes'))
app.use('/profile', require('./routes/profileroute/profileroute'))
app.use("/room", require("./routes/roomroutes/roomroutes"))
app.use("/upload", require("./routes/uploadroutes/uploadroute"))
app.use("/user", require("./routes/userroutes/userroutes"))


// Listener
server.listen(3000, () => {
  console.log("Server is Listening on 3000 ports")
  mongo.mongoconnection();
})
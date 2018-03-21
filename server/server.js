let express = require('express')
let bodyParser = require('body-parser')
var dbConfig = require('./config/db.config.js')
var mongoose = require('mongoose')
let app = express()
var rp = require('request-promise')
const io = require('socket.io')()
const fetch = require('node-fetch')
var path = require('path')
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/dish.routes.js')(app)

// app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// listen for requests
app.listen(8000, function(){
    console.log("Server is listening on port 8000")
})


mongoose.connect(dbConfig.url, {});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
})


mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})


const port = 3050
io.listen(port)
console.log('listening on port ', port)

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    1000
  )
  socket.on("disconnect", () => console.log("Client disconnected"));
})

const getApiAndEmit = async socket => {
  try {
    const res = await rp({uri: 'http://localhost:8000/dishes/in_order',  json: true})
    socket.emit("order_in_pipeline", res)
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
}

io.on('connection', (client) => {
  client.on('subscribeToDone', (data) => {
    console.log('client is subscribing to done', data)
    let url ='http://localhost:8000/dishes/'+data.id+'/order_done'
    let body = JSON.stringify({order_quantity_complete: data.done})
    rp({uri: url,  method: 'PUT', body:{order_quantity_complete: data.done}, json:true})
    .then((res) => console.log(res))
    .catch(function (err) {
      console.log(err)
    })
  })
})

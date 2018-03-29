let express = require('express')
let bodyParser = require('body-parser')
let dbConfig = require('./config/db.config.js')
let mongoose = require('mongoose')
let app = express()
let rp = require('request-promise')
let io = require('socket.io')()
let fetch = require('node-fetch')
let path = require('path')
let url = require('./config/api.config.js').url
const socketport = 3050
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

app.use(express.static(path.join(__dirname, '../build')));
app.get('/dalviroo', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.route('/dalviroo/*')
    .get(function(req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
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



io.listen(socketport)
console.log('Socket listening on port ', socketport)

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    1000
  )
  socket.on("disconnect", () => console.log("Client disconnected"));
})

const getApiAndEmit = async socket => {
  try {
    let url1 = url + 'in_order'
    const res = await rp({uri: url1,  json: true})
    socket.emit("order_in_pipeline", res)
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

io.on('connection', (client) => {
  client.on('subscribeToDone', (data) => {
    console.log('client is subscribing to done', data)
    let uri = url+data.id+'/order_done'
    let body = JSON.stringify({order_quantity_complete: data.done})
    rp({uri: uri,  method: 'PUT', body:{order_quantity_complete: data.done}, json:true})
    .then((res) => console.log(res))
    .catch(function (err) {
      console.log(err)
    })
  })
})

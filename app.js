var express = require('express');
const YAML = require('yamljs');
var moongose = require('mongoose');
const { json, urlencoded } = express;
var morgan = require('morgan');
var cors = require('cors');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const socketServer = require('./socket');
const swaggerUi = require('swagger-ui-express');
const openapiDocument = YAML.load('./swagger.yml');

const http = require('http');
//routes import 

const userRoutes = require('./routes/user');

//apps

const app = express();

//db
moongose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log("DB CONN err", err))

// middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials: true}));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());

//route definition
app.use("/", userRoutes );

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));


//port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () => console.log("server is running on port " + port));

socketServer(server);
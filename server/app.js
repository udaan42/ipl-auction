import path from 'path';
import app from './config/express';
import routes from './routes/index.route';
import swagger from './config/swagger';
import * as errorHandler from './middlewares/errorHandler';
import joiErrorHandler from './middlewares/joiErrorHandler';
import requestLogger from './middlewares/requestLogger';

// enable webpack hot module replacement in development mode
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config.dev';

if (process.env.NODE_ENV === 'development') {

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Swagger API documentation
app.get('/swagger.json', (req, res) => {
  res.json(swagger);
});

// Request logger
app.use(requestLogger);

// Router
app.use('/api', routes);

// Landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

var server = require('http').Server(app);
var io = require('socket.io')(server, {
  cors: {
    origin: ["http://auction-fantasy.us-east-2.elasticbeanstalk.com", "http://localhost:3000"],
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

server.listen(app.get('socketport'), app.get('host'), () => {
  console.log('socket listening');
});

io.on('connection', (socket) => {
  console.log("Connected New socket ----------------------------->");
  console.log(socket.id);
  require('./auction-room-socket.js')(io, socket);
});

export default app;

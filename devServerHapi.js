// ---------------------------------------------------------------------------
// --- Nils Hartmann | http://nilshartmann.net                             ---
// ---------------------------------------------------------------------------
/**
 * Import dependencies
 */
const path = require('path');
const Server = require('hapi').Server;
const Webpack = require('webpack');
const WebpackPlugin = require('hapi-webpack-plugin');
const config = require('./webpack.config.dev');
const Inert = require('inert');

/**
 * Create server
 */
const server = new Server();
server.connection({port: 3000});
server.register(Inert, () => {
});

const publicPath = path.join(__dirname, 'client/public/');
console.log("PublicPath: " + publicPath);

server.route({
  method:  'GET',
  path:    '/{param*}',
  handler: {
    directory: {
      path: publicPath
    }
  }
});
server.ext('onPreResponse', (request, reply) => {
  if (request.response.isBoom && request.response.output.statusCode === 404) {
    // use index.html as fallback in case of 404 errors (esp to enable React Router with BrowserHistory)
    // (something like Webpack Devserver's --history-api-fallback option)
    return reply.file(path.join(__dirname, 'client/public/index.html'));
  }

  return reply.continue();
});
/**
 * Define constants
 */
const compiler = new Webpack(config);

const assets = {
  noInfo:     true,
  publicPath: config.output.publicPath
};

const hot = {};

/**
 * Register plugin and start server
 */
server.register({
    register: WebpackPlugin,
    options:  {compiler, assets, hot}
  },
  error => {
    if (error) {
      return console.error(error);
    }
    server.start(() => console.log('Server running at:', server.info.uri));
  });


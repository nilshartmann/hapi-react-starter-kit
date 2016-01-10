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
server.route({
  method:  'GET',
  path:    '/{param*}',
  handler: function(request, reply) {
    reply.file(path.join(__dirname, 'client/public/index.html'));
  }
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


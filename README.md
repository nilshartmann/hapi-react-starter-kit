# React Starter Kit (WORK IN PROGRESS)

*Just another React Starter Kit by [Nils Hartmann](https://github.com/nilshartmann) and [Oliver Zeigermann](https://github.com/DJCordhose).*

Our Starter Kit is based on the [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate) but differs
in some points:
* Hapi as Webserver (instead of Express)
* Folder structure differs (it's planned to add server-side code as well so we wanted to have an explicit `client` folder)
* Babel is pre-configured with stage-0 preset
* ESlint runs with eslint-loader from webpack
* ESlint uses config-airbnb plus personal config modifications
* CSS Loader for webpack

# How-to

1. Clone the repository
2. npm install
3. npm start

Open your browser at `http://localhost:3000` to see the simple counter application. Modify the JavaScript- or CSS-files and they are re-compiled and re-loaded in the browser automatically. The state of the React component will not be lost during reload.

## Production build

To create a production (minified, without hot loader) version of your application, just run:
```
npm run build:prod
```

The output goes to `public/dist/bundle.js`. You can point a webserver to `client/public` (i.e Pythons SimpleHTTPServer) and then open `index.html` to test your application

# Modules

Our starter kit contains the following modules:

## Babel 6 modules
* `babel-core` Since Version 6 Babel does not contain any transformations (what Babel should do with your code, e.g. compiling JSX code to ES5). Instead the transformations have to be installed separately either as **plug-ins** or as group of plug-ins, called **presets**
A babel **preset** contains one or more babel **plug-ins**. A preset also can contain the configuration of the contained plug-ins, making it very easy to add (complex) plug-ins and configurations to your own project
* `babel-preset-es2015`: All transformations needed to compile ES6 to ES5 code
* `babel-preset-react`: All transformations needed to compile React-specific (JSX) code
* `babel-preset-stage-0` Support for TC39 state-0 features ("ES7")

## Webpack-related modules
Webpack is a module bundler. It creates one or more target assets from a variety of input modules. Among others it can handle JavaScript and CSS-Files.
The actual tasks, Webpack should perform, are implemented and configured with **loaders**

We're using the following loaders:
* `css-loader` and `style-loader`: process CSS files. The processed files can be imported from JavaScript source code. With this starter kit CSS files are also hotloaded, e.g. it's not necessary to reload the Browser page after modifying a CSS file.
* `eslint-loader`: runs ESlint from webpack.
* `babel-loader` Webpack **loader** that runs Babel from webpack

## Hapi modules
We like to use Hapi as webserver in our projects. So we want Hapi to work together with webpack. We're using the following packages:

* `hapi`: The actual Hapi webserver
* `inert`: Handler for static files for Hapi (needed to server index.html file)
* `hapi-webpack-plugin`: Embedds webpack middleware in Hapi. Supports hot reloading.

Note: if you're using Hapi in your application (beside using it for the hotloading), move `hapi` (and `inert` if needed)
from `devDependencies` to `dependencies` in your package.json file.

## Hotloading-related modules
For React Hotloading we use the following modules:
* `babel-plugin-react-transform` A Plug-in for babel, that acts as a "holder" for Babel transformations of React code. The Plug-in uses **Transforms** that can be configured by the user (see below)
* `react-transform-hmr`: A **transform** enabling hot reloading and hot api replacement of react components
* `react-transform-catch-errors`: A **transform** that renders compilation errors in components directly as an error message inside the affected component (in addition to the console where babel runs). Needs `webpack-hot-middleware`
* `babel-preset-react-hmre`: A babel **preset** that includes the `babel-plugin-react-transform` along with two trasnforms (`react-transform-hmr` and  `react-transform-catch-errors`), making it easy to embedd this plug-ins in own projects (just by updating .babelrc file)
* `webpack-hot-middleware` webpack-dev-server replacement. Allows embedding webpack in your own Webserver while still providing hotloading features.
* `eventsource-polyfill` a polyfill needed for IE to support hot loading

## Other modules
* `rimraf`: cross-platform `rm -rf` node command


# TODO

* improve documentation
* build for serverside code
* better configuration (esp for paths)








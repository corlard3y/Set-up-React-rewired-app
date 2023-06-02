I have made some findings about the issue you are facing, and I have come up with some steps to resolve this

What causes the Polyfill node core module error?
Until the latest update to webpack version ___, webpack < 5 used to include NodeJS polyfills by default. Because the current version of webpack no longer includes NodeJS polyfills by default, it is causing issues for developers that use create-react-app with webpack > 5 to build applications with web3.js and web3 packages and libraries


1. Install react-app-rewired
First, install the reach-app-rewired package with your preferred package manager.

```bash
yarn add --dev react-app-rewired`
```

```bash
 npm install --save-dev react-app-rewired
```
 
2. Install missing dependencies
Next, install these missing dependencies:

```bash
yarn add crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url browserify-zlib tls-browserify net-browserify path-browserify 
```

3. Override the create-react-app webpack config file
In the root folder of your project, create a new file called config-overrides.js, and add the following code to it:


```bash
const webpack = require("webpack");
module.exports = function override(config) {
  const fallback = config.resolve.fallback  {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    zlib: require.resolve("browserify-zlib"),
    tls: require.resolve("tls-browserify"),
    net: require.resolve("net-browserify"),
    child_process: false,
    path: require.resolve("path-browserify"),
    util: require.resolve("util/"),
    fs: false,
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins  []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
```



4. Override package.json to include the webpack configuration
Within the package.json file, replace react-scripts with react-app-rewired scripts for the three following scripts fields to update the webpack configuration:

start
build
test
Here’s what the package.json file looks like before replacing the react-scripts:

```bash
"scripts": { 
  "start": "react-scripts start", 
  "build": "react-scripts build", 
  "test": "react-scripts test", 
  "eject": "react-scripts eject" 
 },
 ```
 
 Here’s the package.json file after replacing the react-scripts with react-app-rewired scripts:
 
```bash
 "scripts": { 
  "start": "react-app-rewired start", 
  "build": "react-app-rewired build", 
  "test": "react-app-rewired test", 
  "eject": "react-scripts eject" 
 },
 ```
 
That’s it!

Now, the polyfill node core module error should be fixed, missing NodeJS polyfills should be included in your app, and your app should work with the restapi packages and other web3 libraries

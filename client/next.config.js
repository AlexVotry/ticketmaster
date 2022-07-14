module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
}

// this improves the file change detection by checking every .3 seconds.
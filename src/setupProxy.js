const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy([
      "/magazine",
      // "/userfiles"
      ], {
      target: "http://127.0.0.1:8876",
      // target: "https://42.51.7.61:8834",
      // changeOrigin: true,
      // pathRewrite: {'^/nessus' : ''}
    })
    // proxy([{
    //   context: ["/magazine", "/userfiles"],
    //   target: "http://127.0.0.1:8876",
    // }])
  );
};

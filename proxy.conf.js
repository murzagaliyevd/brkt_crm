const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:5010",
    secure: false,
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = PROXY_CONFIG;

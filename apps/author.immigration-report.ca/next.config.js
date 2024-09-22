const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true }
});

const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#b61883", "@text-color": "white" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

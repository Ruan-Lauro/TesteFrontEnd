module.exports = function (api) {
    api.cache(true);
  
    return {
      presets: [
        ["@swc/react", { "runtime": "automatic" }],
        "@swc/typescript"
      ],
      plugins: [
        ["@babel/plugin-transform-react-jsx", { "pragma": "React.createElement" }]
      ]
    };
  };
  
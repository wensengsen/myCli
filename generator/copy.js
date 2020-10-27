module.exports = function () {
  const template = `
#!/bin/bash
cp ./cornerstoneTools-4.21.0/dist/* node_modules/cornerstone-tools/dist
cp ./cornerstoneWADOImageLoader-3.1.2/dist/* node_modules/cornerstone-wado-image-loader/dist
    `;
  return {
    template,
    dir: "",
    name: "copyCS.sh"
  };
};

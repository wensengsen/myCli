module.exports = function (name) {
  const template = `
var client = require("scp2");
client.scp(
  "./dist",
  {
    host: "192.168.2.135",
    username: "work",
    password: "nb2018",
    path: "/home/work/webapps/${name}-web"
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("文件上传完毕");
    }
  }
);
    `;
  return { template, dir: "scripts", name: "scp2.js" };
};

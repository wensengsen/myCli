module.exports = function () {
  const template = `
let isProd = process.env.NODE_ENV === "production";

let BASE_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin
    : "http://192.168.2.135:7788";

console.log(process.env.NODE_ENV, process.env.BASE_URL);

export default {
  BASE_URL,
  viewtypeFix: isProd ? "screen" : "window",
  isXp: checkOsXp(),
  maximage_cache_xp: 200 * 1024 * 1024,
  maximage_cache_win10: 512 * 1024 * 1024,
  wado_webworkers_xp: 1,
};

function checkOsXp() {
  let agent = navigator.userAgent;
  if (agent.indexOf("Windows NT 5") !== -1) {
    return true;
  } else if (agent.indexOf("Windows NT 7") !== -1) {
    return false;
  } else if (agent.indexOf("Windows NT 10") !== -1) {
    return false;
  } else {
    return false;
  }
}
    `;
  return {
    template,
    dir: "src/global",
    name: "config.js"
  };
};

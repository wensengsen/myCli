module.exports = function () {
  const template = `
#!/bin/bash
git add .
git commit -m 'update:'$1
git pull
git push
clear
    `;
  return {
    template,
    dir: "",
    name: "cm.sh"
  };
};

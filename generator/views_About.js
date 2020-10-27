module.exports = function () {
  const template = `
<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>
    `;
  return { template, dir: "src/views", name: "About.vue" };
};

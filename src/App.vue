<template>
  <div id="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}
:root {
  /* text */
  --primary-color: #fc7eb2;
  --primary-color-5: #fc7eb2;
  --secondary-color: #dfdfdf;
  --grey-color: #3c3c3c;
}
.btn {
  display: block;
  overflow: visible;
  background-color: var(--secondary-color);
  color: var(--grey-color);
  border-radius: 20px;
  font-weight: 700;
}
.btn:hover {
  background-color: var(--primary-color);
}
</style>
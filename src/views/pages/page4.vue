<template>
  <div class="fs-1">
    <back-component :title="'설정'" />
    This is Page 4<br />
    <router-link :to="{ name: 'main' }">to main</router-link>
  </div>
</template>

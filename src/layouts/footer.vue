<template>
  <div class="row row-cols-4 h-100">
    <div class="col m-0 p-0 h-100">
      <router-link :to="{ name: 'main' }" class="w-100">
        <button class="btn bg-transparent w-100">
          <i class="bi-house"></i>
        </button>
      </router-link>
    </div>
    <div class="col m-0 p-0 h-100">
      <router-link :to="{ name: 'page2' }">
        <button class="btn bg-transparent w-100">
          <i class="bi-clock"></i>
        </button>
      </router-link>
    </div>
    <div class="col m-0 p-0 h-100">
      <router-link :to="{ name: 'page3' }">
        <button class="btn bg-transparent w-100">
          <i class="bi-person"></i>
        </button>
      </router-link>
    </div>
    <div class="col m-0 p-0 h-100">
      <router-link :to="{ name: 'page4' }">
        <button class="btn bg-transparent w-100">
          <i class="bi-lock"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {},
    };
  },
  computed: {
    curRouteName() {
      return this.$route.name;
    },
  },
  methods: {},
};
</script>

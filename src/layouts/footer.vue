<template>
  <div class="row row-cols-5 p-0 m-0">
    <div class="col m-0 px-1 h-100">
      <router-link :to="{ name: 'main' }">
        <button
          class="btn w-100"
          :class="curRouteName === 'main' ? 'btn-success' : 'btn-light'"
        >
          <i class="bi-house"></i>
        </button>
      </router-link>
    </div>
    <div class="col m-0 px-1 h-100">
      <router-link :to="{ name: 'page2' }">
        <button class="btn btn-light w-100"><i class="bi-clock"></i></button>
      </router-link>
    </div>
    <div class="col m-0 px-1 h-100">
      <router-link :to="{ name: 'page3' }">
        <button class="btn btn-light w-100"><i class="bi-person"></i></button>
      </router-link>
    </div>
    <div class="col m-0 px-1 h-100">
      <router-link :to="{ name: 'page4' }">
        <button class="btn btn-light w-100"><i class="bi-lock"></i></button>
      </router-link>
    </div>
    <div class="col m-0 px-1 h-100">
      <router-link :to="{ name: 'page5' }">
        <button class="btn btn-light w-100">
          <i class="bi-alarm"></i>
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

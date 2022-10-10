<template>
  <div class="row row-cols-5 m-0 align-items-center h-100">
    <div class="col p-0 fw-light">
      <h4>{{ getDay(-2) }}</h4>
    </div>
    <div class="col p-0 fw-light">
      <h4>{{ getDay(-1) }}</h4>
    </div>
    <div class="col p-0 fw-bold">
      <h4>{{ getDay(0) }}</h4>
    </div>
    <div class="col p-0 fw-light">
      <h4>{{ getDay(1) }}</h4>
    </div>
    <div class="col p-0 fw-light">
      <h4>{{ getDay(2) }}</h4>
    </div>
    <div class="col-12">
      <h2 class="fw-bold">{{ time }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: null,
      time: null,
    };
  },
  created() {
    setInterval(this.getTime, 1000);
  },
  computed: {
    getDay() {
      return (days) => {
        return this.$moment().add("days", days).format("DD\n일");
      };
    },
  },
  methods: {
    getTime() {
      // return this.$moment().format("HH:mm:ss");
      this.time = this.$moment().format("HH:mm:ss");
    },
  },
};
</script>

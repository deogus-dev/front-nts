<template>
  <div class="card border-0 h-100 w-100">
    <div class="card-header border-0">
      <prev-btn></prev-btn>
    </div>
    <div class="card-body border-0 h-100" style="display: inline-block">
      <input
        type="text"
        class="form-control my-1 align-middle"
        v-model="user"
        placeholder="user email"
      />
      <button class="btn btn-primary my-1">Next</button>
    </div>
  </div>
</template>

<script>
import prevBtn from "@/components/prevBtn.vue";
export default {
  name: "signUp",
  components: {
    prevBtn,
  },
  data() {
    return {
      email: "",
    };
  },
  created() {},
  methods: {},
};
</script>

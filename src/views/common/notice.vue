<template>
  <div>
    <div class="list-group w-100 text-start">
      <div v-for="notice in noticeList" :key="notice.id">
        <router-link
          :to="{ name: 'noticedetl', params: { id: notice.id } }"
          class="list-group-item list-group-item-action"
        >
          {{ notice.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
    };
  },
  async created() {
    const result = await this.$axios.get("/boards", {
      params: {
        type: "notice",
      },
    });
    console.log(result);
    this.noticeList = result.data;
  },
};
</script>

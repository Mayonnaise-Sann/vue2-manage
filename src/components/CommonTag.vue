<template>
  <div>
    <el-tag
      class="the-tag"
      v-for="(item, index) in tags"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",

  computed: {
    //   对象解构
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },

  methods: {
    changeMenu(item) {
      this.$router.push(item.name).catch((err) => err);
    },
    handleClose(tag, index) {
      const len = this.tags.length - 1;
      this.$store.commit("tab/closeTag", tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === len) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style scoped>
.the-tag {
  margin: 0.5em;
}
</style>

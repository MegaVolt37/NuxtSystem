<template>
  <div class="graph__top-item" v-for="(item, index) in graph_info" :key="index">
    <div class="graph__top-item__cube" :style="readColor(item.color)"></div>
    <span
      class="graph__top-item__statistics"
      :style="'color:' + readTotalColorArrow(item).color"
      >{{ item.total }}%</span
    >
    <div class="graph__top-item__arrow" :style="readTotal(item)">
      <arrowIcon
        :path_fill="readTotalColorArrow(item).color"
        :style="readTotalColorArrow(item).style"
      />
    </div>
    <h3 class="graph__top-item__title">{{ item.title }}</h3>
    <p class="graph__top-item__subtitle">{{ item.subtitle }}</p>
  </div>
</template>

<script>
import arrowIcon from "~/components/images/arrowSmallIcon.vue";
export default {
  data() {
    return {};
  },
  methods: {
    readColor(color) {
      return "background-color: " + color;
    },
    readTotal(item) {
      return item.total.indexOf("+") >= 0
        ? "background-color: rgba(136, 224, 145, 0.24);"
        : "background-color: rgba(255, 126, 120, 0.3);";
    },
    readTotalColorArrow(item) {
      let color = item.total.indexOf("+") >= 0 ? "#50D1AA" : "#FF7E78";
      let style =
        item.total.indexOf("+") < 0 ? "transform: rotateX(180deg);" : null;
      return { color, style };
    },
  },
  props: {
    graph_info: Array,
  },
  components: {
    arrowIcon,
  },
};
</script>

<style lang="scss" scoped>
.graph__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
}
.graph__top-item {
  flex: 0 1 320px;
  display: grid;
  align-items: center;
  grid-template-columns: 0fr max-content max-content;
  background: linear-gradient(
    133.84deg,
    #4e4e4e -16.04%,
    #333333 9.33%,
    #1a1a1a 32.02%,
    #1a1a1a 62.06%,
    #262626 87.42%,
    #4e4e4e 112.12%
  );
  box-shadow: 2px 6px 15px 2px rgba(12, 10, 11, 0.8);
  border-radius: 16px;
  padding: 16px;
  &__cube {
    grid-column: 1;
    grid-row: 1;
    width: 38px;
    height: 38px;
    border-radius: 8px;
  }
  &__statistics {
    grid-column: 2;
    grid-row: 1;
    font-family: "Inter500";
    font-size: 12px;
    width: fit-content;
    margin-left: 10px;
  }
  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 3;
    grid-row: 1;
    width: 18px;
    height: 18px;
    background: rgba(136, 224, 145, 0.24);
    border-radius: 20px;
    margin-left: 10px;
  }
  &__title {
    margin: 10px 0;
    grid-column: 1/5;
    font-family: "Inter600";
    font-size: 28px;
    color: #ffffff;
  }
  &__subtitle {
    grid-row: 3;
    grid-column: 1/5;
    font-family: "Inter500";
    font-size: 14px;
    color: #9290fe;
  }
}
</style>
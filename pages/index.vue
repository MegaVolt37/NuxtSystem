<template>
  <div class="container_fluid">
    <header-home :activeComponent="activeComponent"/>
    <div class="home__top">
      <div class="home__top-sorting">
        <button class="home__top-sorting__button">
          <p>10th May - 16th May 2021</p>
          <img src="@/assets/images/arrowSmallWhite.svg" alt="Стрелка" />
        </button>
        <div></div>
      </div>
      <h1>Welcome</h1>
      <button class="home__top-export">
        <img src="@/assets/images/export.svg" alt="Экспортировать" />
        <p>Export</p>
      </button>
    </div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { storeAuth } from "~/store/Auth";
import graph from "~/components/Graph/Graph.vue";
export default {
  name: "PageIndex",
  data() {
    return {
      activeComponent: "graph",
    };
  },
  computed: {
    ...mapState(storeAuth, ["getLogin"]),
  },
  components: {
    graph,
  }
};
</script>
<style lang="scss" scoped>
.home__top {
  max-width: 90%;
  margin: 0 auto;
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  .home__top-export {
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: center;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 8px;
    margin-left: 127px;
    p {
      font-family: "Inter700";
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.75px;
      text-transform: uppercase;
      color: #ffffff;
    }
  }
  &-sorting__button {
    cursor: pointer;
    display: flex;
    gap: 10px;
    align-items: center;
    background-color: transparent;
    border: 1px solid #ffffff;
    box-shadow: 2px 6px 15px 2px rgba(12, 10, 11, 0.8);
    border-radius: 8px;
    padding: 15px;
    p {
      font-size: 14px;
      letter-spacing: 0.005em;
      color: #ffffff;
    }
  }
  h1 {
    font-family: "Inter600";
    font-size: 34px;
    text-align: center;
    letter-spacing: 0.25px;
    color: #ffffff;
  }
}
</style>
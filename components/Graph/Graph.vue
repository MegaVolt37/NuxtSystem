<template>
  <div>
    <div class="graph__top">
      <graph-top :graph_info="graph_info" />
    </div>
    <div class="graph__middle">
      <graph-middle :graph_info="graph_info" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graph_info: [
        {
          color: "#6BE2BE",
          total: "+32.40",
          title: "Выполняются",
          subtitle: "Total Revenue",
        },
        {
          color: "#FF7E78",
          total: "-3.43",
          title: "Провалены",
          subtitle: "Total Paypal Revenue",
        },
        {
          color: "#8989C9",
          total: "+22.12",
          title: "Выполнены",
          subtitle: "Total Downloads",
        },
      ],
    };
  },
  methods: {},
  components: {},
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
  background: linear-gradient(133.84deg,
      #4e4e4e -16.04%,
      #333333 9.33%,
      #1a1a1a 32.02%,
      #1a1a1a 62.06%,
      #262626 87.42%,
      #4e4e4e 112.12%);
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
    color: $text;
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
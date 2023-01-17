<template>
  <div class="tasks">
    <div class="tasks__top">
      <h1>Задачи</h1>
    </div>
    <div class="tasks__middle">
      <div
        class="tasks__middle-item"
        v-for="(task, index) in tasks"
        :key="index"
        @drop="onDrop($event, task.key)"
        @dragenter.prevent
        @dragover.prevent
      >
        <h4 class="tasks__middle-item__title">{{ task.title }}</h4>
        <div class="tasks__middle-item__list-wrapper">
          <div
            class="tasks__middle-item__list"
            v-for="(item, index) in arrApi.filter(
              (el) => el.category === task.key
            )"
            :key="index"
            :style="styleBlocks(item.category)"
            @dragstart="onDragStart($event, item)"
            :draggable="true"
          >
            <span
              class="tasks__middle-item__list-piority"
              :style="stylePriority(item.priority)"
              >{{ item.priority }}</span
            >
            <h5 class="tasks__middle-item__list-title">{{ item.title }}</h5>
            <p class="tasks__middle-item__list-subtitle">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          title: "Запланированные",
          key: "planned",
        },
        {
          title: "Выполняются",
          key: "in process",
        },
        {
          title: "Выполнены",
          key: "done",
        },
      ],
      arrApi: [
        {
          id: 1,
          priority: "Low",
          title: "Уборка",
          text: "убраться в той и той комнате",
          category: "done",
        },
        {
          id: 2,
          priority: "High",
          title: "Кот",
          text: "Покормить кота",
          category: "in process",
        },
        {
          id: 3,
          priority: "Medium",
          title: "Посмотреть",
          text: "что-то",
          category: "planned",
        },
        {
          id: 4,
          priority: "Medium",
          title: "Посмотреть что-то",
          text: "что-то",
          category: "planned",
        },
        {
          id: 5,
          priority: "Medium",
          title: "Посмотреть куда-то",
          text: "что-то",
          category: "planned",
        },
      ],
    };
  },
  methods: {
    stylePriority(value) {
      switch (value) {
        case "High":
          return "background-color: #307FE2;";
        case "Medium":
          return "background-color: #5E30E2;";
        case "Low":
          return "background-color: #e2bb30;";
        default:
          return "background-color: #e2bb30;";
      }
    },
    styleBlocks(value) {
      switch (value) {
        case "planned":
          return "background-color: #C44087;";
        case "in process":
          return "background-color: #6AAFCD;";
        case "done":
          return "background-color: #00A88B;";
        default:
          return "background-color: #C44087;";
      }
    },
    onDragStart(event, value) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("id", value.id);
    },
    onDrop(event, index) {
      const itemId = event.dataTransfer.getData("id");
      this.arrApi = this.arrApi.map((el) => {
        if (el.id == itemId) {
          el.category = index;
        }
        return el;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  background: linear-gradient(
    133.84deg,
    #4e4e4e -16.04%,
    #333333 9.33%,
    #1a1a1a 32.02%,
    #1a1a1a 62.06%,
    #262626 87.42%,
    #4e4e4e 112.12%
  );
  padding: 20px;
  box-shadow: 2px 6px 15px 2px rgb(12 10 11 / 80%);
  border-radius: 16px;
  &__top {
    background-color: #000000;
    box-shadow: 20px 20px 120px 15px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin-bottom: 45px;
  }
  &__middle {
    display: flex;
    justify-content: space-between;
    &-item {
      padding: 15px;
      padding-left: 25px;
      background: #000000;
      box-shadow: 0px 13px 21px 11px rgba(24, 24, 24, 0.47);
      border-radius: 16px;
      flex: 0 1 325px;
      cursor: grab;
      &__title {
        margin-top: 10px;
        margin-bottom: 15px;
        font-family: "Inter700";
        font-size: 25px;
        color: #ffffff;
      }
      &__list-wrapper {
        max-height: 435px;
        overflow-y: auto;
        padding-right: 10px;
      }
      &__list {
        background-color: #c44087;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12),
          0px 16px 32px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        padding: 25px;
        &-piority {
          background-color: #e2bb30;
          box-shadow: 0px 0px 12px #307fe2;
          border-radius: 100px;
          font-family: "Inter500";
          font-size: 14px;
          color: #ffffff;
          width: fit-content;
          padding: 0 15px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        &-title {
          font-family: "Inter700";
          font-size: 16px;
          color: $text;
          margin-bottom: 10px;
        }
        &-subtitle {
          font-size: 14px;
          color: $task-description;
        }
      }
      &__list + &__list {
        margin-top: 15px;
      }
    }
  }
}
</style>
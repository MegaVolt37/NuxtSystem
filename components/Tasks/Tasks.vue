<template>
  <div class="tasks">
    <div class="tasks__top">
      <div class="tasks__top-search">
        <span class="tasks__top-search__title">Поиск по названию</span>
        <input
          class="tasks__top-search__input"
          type="text"
          placeholder="Fix something"
        />
        <button class="tasks__top-search__btn">Search</button>
      </div>
      <Select
        class="tasks__top-category"
        :selects="selects.category"
        :title="'Категория'"
        @selectOption="selectCategory"
      />
      <Select
        class="tasks__top-priority"
        :selects="selects.priority"
        :title="'Приоритет'"
        @selectOption="selectPriority"
      />
    </div>
    <div class="tasks__middle">
      <div
        class="tasks__middle-item"
        v-for="(task, index) in tasksGroup"
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
            @dragover.prevent
            @dragleave.prevent
          >
            <div class="tasks__middle-item__list-btn">
              <span
                class="dots"
                v-for="index in 3"
                :key="index"
                @click="openAction"
              >
              </span>
            </div>
            <span
              class="tasks__middle-item__list-piority"
              :style="stylePriority(item.priority)"
            >{{ item.priority
              }}</span>
            <h5 class="tasks__middle-item__list-title">{{ item.title }}</h5>
            <p
              class="tasks__middle-item__list-subtitle"
              v-if="item.text"
            >
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface task {
  id: number,
  priority: string,
  title: string,
  text: string,
  category: string,
}
interface selectGroup {
  title: string,
  value: number,
}


export default {
  setup() {
    let arrApi = ref<task[]>([{
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
    },]);
    const tasksGroup = [{
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
    }];
    const selects = {
      category: [
        {
          title: "Low",
          value: 0,
        },
        {
          title: "Medium",
          value: 1,
        },
        {
          title: "High",
          value: 2,
        },
      ] as selectGroup[],
      priority: [
        {
          title: "Низкий",
          value: 0,
        },
        {
          title: "Средний",
          value: 1,
        },
        {
          title: "Высокий",
          value: 2,
        },
      ] as selectGroup[],
    };
    const selectCategory = (value: any) => {
      console.log(value);
    };
    const selectPriority = (value: any) => {
      console.log(value);
    };
    const stylePriority = (value: any): string => {
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
    };
    const styleBlocks = (value: any): string => {
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
    };
    const onDragStart = (event: DragEvent, value: any): void => {
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("id", value.id);
        event.dataTransfer.setData("category", value.category);
      }
    };
    const onDrop = (event: DragEvent, index: any): void => {
      if (event.dataTransfer) {
        const itemId = +event.dataTransfer.getData("id");
        arrApi.value = arrApi.value.map((el) => {
          if (el.id === itemId) {
            el.category = index;
          }
          return el;
        });
      }
    };
    const dropEl = (event: DragEvent, item: any, index: any): void => {
      // Изменение элементов в массиве по индексам при отпускании кнопки
      const target = event.target as HTMLElement;
      target.classList.remove("move");
      arrApi.value.forEach((el, indexEl) => {
        if (indexEl !== index && item.id !== el.id) {
          [arrApi.value[index], arrApi.value[indexEl]] = [
            arrApi.value[indexEl],
            arrApi.value[index],
          ];
        }
      });
    };
    const dragLeave = (event: Event): void => {
      const target = event.target as HTMLElement;
      target.classList.remove("move");
    };
    const dragOver = (event: Event): void => {
      const target = event.target as HTMLElement;
      target.classList.add("move");
    };
    const dragOverEl = (event: Event): void => {
      const target = event.target as HTMLElement;
      target.classList.add("move");
    };
    const openAction = () => console.log(1);
    return { arrApi, tasksGroup, selects, selectCategory, selectPriority, stylePriority, styleBlocks, onDragStart, onDrop, dropEl, dragLeave, dragOver, dragOverEl, openAction }
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  background: linear-gradient(133.84deg,
      #4e4e4e -16.04%,
      #333333 9.33%,
      #1a1a1a 32.02%,
      #1a1a1a 62.06%,
      #262626 87.42%,
      #4e4e4e 112.12%);
  padding: 20px;
  box-shadow: 2px 6px 15px 2px rgb(12 10 11 / 80%);
  border-radius: 16px;

  &__top {
    background-color: #000000;
    box-shadow: 20px 20px 120px 15px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin-bottom: 45px;
    padding: 20px 40px;
    display: flex;
    gap: 25px;

    &-search {
      display: grid;
      column-gap: 15px;
      max-width: 540px;
      grid-template-columns: 1fr auto;

      &__title {
        font-family: "Inter500";
        font-size: 14px;
        color: $text;
        margin-bottom: 10px;
      }

      &__input {
        grid-row: 2;
        grid-column: 1;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #e0e0e0;
        font-size: 14px;
        color: #4f4f4f;
      }

      &__btn {
        cursor: pointer;
        grid-row: 2;
        grid-column: 2;
        background-color: $user-search-btn-bacground;
        border: none;
        border-radius: 5px;
        font-family: "Inter700";
        font-size: 16px;
        color: $user-search-btn-color;
        padding: 16px 35px;
        width: fit-content;
        transition: all 0.5s ease-in-out;

        &:hover {
          background-color: #3c3c3c;
        }
      }
    }

    &-category {
      max-width: 255px;
      width: 100%;
    }

    &-priority {
      max-width: 160px;
      width: 100%;
    }
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

        &-btn {
          display: flex;
          justify-content: flex-end;
          justify-self: flex-end;
          cursor: pointer;

          &:hover .dots {
            background-color: rgb(137, 137, 201);
          }

          .dots {
            display: inline-block;
            background-color: #d9d9d9;
            width: 5px;
            height: 5px;
            border-radius: 50%;

            &.dots+.dots {
              margin-left: 5px;
            }
          }
        }
      }

      &__list.move {
        opacity: 0.5;
      }

      &__list+&__list {
        margin-top: 15px;
      }
    }
  }
}
</style>
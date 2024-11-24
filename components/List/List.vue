<template>
  <div class="list-wrapper">
    <div
      class="list"
      @scroll="scrollBlock"
      ref="listBlock"
      :style="styleListRows"
    >
      <div class="list__top">
        <div class="list__top-sorting">
          <div
            class="list__top-sorting__item"
            v-for="(item, index) in sorting"
            :key="index"
            :style="styleScrollSorting ?? undefined"
          >
            <p>{{ item.name }}</p>
            <div class="list__top-sorting__item-buttons">
              <div @click="sortingUp(item)">
                <img
                  src="@/assets/images/arrowFilter.svg"
                  alt="Сортировка по возрастанию"
                />
              </div>

              <div @click="sortingDown(item)">
                <img
                  src="@/assets/images/arrowFilter.svg"
                  alt="Сортировка по убыванию"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="list__top-filters">
          <div
            class="list__top-filters__item"
            v-for="(item, index) in filters"
            :key="index"
          >
            <p>{{ item.name }}</p>
            <div
              class="list__top-filters__item-buttons"
              v-if="item.value"
            >
              <div @click="sortingUp(item)">
                <img
                  src="@/assets/images/arrowFilter.svg"
                  alt="Сортировка по возрастанию"
                />
              </div>

              <div @click="sortingDown(item)">
                <img
                  src="@/assets/images/arrowFilter.svg"
                  alt="Сортировка по убыванию"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list__middle">
        <div
          class="list__middle-item"
          v-for="user in users"
          :key="user.id"
        >
          <span class="list__middle-item__index">{{ user.id }}</span>
          <div class="list__middle-item__title">
            <img
              src=""
              alt=""
              width="40"
              height="40"
            />
            <span @click="openChat">{{ user.name }}</span>
          </div>
          <span class="list__middle-item__status">{{ user.status }}</span>
          <span class="list__middle-item__team">{{ user.team }}</span>
          <span class="list__middle-item__priority">{{ user.priority }}</span>
          <div class="list__middle-item__employee">
            <img
              src=""
              alt=""
              width="24"
              height="24"
            />
            <span>{{ user.employee }}</span>
          </div>
          <span class="list__middle-item__date">{{ user.date }}</span>
          <div class="list__middle-item__action">
            <span
              class="dots"
              v-for="index in 3"
              :key="index"
              @click="openAction"
            >
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="list__bottom">
      <div
        class="list__bottom-rows"
        v-click-outside="closeBlockRows"
      >
        <p>Rows per page</p>
        <button @click="showBlockRows">
          <span>{{ readActiveRows }}</span><img
            src="@/assets/images/arrowFilter.svg"
            alt=""
            :style="styleButtonRows ?? undefined"
          />
        </button>
        <transition name="rows_block">
          <div
            class="list__bottom-rows__list"
            v-if="readShowBlockRows"
          >
            <span
              v-for="(item, index) in rows"
              :key="index"
              @click="changeActiveRows(item.count)"
            >{{ item.count }}</span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface SortingValue {
  up?: boolean;
  down?: boolean;
}

interface SortingItem {
  name: string;
  value?: SortingValue | string;
}
interface Users {
  id: number,
  name: string,
  status: string,
  team: string,
  priority: string,
  employee: string,
  date: Date | string,
}
interface Rows {
  count: number,
}
export default {
  setup(props, { emit }) {
    const listBlock = ref();
    const sorting = ref<SortingItem[]>([
      {
        name: "ID",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "User",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "Status",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "Teams",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "Employee",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "Date",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "Action",
      },
    ]);
    const filters = ref<SortingItem[]>([
      {
        name: "All",
      },
      {
        name: "Search",
        value: "",
      },
      {
        name: "All",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "All",
        value: {
          up: false,
          down: false,
        },
      },
      {
        name: "Priority",
      },
      {
        name: "Search",
        value: "",
      },
      {
        name: "All",
        value: {
          up: false,
          down: false,
        },
      },
    ])
    const users = ref<Users[]>([
      {
        id: 1,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 2,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 3,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 4,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 5,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 6,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 7,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 8,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
      {
        id: 9,
        name: "User 1",
        status: "Провал",
        team: "Team 1",
        priority: "high",
        employee: "one",
        date: "01.12.1995",
      },
    ]);
    const scrolling = ref<null | string>(null);
    const rows = ref<Rows[]>([
      { count: 1 },
      { count: 2 },
      { count: 3 },
      { count: 4 },
      { count: 5 },
      { count: 6 },
    ]);
    const isShowBlockRows = ref(false);
    const activeRows = ref<number>(5);

    const styleScrollSorting = computed((): string | null => scrolling.value ? "position: sticky; top: 0;" : null);
    const styleButtonRows = computed((): string | null => isShowBlockRows.value ? "transform: rotateZ(180deg);" : null);
    const readShowBlockRows = computed((): boolean => isShowBlockRows.value);
    const readActiveRows = computed((): number => activeRows.value);
    const styleListRows = computed((): string => `max-height: ${89 + 40 * activeRows.value}px`);

    const sortingUp = (item: SortingItem): void => {
      sorting.value.forEach((itemArr: SortingItem) => {
        if (itemArr.name == item.name) {
          const sortingValue = itemArr.value as SortingValue;
          sortingValue.up = !sortingValue.up;
        }
      });
    }
    const sortingDown = (item: SortingItem): void => console.log();
    const openAction = (): void => console.log();
    const openChat = (): void => emit("openChat");
    const scrollBlock = (): void => {
      scrolling.value = listBlock.value?.scrollTop;
      emit("scrollBlock", scrolling.value);
    };
    const showBlockRows = (): void => { isShowBlockRows.value = !isShowBlockRows.value; };
    const closeBlockRows = (): void => { isShowBlockRows.value = false };
    const changeActiveRows = (value: number): void => { activeRows.value = value; isShowBlockRows.value = false };

    return { listBlock, sorting: sorting.value, filters: filters.value, users: users.value, scrolling, rows: rows.value, isShowBlockRows: isShowBlockRows.value, activeRows: activeRows.value, styleScrollSorting, styleButtonRows, styleListRows, sortingUp, sortingDown, openAction, openChat, scrollBlock, showBlockRows, closeBlockRows, changeActiveRows, readShowBlockRows, readActiveRows }
  },
  emits: ["scrollBlock", "openChat"],
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  display: grid;
  column-gap: 10px;
  grid-template-columns: max-content 2fr 1fr 1fr 2fr 2fr 1fr 1fr;
  align-items: center;
  overflow-y: auto;
  max-height: 329px;
  padding-right: 20px;
  transition: all 0.5s ease-in-out;

  &__top {
    display: contents;

    &-sorting {
      display: contents;
    }

    &-sorting__item {
      display: flex;
      align-items: center;
      gap: 15px;
      position: sticky;
      top: 0;
      z-index: 2;

      p {
        font-size: 16px;
        letter-spacing: 0.01em;
        color: $text;
      }

      &-buttons {
        display: grid;
        row-gap: 6px;

        div {
          width: 12px;
          height: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        img {
          width: 8px;
          height: 4px;
        }

        div:first-child {
          justify-content: flex-end;
        }

        div:last-child {
          justify-content: flex-start;

          img {
            transform: rotateZ(180deg);
          }
        }
      }
    }

    &-sorting__item:nth-child(5) {
      grid-column: 6;
    }

    &-sorting__item:nth-child(6) {
      grid-column: 7;
    }

    &-sorting__item:nth-child(7) {
      grid-column: 8;
      justify-self: flex-end;
    }

    &-filters {
      display: contents;
    }

    &-filters__item {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 45px;
      position: sticky;
      top: 25px;
      z-index: 2;

      p {
        font-size: 14px;
        letter-spacing: 0.005em;
        color: #b1c7df;
      }

      &-buttons {
        display: grid;
        row-gap: 6px;

        div {
          width: 12px;
          height: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        img {
          width: 8px;
          height: 4px;
        }

        div:first-child {
          justify-content: flex-end;
        }

        div:last-child {
          justify-content: flex-start;

          img {
            transform: rotateZ(180deg);
          }
        }
      }
    }
  }

  &__middle {
    display: contents;

    &-item {
      display: contents;

      span {
        font-size: 14px;
        letter-spacing: 0.005em;
        color: $text;
      }

      &__title {
        display: flex;
        gap: 20px;
        align-items: center;

        img {
          width: 40px;
          height: 40px;

          object-fit: cover;
        }
      }

      &__index {
        grid-column: 1;
      }

      &__status,
      &__priority {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.005em;
        color: #6be2be;
        padding: 0 15px;
        border: 1px solid #6be2be;
        border-radius: 4px;
        width: fit-content;
        height: fit-content;
      }

      &__employee {
        display: flex;
        gap: 20px;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      &__action {
        justify-self: flex-end;
        // display: flex;
        // align-items: center;
        // gap: 5px;
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
  }

  &__bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-pagination {
      display: flex;
      align-items: center;
      gap: 20px;

      button {
        cursor: pointer;
        background-color: transparent;
        width: 30px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 10px;
      }

      &__right {
        img {
          transform: rotateZ(180deg);
        }
      }

      &__count {
        display: flex;
        align-items: center;
        gap: 10px;

        &-current {
          font-size: 16px;
          letter-spacing: 0.01em;
          color: $text;
        }

        &-prev,
        &-next {
          font-size: 14px;
          letter-spacing: 0.005em;
          color: #9290fe;
          cursor: pointer;
        }
      }
    }

    &-rows {
      position: relative;
      margin-top: 45px;
      display: flex;
      align-items: center;
      gap: 10px;

      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        color: $text;
      }

      button {
        cursor: pointer;
        background-color: transparent;
        width: 60px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        span {
          font-size: 14px;
          letter-spacing: 0.005em;
          color: $text;
        }

        img {
          transition: all 0.5s ease-in-out;
          // transform: rotateZ(180deg);
        }
      }

      &__list {
        position: absolute;
        right: 0;
        bottom: 35px;
        border: 1px solid #fff;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60px;
        border-radius: 10px;
        z-index: 3;
        background-color: #262626;

        span {
          font-size: 14px;
          letter-spacing: 0.005em;
          color: $text;
          border-bottom: 1px solid #fff;
          width: 100%;
          display: block;
          text-align: center;
          padding-bottom: 5px;
          margin-bottom: 5px;
          cursor: pointer;
        }

        span:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }
      }

      .rows_block-enter-active {
        animation: toggle-rows 0.5s ease-in-out 0s both;
      }

      .rows_block-leave-active {
        animation: toggle-rows 0.5s ease-in-out 0s reverse;
      }

      @keyframes toggle-rows {
        0% {
          transform: translateY(20%);
          opacity: 0;
        }

        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
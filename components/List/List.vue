<template>
  <div class="list-wrapper">
    <div class="list" @scroll="scrollBlock" ref="listBlock">
      <div class="list__top">
        <div class="list__top-sorting">
          <div
            class="list__top-sorting__item"
            v-for="(item, index) in sorting"
            :key="index"
            :style="styleScrollSorting"
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
            <div class="list__top-filters__item-buttons" v-if="item.value">
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
        <div class="list__middle-item" v-for="user in users" :key="user.id">
          <span class="list__middle-item__index">{{ user.id }}</span>
          <div class="list__middle-item__title">
            <img src="" alt="" width="40" height="40" />
            <span>{{ user.name }}</span>
          </div>
          <span class="list__middle-item__status">{{ user.status }}</span>
          <span class="list__middle-item__team">{{ user.team }}</span>
          <span class="list__middle-item__priority">{{ user.priority }}</span>
          <div class="list__middle-item__employee">
            <img src="" alt="" width="24" height="24" />
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
      <div class="list__bottom-pagination">
        <button class="list__bottom-pagination__left">
          <img
            src="@/assets/images/arrowPagination.svg"
            alt="Предыдущая страница"
          />
        </button>
        <div class="list__bottom-pagination__count">
          <span class="list__bottom-pagination__count-prev">1</span>
          <span class="list__bottom-pagination__count-current">2</span>
          <span class="list__bottom-pagination__count-next">3</span>
        </div>
        <button class="list__bottom-pagination__right">
          <img
            src="@/assets/images/arrowPagination.svg"
            alt="Следующая страница"
          />
        </button>
      </div>
      <div class="list__bottom-rows">
        <p>Rows per page</p>
        <button><span>1</span><img src="@/assets/images/arrowFilter.svg" alt="" /></button>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sorting: [
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
      ],
      filters: [
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
      ],
      users: [
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
      ],
      scrolling: false,
    };
  },
  computed: {
    styleScrollSorting() {
      return this.scrolling ? "position: sticky; top: 0;" : null;
    },
  },
  methods: {
    sortingUp(item) {
      this.sorting.forEach((itemArr) => {
        if (itemArr.name == item.name) {
          itemArr.value.up = !itemArr.value.up;
        }
      });
    },
    openAction() {
      console.log();
    },
    sortingDown(item) {
      console.log(item);
    },
    scrollBlock() {
      this.scrolling = this.$refs.listBlock.scrollTop;
      this.$emit("scrollBlock", this.scrolling);
    },
  },
  emits: ["scrollBlock"],
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
  max-height: 370px;
  padding-right: 20px;
  // scroll-behavior: smooth;
  // -webkit-overflow-scrolling: touch;
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
        color: #ffffff;
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
        color: #ffffff;
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
          &.dots + .dots {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
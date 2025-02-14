<template>
  <div class="home__header-wrapper">
    <nav class="home__header-nav">
      <ul class="home__header-nav__list">
        <li
          class="home__header-nav__link"
          v-for="(item, index) in links"
          :key="index"
          v-show="item.rule != ''"
        >
          <p
            v-if="item.rule != ''"
            :class="{ active: readClass(item.component) }"
            :style="'color: ' + readPath(item.component)"
            @click="$emit('changeComponent', item.component)"
          >
            <component
              :path_fill="readPath(item.component)"
              :is="item.icon"
            ></component>{{ item.name }}
          </p>
        </li>
      </ul>
    </nav>
    <div
      class="home__header-panel"
      @click="logout"
    >
      <img
        src="@/assets/images/search.svg"
        alt="Поиск"
      />
      <img
        src="@/assets/images/message.svg"
        alt="Сообщение"
      />
      <div class="home__header-panel__notice">
        <img
          src="@/assets/images/notice.svg"
          alt="Уведомления"
        />
      </div>
      <div class="home__header-panel__profile">
        <p>Faez</p>
        <span>Premium</span>
        <img
          class="home__header-panel__profile-img"
          src="@/assets/images/profile.png"
          alt="Изображение профиля"
        />
        <img
          class="home__header-panel__profile-arrow"
          src="@/assets/images/arrow.svg"
          alt="Стрелка"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dashboardIcon from "@/components/images/dashboardIcon.vue";
import issuesIcon from "@/components/images/issuesIcon.vue";
import tasksIcon from "@/components/images/tasksIcon.vue";
import iconDashboard from "@/assets/images/dashboard.svg";
import iconIssues from "@/assets/images/issues.svg";
import iconTasks from "@/assets/images/tasks.svg";
import { useStoreAuth } from "~~/store/Auth";
interface link {
  icon: any,
  img: string,
  img_alt: string,
  name: string,
  component: string,
  rule: string,
}
type nameComponent = 'graph' | 'users' | 'tasks';
export default {
  name: "HomeHeader",
  setup(props,) {
    const store = useStoreAuth();
    const links: link[] = [
      {
        icon: markRaw(dashboardIcon),
        img: iconDashboard,
        img_alt: "Панель",
        name: "Панель",
        component: "graph",
        rule: "user",
      },
      {
        icon: markRaw(issuesIcon),
        img: iconIssues,
        img_alt: "Участники",
        name: "Участники",
        component: "users",
        rule: "admin",
      },
      {
        icon: markRaw(tasksIcon),
        img: iconTasks,
        img_alt: "Задачи",
        name: "Задачи",
        component: "tasks",
        rule: "user",
      },
    ];
    const logout = (): void => store.logout();
    const readPath = (item: string): string => {
      return props.activeComponent == item ? "#B1C7DF" : "#fff";
    };
    const readClass = (item: string): boolean => {
      return props.activeComponent == item;
    };
    return { store, links, logout, readPath, readClass }
  },
  props: {
    activeComponent: String,
  },
  emits: ["changeComponent"],
};
</script>

<style lang="scss" scoped>
.home__header-wrapper {
  padding: 25px 40px;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home__header-nav {
  margin-right: auto;

  &__list {
    display: flex;
    align-items: center;
    gap: 35px;
  }

  &__link {}

  &__link:first-child a {
    svg {
      margin: -2px 0;
      margin-right: 5px;
    }
  }

  &__link p {
    display: flex;
    align-items: center;
    font-family: "Inter500";
    font-size: 14px;
    letter-spacing: 0.1px;
    color: $text;
    cursor: pointer;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 0;
      height: 2px;
      background: #b1c7df;
      border-radius: 40px;
      left: 0;
      bottom: -6px;
      transition: all 0.3s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }

    svg {
      margin-right: 5px;
    }
  }

  &__link p.active {
    &::after {
      width: 100%;
    }
  }
}

.home__header-panel {
  display: flex;
  align-items: center;
  gap: 25px;

  img {
    cursor: pointer;
  }

  &__notice {
    cursor: pointer;
  }

  &__notice.notice {
    position: relative;

    &::after {
      position: absolute;
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #f45757;
      border-radius: 50%;
      right: 0;
    }
  }

  &__profile {
    display: grid;
    align-items: center;
    column-gap: 6px;

    &-arrow {
      cursor: pointer;
      grid-column: 3;
      grid-row: 1/3;
      margin-left: 15px;
    }

    &-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      grid-column: 2;
      grid-row: 1/3;
      margin-left: 10px;
    }

    p {
      text-align: right;
      grid-column: 1;
      margin: 0;
      font-family: "Inter500";
      font-size: 14px;
      letter-spacing: 0.1px;
      color: #e2e6f8;
    }

    span {
      text-align: right;
      grid-column: 1;
      font-family: "Inter500";
      font-size: 12px;
      letter-spacing: 0.01em;
      color: #b1c7df;
    }
  }
}
</style>
<template>
  <div class="container_fluid" :class="{ fixed: getModal }" :style="
    getModal
      ? 'box-shadow: 0px 8px 57px 139px rgba(125, 125, 125, 0.25);'
      : ''
  ">
    <header-home :activeComponent="activeComponent" @changeComponent="changeComponent" />
    <div class="container__home">
      <div class="home__top" v-if="activeComponent == 'graph'">
        <div class="home__top-sorting">
          <button class="home__top-sorting__button">
            <p>10th May - 16th May 2021</p>
            <img src="@/assets/images/arrowSmallWhite.svg" alt="Стрелка" />
          </button>
          <div></div>
        </div>
        <h1>{{ timeTitle }} {{ readTime }}! {{ time }}</h1>
        <button class="home__top-export">
          <img src="@/assets/images/export.svg" alt="Экспортировать" />
          <p>Export</p>
        </button>
      </div>
      <transition name="home_component" mode="out-in">
        <component :is="activeComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { storeAuth } from "~/store/Auth";
import { storeData } from "~/store/Data";
import graph from "~/components/Graph/Graph.vue";
import users from "~/components/Users/Users.vue";
import tasks from "~/components/Tasks/Tasks.vue";
type componentName = 'graph' | 'users' | 'tasks';
export default {
  name: "PageIndex",
  setup(props, ctx) {
    const storeAuthorisation = storeAuth();
    const storeModal = storeData();
    let activeComponent = ref<componentName>("graph");
    const socket: object = {};
    const connected: object = {};
    let time: string = "";
    const interval = null;
    const getLogin = computed(() => storeAuthorisation.getLogin);
    const getModal = computed(() => storeModal.getModal);
    const readTime = computed(() => {
      const hour = new Date().getHours();
      if (hour >= 22 || hour < 7) return "ночи";
      if (hour >= 6 && hour < 12) return "утро";
      if (hour >= 12 && hour < 18) return "день";
      if (hour >= 18 && hour < 22) return "вечер";
    })
    const timeTitle = computed(() => {
      switch (readTime.value) {
        case "ночи":
          return "Доброй";
        case "утро":
          return "Доброе";
        case "день":
          return "Добрый";
        case "вечер":
          return "Добрый";
      }
    })
    const changeComponent = (name: componentName): void => {
      activeComponent.value = name;
    }
    return {
      activeComponent,
      socket,
      connected,
      time,
      interval,
      getLogin,
      getModal,
      readTime,
      timeTitle,
      changeComponent
    }
  },
  mounted() {
    // this.socket = this.$nuxtSocket({
    //   channel: "/",
    // });
    // /* Listen for events: */
    // this.socket.on("connect", (msg, cb) => {
    //   this.connected.value = this.socket.connected;
    //   console.log("connected: " + this.connected)
    //   /* Handle event */
    // });
    // this.socket.on("disconnect", () => {
    //   this.connected.value = this.socket.connected;
    //   console.log("disconnect: " + this.connected)
    // });
    // this.interval = setInterval(() => {
    //   this.time = new Date().toLocaleTimeString("ru-RU");
    //   console.log("time: " + this.time);
    // }, 1000);
  },
  methods: {
    // changeComponent(name: string): void {
    //   this.activeComponent = name;
    // },
    // method1() {
    //   /* Emit events */
    //   this.socket.emit('method1', {
    //     hello: 'world'
    //   }, (resp) => {
    //     /* Handle response, if any */
    //   })
    // }
  },
  // beforeUnmount() {
  //   clearInterval(this.interval);
  // },
  components: {
    graph,
    users,
    tasks,
  },
};
</script>
<style lang="scss" scoped>
.container__home {
  max-width: 90%;
  margin: 0 auto;
}

.home__top {
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
      color: $text;
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
      color: $text;
    }
  }

  h1 {
    font-family: "Inter600";
    font-size: 34px;
    text-align: center;
    letter-spacing: 0.25px;
    color: $text;
  }
}

.home_component-enter-active,
.home_component-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.home_component-enter,
.home_component-leave-to

/* .fade-leave-active до версии 2.1.8 */
  {
  opacity: 0;
}

// .home_component-enter-active {
//   animation: change-components .5s ease-in-out 0s;
// }
// .home_component-leave-active {
//   animation: change-components .5s ease-in-out 0s;
// }
// @keyframes change-components {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// }
</style>
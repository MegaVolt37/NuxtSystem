<template>
  <div
    class="container_fluid"
    :class="{ fixed: getModal }"
    :style="
      getModal
        ? 'box-shadow: 0px 8px 57px 139px rgba(125, 125, 125, 0.25);'
        : null
    "
  >
    <header-home
      :activeComponent="activeComponent"
      @changeComponent="changeComponent"
    />
    <div class="container__home">
      <div class="home__top">
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

<script>
import { mapState } from "pinia";
import { storeAuth } from "~/store/Auth";
import { storeData } from "~/store/Data";
import graph from "~/components/Graph/Graph.vue";
import users from "~/components/Users/Users.vue";
export default {
  name: "PageIndex",
  data() {
    return {
      activeComponent: "graph",
      socket: {},
      connected: {},
      time: "",
      interval: {},
    };
  },
  computed: {
    ...mapState(storeAuth, ["getLogin"]),
    ...mapState(storeData, ["getModal"]),
    readTime() {
      const hour = new Date().getHours();
      if (hour >= 22 || hour < 7) return "ночи";
      if (hour >= 6 && hour < 12) return "утро";
      if (hour >= 12 && hour < 18) return "день";
      if (hour >= 18 && hour < 22) return "вечер";
    },
    timeTitle() {
      switch (this.readTime) {
        case "ночи":
          return "Доброй";
        case "утро":
          return "Доброе";
        case "день":
          return "Добрый";
        case "вечер":
          return "Добрый";
      }
    },
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
    changeComponent(name) {
      this.activeComponent = name;
    },
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
.home_component-enter-active,
.home_component-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.home_component-enter, .home_component-leave-to /* .fade-leave-active до версии 2.1.8 */ {
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
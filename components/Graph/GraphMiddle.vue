<template>
  <div class="graph__middle">
    <div class="graph__middle-item" v-for="(item, index) in 3" :key="index" :style="readStyle(index)">
      <div class="graph__middle-item__panel" :style="panelStyle(index)">
        <div class="graph__middle-item__panel-title" v-if="index > 0">
          <p>Curve line</p>
          <span>May to June 2021</span>
        </div>
        <img @click="openShare(index)" src="@/assets/images/share.svg" alt="Поделиться" />
        <img src="@/assets/images/cloud.svg" alt="Хранилище" />
        <img src="@/assets/images/settings.svg" alt="Настройки" />
      </div>
      <div v-if="index == 0" class="pie" width="auto" height="auto">
        <Pie id="pie" :data="chartDataProps" :options="options" width="auto" height="auto" />
      </div>
      <div v-if="index == 1" class="line" width="auto" height="auto">
        <Line :data="lineData" :options="optionsLine" width="auto" height="auto" />
      </div>
      <div v-if="index == 2" class="bar" width="auto" height="auto">
        <Bar :data="lineBar" :options="optionsLine" width="auto" height="auto" />
      </div>
      <div class="graph__middle-item__description" v-if="index == 0">
        <div class="description__item" v-for="(item, index) in graph_info" :key="index">
          <span :style="colorTitle(index)"></span>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <img class="graph__middle-item__show" src="@/assets/images/showMore.svg" alt="Развернуть"
        @click="increateSize(index)" />
      <transition name="fade">
        <div class="graph__middle-item__share" v-show="isOpenShare === index">
          <div class="ya-share2" data-curtain data-shape="round"
            data-services="vkontakte,odnoklassniki,telegram,twitter,viber,whatsapp" data-title="Заголовок ссылки"
            data-url="http://localhost:3000/" data-image="null"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { storeData } from "~/store/Data";
import { Pie, Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Filler
);
export default defineNuxtComponent({
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#8989C9"],
            data: [],
          },
        ],
      },
      lineData: {
        labels: ["январь", "февраль", "март", "апрель", "июнь", "июль"],
        datasets: [
          {
            data: [40, 20, 40, 60, 0, 120],
            borderColor: "#9290FE",
            backgroundColor: "#9290FE",
            fill: true,
            tension: 0.5,
            lineWidth: 2,
          },
        ],
      },
      lineBar: {
        labels: ["январь", "февраль", "март", "апрель", "июнь", "июль"],
        datasets: [
          {
            data: [40, 20, 40, 60, 10, 120],
            borderColor: [
              "#9290FE",
              "#9290FE",
              "#9290FE",
              "#9290FE",
              "red",
              "green",
            ],
            backgroundColor: [
              "#9290FE",
              "#9290FE",
              "#9290FE",
              "#9290FE",
              "red",
              "green",
            ],
            borderWidth: 1,
          },
        ],
      },
      optionsLine: {
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: "#4D4D4D",
            },
          },
          y: {
            grid: {
              display: true,
              color: "#4D4D4D",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      isCreated: null,
      isOpenShare: false,
    };
  },
  methods: {
    ...mapActions(storeData, ["setModal"]),
    readStyle(index) {
      return this.isCreated === index
        ? "max-height: 500px; height: 500px;"
        : "";
    },
    panelStyle(index) {
      return index > 0
        ? "padding-bottom: 10px; margin-bottom: 20px; border-bottom: 1px solid #fff; grid-template-columns: 1fr 0fr 0fr 0fr;"
        : "padding-bottom: 10px; margin-bottom: 20px; border-bottom: 1px solid #fff; grid-template-columns: 0fr 0fr 0fr;";
    },
    increateSize(index) {
      if (this.isCreated === index) {
        this.isCreated = null;
      } else {
        this.isCreated = index;
      }
    },
    openShare(index) {
      this.setModal(true);
      if (this.isOpenShare === index) {
        this.isOpenShare = false;
      } else {
        this.isOpenShare = index;
      }
    },
    colorTitle(index) {
      switch (index) {
        case 0:
          return "background-color: #41B883;"
        case 1:
          return "background-color: #E46651;"
        case 2:
          return "background-color: #8989C9;"
      }
    },
  },
  computed: {
    chartDataProps() {
      let Data = this.chartData;
      Data.labels = this.graph_info.map((a) => a.title);
      Data.datasets[0].data = this.graph_info.map((a) => Math.abs(a.total));
      return Data;
    },
  },
  mounted() {
    let share = Ya.share2("my-share", {
      content: {
        url: "https://yandex.com",
      },
      // здесь вы можете указать и другие параметры
    });
  },
  setup() {
    useHead({
      script: [
        {
          src: "https://yastatic.net/share2/share.js",
          body: true,
        },
      ],
    });
  },
  props: {
    graph_info: Array,
  },
  components: { Pie, Line, Bar },

});
</script>

<style lang="scss" scoped>
.graph__middle {
  margin-top: 65px;
  display: flex;
  gap: 30px;
  height: 500px;

  &-item {
    max-height: 410px;
    position: relative;
    padding: 25px 30px;
    flex: 1;
    background: linear-gradient(133.84deg,
        #4e4e4e -16.04%,
        #333333 9.33%,
        #1a1a1a 32.02%,
        #1a1a1a 62.06%,
        #262626 87.42%,
        #4e4e4e 112.12%);
    /* Hard shadow */
    transition: all 0.3s ease-in-out;
    box-shadow: 2px 6px 15px 2px rgba(12, 10, 11, 0.8);
    border-radius: 16px;

    &__panel {
      display: grid;
      grid-template-columns: 0fr 0fr 0fr;
      justify-content: end;
      align-items: center;
      gap: 10px;

      img {
        cursor: pointer;
      }
    }

    &__panel-title {
      p {
        font-family: "Inter600";
        font-size: 20px;
        letter-spacing: 0.15px;
        color: #ffffff;
      }

      span {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.005em;
        color: #d9d9d9;
      }
    }

    .pie {
      max-width: 50%;
      max-height: 50%;
      width: 100%;
      height: 100%;
      margin: 0 auto;

      canvas {
        width: auto;
        height: auto;
        max-width: 100%;
      }
    }

    .line {
      max-height: 80%;
      width: 100%;
      height: 100%;
      margin: 0 auto;

      canvas {
        width: auto;
        height: auto;
        max-width: 100%;
      }
    }

    .bar {
      max-height: 80%;
      width: 100%;
      height: 100%;
      margin: 0 auto;

      canvas {
        width: auto;
        height: auto;
        max-width: 100%;
      }
    }

    &__description {
      margin-top: 10%;
      display: grid;
      row-gap: 25px;
      column-gap: 10px;

      .description__item {
        display: flex;
        gap: 20px;
        align-items: center;

        span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #fff;
        }

        p {
          font-family: "Inter600";
          font-size: 20px;
          letter-spacing: 0.15px;
          color: $text;
        }
      }

      .description__item:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
      }

      .description__item:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
      }
    }

    &__show {
      cursor: pointer;
      position: absolute;
      left: 12px;
      bottom: 12px;
    }

    &__share-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(196, 196, 196, 0.25);
    }

    &__share {
      position: absolute;
      top: 4%;
      left: auto;
      right: 25%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #000;
      border-radius: 20px;
      padding: 15px 25px;
    }

    .fade-enter-active {
      animation: toggle-social 1s ease-in-out 0s both;
    }

    .fade-leave-active {
      animation: toggle-social 1s ease-in-out 0s reverse;
    }

    @keyframes toggle-social {
      0% {
        top: -6%;
        opacity: 0;
      }

      100% {
        top: 4%;
        opacity: 1;
      }
    }
  }

  &-item:nth-child(2) {
    max-height: 410px;
  }
}
</style>
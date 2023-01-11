<template>
  <div>
    <div class="pie"><Pie :data="chartData" :options="options" /></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);
export default {
  data() {
    return {
      chartData: {
        labels: ["In progress", "Waiting for review", "Done Tasks"],
        datasets: [
          {
            backgroundColor: ['#00D8FF','#41B883', '#E46651'],
            data: [10, 20, 32],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  components: { Pie },
};
</script>

<style lang="scss" scoped>
.pie {
  max-width: 308px;
}
</style>
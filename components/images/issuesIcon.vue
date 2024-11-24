<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    :fill="svg_fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 0H1C0.4 0 0 0.4 0 1V19C0 19.6 0.4 20 1 20H19C19.6 20 20 19.6 20 19V1C20 0.4 19.6 0 19 0ZM8 18V14H12V18H8ZM8 12V8H12V12H8ZM2 8H6V12H2V8ZM8 6V2H12V6H8ZM14 8H18V12H14V8ZM18 6H14V2H18V6ZM6 2V6H2V2H6ZM2 14H6V18H2V14ZM14 18V14H18V18H14Z"
      :fill="path_fill"
    />
  </svg>
</template>

<script>
export default {
  name: "issuesIcon",
  props: {
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
    svg_fill: {
      type: String,
      default: "none",
    },
    path_fill: {
      type: String,
      default: "#ffffff",
    },
  },
};
</script>

<style>
</style>
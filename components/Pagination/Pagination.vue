<template>
  <div class="pagination">
    <button class="pagination__left">
      <img
        src="@/assets/images/arrowPagination.svg"
        alt="Предыдущая страница"
      />
    </button>
    <div class="pagination__count">
      <span
        class="pagination__count-prev"
        v-for="(count, index) in users.length / 3"
        :key="index"
      >1</span>
      <span class="pagination__count-current">2</span>
      <span class="pagination__count-next">3</span>
    </div>
    <button class="pagination__right">
      <img
        src="@/assets/images/arrowPagination.svg"
        alt="Следующая страница"
      />
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
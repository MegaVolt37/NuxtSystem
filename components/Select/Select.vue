<template>
  <div class="select">
    <span class="select__title">{{ title }}</span>
    <div
      class="select__options-wrapper"
      v-click-outside="closeOptions"
    >
      <span
        class="select__options-title"
        @click="openOptions"
      >{{
        readTitle
      }}</span>
      <transition name="select_options">
        <div
          class="select__options"
          v-if="isOpenOptions"
        >
          <span
            v-for="(option, index) in selects"
            :key="index"
            @click="selectOption(option)"
          >{{ option.title }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

interface Select {
  title: string,
  value: number
}
export default {
  setup(props) {
    const select = ref<Select>({
      title: "",
      value: 0,
    });
    const isOpenOptions = ref<boolean>(false);
    const readTitle = computed((): string => select.value.title);
    const selectOption = (value: Select) => {
      select.value = value;
      isOpenOptions.value = false;
    };
    const openOptions = (): void => { isOpenOptions.value = !isOpenOptions.value }
    const closeOptions = (): void => { isOpenOptions.value = false }
    const mountSelected = onMounted((): void => {
      select.value = props.selects?.[0];
    });
    return { select, isOpenOptions, readTitle, selectOption, openOptions, closeOptions, mountSelected };
  },
  props: {
    selects: {
      type: Array as PropType<Select[]>,
      required: true,
    },
    title: String,
  },
  emits: ["selectOption"],
};
</script>

<style lang="scss" scoped>
.select {
  &__title {
    font-family: "Inter500";
    font-size: 14px;
    color: $text;
    margin-bottom: 10px;
    display: block;
  }

  &__options-wrapper {
    background-color: #fff;
    border-radius: 5px;
    position: relative;
  }

  &__options-title {
    background-color: #e0e0e0;
    padding: 18px 25px;
    font-size: 14px;
    color: #4f4f4f;
    display: block;
    max-width: 255px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }

  &__options {
    position: absolute;
    top: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    gap: 5px;

    span {
      display: inline-block;
      padding: 10px 20px;
      background-color: #e0e0e0;
      cursor: pointer;
      transition: all .5s ease-in-out;

      &:hover {
        background-color: #b1b0b0;
      }
    }

    span:first-child {
      border-radius: 5px 5px 0 0;
    }

    span:last-child {
      border-radius: 0 0 5px 5px;
    }

    span+span {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -5px;
        height: 5px;
        background-color: #fff;
      }
    }
  }
}
</style>
<script setup lang="ts" generic="T extends string | number | any[]">
interface Props {
  componentChild: Component | string;
  itemClass?: string;
  required?: boolean;
  label?: string;
  labelTooltip?: string;
  disabled?: boolean;
  preview?: boolean;
  tooltip?: string;
  letterCounter?: boolean;
  name?: string;
  tag?: "div" | "fieldset";
  wrapperClass?: string;
  maxlength?: number;
  defaultValue?: number | string | boolean;
  hiddenLabel?: boolean;
  maxSize?: number;
  innerValue?: string | number;
  showResetButton?: boolean;
  componentUtils?: Component | string;
  validation?: () => ({})
}
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  defaultValue: undefined,
});
const attrs = useAttrs();
const { value, meta, errorMessage } = useField<T>(props.name ?? "");
const isError = computed(() => !meta.valid && (meta.dirty || meta.touched));

const valueLength = computed(() => {
  if (typeof value.value === "string") return value.value?.length;
});

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue !== undefined && props.defaultValue !== null) {

      value.value = props.defaultValue;
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="tag ?? 'div'" class="form-item relative" :class="[itemClass]">
    <template v-if="label">
      <span class="app-form-item__label-item">
        {{ label }}
      </span>

      <button v-show="innerValue && showResetButton" @self-click="emit('reset')">{{ 'Сбросить' }}</button>

      <!-- <UiButton
        v-show="innerValue && showResetButton"
        class="app-form-item__reset-btn app-form-item__label-item"
        mod="secondary-danger-text-small"
        @self-click="emit('reset')"
      >
        <nuxt-icon
          class="app-ads-catalog-form__cross-icon"
          name="red-cross-icon"
          filled
        />

        {{ $t("reset") }}
      </UiButton> -->
    </template>
    <component
        v-if="!componentUtils"
        :is="componentChild"
        v-model="value"
        v-bind="attrs"
        :disabled="disabled"
        :is-preview="preview"
        :default-value="defaultValue"
        :name="name"
        :error="isError"
        :maxlength="maxlength"
        :max-size="maxSize"
      >
        <template #prefix>
          <slot name="prefix" />
        </template>

        <slot />
      </component>
      <component
        v-else
        :is="componentUtils"
        :component="componentChild"
        v-model="value"
        v-bind="attrs"
        :disabled="disabled"
        :is-preview="preview"
        :default-value="defaultValue"
        :name="name"
        :error="isError"
        :maxlength="maxlength"
        :max-size="maxSize"
      ></component>
    <span v-if="maxSize" class="text-12 text-danger">{{ errorMessage }}</span>
  </component>
</template>

<style scoped>

</style>
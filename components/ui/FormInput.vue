<template>
  <el-input
    v-bind="props"
    :name="props.name"
    v-model="value"
  />
</template>

<script lang="ts" setup>
import { type InputProps } from 'element-plus'
interface IProps extends InputProps {
  name: string
}
const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style></style>


<!-- <template>
  <AppFormItem
    :inner-value="modelValue"
    @reset="reset"
  >
    <a-input
      :id="uuid.toString()"
      :value="modelValue"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      autocomplete="true"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </AppFormItem>
</template> -->
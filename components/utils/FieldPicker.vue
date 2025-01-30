<script setup lang="ts">
interface Props {
	modelValue: URLLink[]
	types: any[]
	defaultValue?: object
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <UtilsPicker
    v-model="model"
    :default-value="defaultValue"
    :validate="
      (arr) =>
        Boolean(
          arr?.length &&
            arr.every((item) => {
              return !!item?.item?.value; // TODO: вернуть !!item?.item?.value && !!item?.item?.type
            })
        )
    "
  >
    <template #item="{ uuid, item, update }">
      <UtilsFieldPickerItem
        v-bind="attrs"
        :key="uuid"
        :types="types"
        :uuid="uuid"
        :file="item"
        @change="update"
      />
    </template>
  </UtilsPicker>
</template>

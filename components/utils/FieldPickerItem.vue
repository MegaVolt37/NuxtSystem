<script setup lang="ts">
interface Props {
	uuid: string
	file?: object
	types: Array<Record<string, any>>
  component: Component | string;
}

const attrs = useAttrs();
const props = defineProps<Props>()
const emit = defineEmits<{
	change: [{ uuid: string, item: PickItem<URLLink>, id?: any }]
}>()
const type = ref<number>(+props.file?.type || '')
const value = ref<string>(props.file?.value || '')

watch([type, value], () => {
	emit('change', {
		uuid: props.uuid,
		item: { type: type.value, value: value.value }
	})
})
</script>

<template>
  <component
    class="w-full"
    :is="component"
    v-bind="attrs"
    v-model="value"
    :name="`link-${uuid}`"
  />
</template>

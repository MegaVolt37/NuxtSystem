<script setup lang="ts" generic="T">
import { type WritableComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type PickMap<T> = Map<string, { item: T | null | object, id?: any }>
type PickArray = Array<T | null>
type Model = T[] | T | undefined | null

interface Props {
	validate?: (els: PickArray) => boolean
	limitedTo?: number
	minLimit?: number
	modelValue: Model
	defaultValue?: object
	isPreview?: boolean
	requiredLimit?: number
}

const props = withDefaults(defineProps<Props>(), {
	limitedTo: undefined,
	minLimit: 1,
	validate: (_: PickArray) => true
})
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const model = useVModel(
	props,
	'modelValue',
	emit
) as WritableComputedRef<Model>
const itemsMap = ref<PickMap<T>>(new Map())

const selectItemsArray = computed(() => Array.from(itemsMap.value.values()))
const pickItemsArray = computed(
	() => selectItemsArray.value.filter(Boolean) as any as T[]
)
const selectLimitExceeded = computed(() =>
	isLimitExceeded({ filtered: false })
)
const pickLimitExceeded = computed(() => isLimitExceeded({ filtered: true }))

const isLimitExceeded = ({ filtered }: { filtered?: boolean }) => {
	if (!props.validate(selectItemsArray.value)) return true

	if (typeof props.limitedTo !== 'number') return false

	return filtered
		? pickItemsArray.value?.length >= props.limitedTo
		: selectItemsArray.value?.length >= props.limitedTo
}

const setItemToMap = ({
	uuid,
	item,
	id
}: {
	uuid: string
	item: T | null | object
	id?: any
}) => {
	if (pickLimitExceeded.value) return
	itemsMap.value.set(uuid, { item, id })
}

const addItemToMap = ({
	uuid,
	item,
	id
}: {
	uuid: string
	item: T | null | object
	id?: any
}) => {
	setItemToMap({ uuid, item, id })
}

const addSelectToMap = () => {
	if (selectLimitExceeded.value) return
	const lastItem = pickItemsArray.value[pickItemsArray.value.length - 1]?.item
	if (lastItem !== null && lastItem !== undefined) {
		addItemToMap({ uuid: uuidv4(), item: null })
	}
}

const removeItemFromMap = (uuid: string) => {
	itemsMap.value.size > 1
		? itemsMap.value.delete(uuid)
		: itemsMap.value.set(uuid, { item: null })
}

const updateItemFromMap = ({
	uuid,
	item,
	id
}: {
	uuid: string
	item: T
	id?: any
}) => {
	if (!itemsMap.value.has(uuid)) return
	itemsMap.value.set(uuid, {
		item,
		id: id ?? itemsMap.value.get(uuid)?.id
	})
}

watchEffect(() => {
	const newValue =
		props.limitedTo && props.limitedTo <= 1
			? pickItemsArray.value?.[0]
			: pickItemsArray.value

	model.value = newValue
})
watch(
	props.defaultValue,
	() => {
		if (props.defaultValue && props.defaultValue?.length > 0) {
			props.defaultValue?.forEach((item, index) => {
				itemsMap.value.set(uuidv4(), {
					item: { name: item?.title, type: item?.type, value: item?.value },
					id: item?.id
				})
			})
		} else if (props.defaultValue && props.defaultValue?.value) {
			itemsMap.value.set(uuidv4(), {
				item: { name: props.defaultValue?.title, value: props.defaultValue?.value },
				id: props.defaultValue?.id
			})
		} else {
			itemsMap.value.set(uuidv4(), { item: null })
		}
	},
	{ immediate: true }
)
</script>

<template>
  <div class="file__picker">
    <div class="grid grid-col-1 gap-10">
      <slot
        v-for="[uuid, item] of itemsMap"
        :id="item.id"
        name="item"
        :uuid="uuid"
        :item="item.item"
        :add="addItemToMap"
        :update="updateItemFromMap"
        :remove="removeItemFromMap"
      />
    </div>

    <button
      v-if="(limitedTo !== minLimit && !isPreview && requiredLimit !== 1) || false"
      icon="plus"
      class="mt-10 ml-auto text-white"
      :disabled="selectLimitExceeded"
      @click="addSelectToMap()"
    >
      Добавить
    </button>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { VueFinalModal, useVfm } from "vue-final-modal";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Emits = {
	confirm: []
	escape: []
}

interface UseVModalProps {
	id: string
	icon?: string
	title?: string
	subtitle?: string
	confirmText?: string
	escapeText?: string
	controls?: boolean
	multiple?: boolean
	componentProps?: any
  contentStyle?: string
	component?: string | Component
}
const props = defineProps<UseVModalProps>()
const emit = defineEmits<Emits>()

const modalId = computed(() => `${props.id}_${uuidv4()}`)

const { close } = useVfm()

const closeModal = () => close(modalId.value)

const onConfirm = () => {
	emit('confirm')

	closeModal()
}

const onEscape = () => {
	emit('escape')

	closeModal()
}

</script>

<template>
  <VueFinalModal
    :modal-id="modalId"
    overlay-transition="vfm-fade"
    swipe-to-close="down"
    :threshold="300"
    overlay-class="vfm-overlay"
    class="fullscreen grid justify-center items-center p-[20px] overflow-y-auto"
    content-class="flex flex-col p-10 max-sm:px-[20px] bg-white rounded-[20px] max-w-[900px] w-fit relative"
    :content-style="contentStyle"
  >
    <NuxtIcon class="vfm-modal__close" name="close-icon" @click="closeModal" />
    <div class="vfm-header flex items-center">
      <h1 v-if="title" class="text-[24px]  max-sm:text-[20px]">
        {{ title }}
      </h1>
    </div>
      <component
      :is="props.component"
      v-if="props.component"
      v-bind="props.componentProps"
      :onConfirm="onConfirm"
    />
    
  </VueFinalModal>

</template>



<style lang="scss">
.vfm-header {
  // h1 {
  //   font-family: "Manrope800";
  //   color: $brown;
  //   margin-bottom: rem(40);
  // }
}
 .vfm-modal__close {
    position: absolute;
    // right: rem(12);
    // top: rem(8);
    // color: $black;
    cursor: pointer;
  }
  .fullscreen {
    height: 100dvh;

    @supports not (height: calc(100dvh)) {
      height: calc(100vh);
    }
  }
  .vfm-overlay {
    position: fixed;
    background-color: rgba(#a7a19c, 0.7) !important;
    height: 100dvh;

    @supports not (height: calc(100dvh)) {
      height: calc(100vh);
    }
  }
  .vfm__content {
    // .modal-header {
    //   font-family: "Manrope800";
    //   color: $brown;
    //   margin-top: rem(20);
    //   margin-bottom: rem(10);

    //   @media screen and (max-width: 525px) {
    //     font-size: rem(20);
    //   }
    // }
  }
</style>

<template>
  <component
    :is="bindIs().is"
    v-bind[disabled]="disabled || pending"
    :class="button.classes"
    v-bind="bindIs()"
  >
    <div
      v-if="!props.pending || !button.pending"
      :class="bem('app-button__holder', { reverse })"
      @click="emit('self-click', $event)"
    >
      <div class="app-button__text">
        <slot />
      </div>

      <div
        v-if="$slots.icon && button.icon"
        class="app-button__icon"
      >
        <slot name="icon" />
      </div>
    </div>

    <svg
      v-if="props.pending && button.pending"
      class="app-button__pending-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663M1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </component>
</template>

<script setup>
const emit = defineEmits(["self-click"])

// TODO: стили кнопок помимо дефолта, передается через пропс mod:
const props = defineProps({
  pending: {
    type: Boolean,
    required: false,
    default: false,
  },

  reverse: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  active: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * @values primary-blue, secondary, secondary-small,  secondary-blue, secondary-blue-small, transparent, transparent-blue
   */
  mod: {
    type: String,
    required: false,
    default: "primary",
  },

  to: {
    type: String,
    required: false,
    default: "",
  },

  href: {
    type: String,
    required: false,
    default: "",
  },
})

const bindIs = () => {
  if (props.to) {
    return {
      is: resolveComponent("NuxtLink"),
      to: props.to,
    }
  } else if (props.href) {
    return {
      is: "a",
      href: props.href,
      target: "_blank",
    }
  }

  return {
    is: "button",
    disabled: props.disabled
  }
}

const buttons = computed(() => ({
  primary: {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
    ],
    icon: true,
    pending: true,
  },

  "primary-red": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--primary--red"
    ],
    icon: true,
    pending: true,
  },

  "primary-blue": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--primary--blue",
    ],
    icon: true,
    pending: true,
  },

  secondary: {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary",
    ],
    pending: true,
    icon: true,
  },

  "secondary-danger-text-small": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary-danger-text-small",
    ],
    pending: true,
    icon: true,
  },

  "secondary-text-white": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary-text-white",
    ],
    pending: true,
    icon: true,
  },

  "secondary-transparent-small": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary-transparent-small",
    ],
    pending: true,
    icon: true,
  },

  "secondary-white": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary--white",
    ],
    pending: true,
    icon: true,
  },

  "secondary-small": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary--small",
    ],
    icon: true,
    pending: true,
  },

  "secondary-small-white": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary--small--white",
    ],
    icon: true,
    pending: true,
  },

  "secondary-blue": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary--blue",
    ],
    pending: true,
    icon: true,
  },

  "secondary-blue-small": {
    classes: [
      bem("app-button", {
        pending: props.pending,
        disabled: props.disabled,
        reverse: props.reverse,
      }),
      "app-button--secondary--small--blue",
    ],
    pending: true,
    icon: true,
  },

  transparent: {
    classes: [
      bem("app-button", { disabled: props.disabled }),
      "app-button--transparent",
    ],
    pending: false,
    icon: false,
  },

  "transparent-blue": {
    classes: [
      bem("app-button", { disabled: props.disabled, active: props.active }),
      "app-button--transparent--blue",
    ],
    icon: false,
    pending: false,
  },

  "danger": {
    classes: [
      bem("app-button", { disabled: props.disabled, active: props.active }),
      "app-button--danger",
    ],
    icon: false,
    pending: false,
  },
}))

const button = computed(() => {
  return buttons.value[props.mod]
})
</script>

<!-- <style lang="scss">
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: remxs(16) remxs(32);

  color: $white;
  font-weight: 500;
  font-size: remxs(16);
  line-height: 1;
  text-decoration: none;

  background-color: $blue;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  transition: all $transition-normal $timing-function-default;

  &:hover {
    color: $white;
  }

  @include lg-min {
    padding: rem(16) rem(32);

    font-size: rem(16);

    &:hover {
      color: $white;

      background-color: $blue-900;
    }
  }

  &--primary--blue {
    color: $blue;

    background-color: $white;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      &:hover {
        color: $blue;

        background-color: $blue-500;
      }
    }
  }

  &--danger {
    color: $red;

    background-color: $dark-red;

    &:hover {
      color: $red;
    }

    @include lg-min {
      &:hover {
        color: $red;

        background-color: $dark-red;
      }
    }
  }

  &--primary--red {
    color: $red;

    background-color: $red-300;

    &:hover {
      color: $red;
    }

    @include lg-min {
      &:hover {
        color: $red;

        background-color: $red-300;
      }
    }
  }

  &--secondary {
    color: $blue;

    background-color: $blue-400;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      &:hover {
        color: $blue;

        background-color: $blue-500;
      }
    }
  }

  &--secondary-text-white {
    padding: 0 !important;

    color: $red;

    font-size: remxs(14);

    background-color: transparent;

    &:hover {
      color: $red;
    }

    @include lg-min {
      padding: rem(12) rem(24);

      font-size: rem(14);

      &:hover {
        color: $red;

        background-color: transparent;
      }
    }
  }

  &--secondary-danger-text-small {
    padding: 0 !important;

    color: $red;

    font-size: remxs(14);

    background-color: transparent;

    &:hover {
      color: $red;
    }

    @include lg-min {
      padding: rem(12) rem(24);

      font-size: rem(14);

      &:hover {
        color: $red;

        background-color: transparent;
      }
    }
  }

  &--secondary--white {
    color: $blue;

    background-color: $white;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      &:hover {
        color: $blue;

        background-color: $blue-500;
      }
    }
  }

  &--secondary--blue {
    color: $white;

    background-color: $blue-900;

    &:hover {
      color: $white;
    }

    @include lg-min {
      &:hover {
        color: $blue;

        background-color: $white;
      }
    }

    &:is(.app-button--disabled),
    &:is(.app-button--pending) {
      color: $blue-800;

      background-color: $blue-900;
    }

    &:is(.app-button--size--s.app-button--disabled),
    &:is(.app-button--size--s.app-button--pending) {
      color: $blue-800;

      pointer-events: none;
    }
  }

  &--secondary--small {
    padding: remxs(12) remxs(24);

    color: $blue;

    font-size: remxs(14);

    background-color: $blue-400;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      padding: rem(12) rem(24);

      font-size: rem(14);

      &:hover {
        color: $blue;

        background-color: $blue-500;
      }
    }
  }

  &--secondary-transparent-small {
    padding: remxs(12) remxs(24);

    color: $blue;

    font-size: remxs(14);

    background-color: transparent;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      padding: rem(12) rem(24);

      font-size: rem(14);

      &:hover {
        color: $blue;

        background-color: transparent;
      }
    }
  }

  &--secondary--small--white {
    padding: remxs(12) remxs(24);

    color: $blue;

    font-size: remxs(14);

    background-color: $white;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      padding: rem(12) rem(24);

      font-size: rem(14);

      &:hover {
        color: $blue;

        background-color: $blue-400;
      }
    }
  }

  &--secondary--small--blue {
    padding: remxs(12) remxs(24);

    color: $white;

    font-size: remxs(14);

    background-color: #2f4c78;

    &:hover {
      color: $white;
    }

    @include lg-min {
      padding: rem(12) rem(24);

      font-size: rem(14);

      &:hover {
        color: $white;

        background-color: $blue-900;
      }
    }

    &:is(.app-button--disabled),
    &:is(.app-button--pending) {
      color: $blue-800;

      background-color: #2f4c78;
    }
  }

  &--transparent {
    height: max-content;
    padding: 0;

    color: $blue;

    background: none;

    &:hover {
      color: $blue;
    }

    @include lg-min {
      &:hover {
        color: $blue-800;

        background: none;
      }
    }

    &:is(.app-button--disabled) {
      color: $blue-700;

      pointer-events: none;
    }
  }

  &--transparent--blue {
    height: max-content;
    padding: 0;

    color: $blue-800;

    background: none;

    &:hover {
      color: $blue-800;
    }

    @include lg-min {
      &:hover {
        color: $blue-700;

        background: none;
      }
    }

    &:active {
      @include lg-min {
        color: $white;
      }
    }

    &:is(.app-button--active) {
      color: $white;
    }

    &:is(.app-button--disabled) {
      color: $blue-800;

      pointer-events: none;
    }
  }

  &--disabled {
    color: $blue-800;

    background-color: $blue-400;

    pointer-events: none;
  }

  &--pending {
    color: $blue-800;

    background-color: $blue-400;

    pointer-events: none;
  }
}

.app-button__holder {
  display: flex;
  align-items: center;

  &--reverse {
    flex-direction: row-reverse;
  }
}

// .app-button__icon {
// }

.app-button__pending-icon {
  animation: loader-rotate 1s linear infinite;

  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style> -->
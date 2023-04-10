<template>
  <div class="modal-wrapper">
    <div class="close-modal" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-inputs">
        <slot></slot>
      </div>
      <span @click="closeModal"><img src="StaticWindow.iconClose.icon" alt="StaticWindow.iconClose.alt" width="12"
          height="12" /></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup(props, { emit }) {
    const closeModal = (): void => emit("closeModal");
    return { closeModal }
  },
  emits: ["closeModal"],
};
</script>

<style lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(196, 196, 196, 0.25);
  z-index: 15;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  display: flex;

  .close-modal {
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .modal-content {
    width: 605px;
    position: relative;
    padding: 70px 100px;
    margin: auto;
    background: #ffffff;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    height: fit-content;
  }

  .modal-inputs {
    max-width: 605px;
    margin: 0 auto;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}

@media (max-width: 1250px) {
  .modal-wrapper {
    .modal-content {
      width: 100%;
      margin: auto 20px;
    }
  }
}

@media (max-width: 600px) {
  .modal-wrapper {
    .modal-content {
      overflow-y: auto;
      padding: 20px;
      padding-top: 50px;
      padding-bottom: 40px;
      margin: auto 0;
    }
  }
}
</style>

function $emit(arg0: string): void {
  throw new Error('Function not implemented.');
}

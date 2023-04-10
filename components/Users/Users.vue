<template>
  <div class="users">
    <div class="users__top">
      <div class="users__top-dots">
        <img src="@/assets/images/dots.svg" alt="dots" />
      </div>
      <div class="users__top-title">
        <p>Table</p>
        <span>May to June 2021</span>
      </div>
      <div class="users__top-share">
        <img @click="openShare()" src="@/assets/images/share.svg" alt="Поделиться" />
        <img src="@/assets/images/cloud.svg" alt="Хранилище" />
        <img src="@/assets/images/settings.svg" alt="Настройки" />
      </div>
      <transition name="fade">
        <div class="graph__middle-item__share" v-show="isOpenShare">
          <div class="ya-share2" data-curtain data-shape="round"
            data-services="vkontakte,odnoklassniki,telegram,twitter,viber,whatsapp" data-title="Заголовок ссылки"
            data-url="http://localhost:3000/" data-image="null"></div>
        </div>
      </transition>
    </div>
    <div class="users__middle" :class="{ scroll: scrolling }">
      <list @scrollBlock="scrollBlock" @openChat="openChat" />
    </div>
    <transition name="chat">
      <chat v-if="isOpenChat" @closeChat="closeChat" />
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    let isOpenShare = ref<boolean>(false);
    let scrolling = ref<boolean>(false);
    let isOpenChat = ref<boolean>(false);
    const openShare = () => isOpenShare.value = !isOpenShare.value;
    const scrollBlock = (pos: number) => scrolling.value = !!pos;
    const openChat = () => isOpenChat.value = true;
    const closeChat = () => isOpenChat.value = false;
    return {
      isOpenShare,
      scrolling,
      isOpenChat,
      openShare,
      scrollBlock,
      openChat,
      closeChat,
    }
  },
};
</script>

<style lang="scss" scoped>
.users {
  margin-top: 45px;
  background: linear-gradient(133.84deg,
      #4e4e4e -16.04%,
      #333333 9.33%,
      #1a1a1a 32.02%,
      #1a1a1a 62.06%,
      #262626 87.42%,
      #4e4e4e 112.12%);
  /* Hard shadow */
  padding: 20px;
  box-shadow: 2px 6px 15px 2px rgba(12, 10, 11, 0.8);
  border-radius: 16px;

  &__top {
    display: grid;
    align-items: center;
    grid-template-columns: max-content 1fr max-content;
    column-gap: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #fff;
    margin-bottom: 20px;

    &-dots {}

    &-title {
      p {
        font-family: "Inter600";
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 0.15px;
        color: $text;
      }

      span {
        font-size: 14px;
        letter-spacing: 0.005em;
        color: #d9d9d9;
      }
    }

    &-share {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        cursor: pointer;
      }
    }
  }

  &__middle {}

  &__middle.scroll {
    position: relative;

    &::after {
      content: "";
      display: block;
      height: 50px;
      position: absolute;
      top: 0;
      left: 0;
      right: 25px;
      bottom: 0;
      z-index: 1;
      background: linear-gradient(133.84deg,
          #333333 4.33%,
          #1a1a1a 25.02%,
          #1a1a1a 62.06%,
          #262626 87.42%,
          #4e4e4e 140.12%);
    }
  }
}

.fade-enter-active {
  animation: toggle-social 1s ease-in-out 0s both;
}

.fade-leave-active {
  animation: toggle-social 1s ease-in-out 0s reverse;
}

.chat-enter-active {
  animation: chat .5s ease-in-out 0s both;
}

.chat-leave-active {
  animation: chat .5s ease-in-out 0s reverse;
}

@keyframes chat {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes toggle-social {
  0% {
    top: -6%;
    opacity: 0;
  }

  100% {
    top: 4%;
    opacity: 1;
  }
}
</style>
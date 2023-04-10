<template>
  <div class="chat">
    <img
      class="chat__close"
      @click="closeChat"
      src="@/assets/images/closeChat.svg"
      alt="Закрыть чат"
      width="12"
      height="12"
    />
    <div class="chat__messages">
      <div
        class="chat__messages-item"
        v-for="(item, index) in messages"
        :key="index"
        :style="readStyle(item)"
      >
        <img
          class="chat__messages-item__img"
          src="@/assets/images/profile.png"
          alt="user"
          width="50"
          height="50"
        />
        <span class="chat__messages-item__text" :style="readStyleUser(item)">{{
          item.messages
        }}</span>
      </div>
    </div>
    <div class="chat__send">
      <input
        class="chat__send-input"
        type="text"
        v-model="text"
        placeholder="Введите текст"
      />
      <button class="chat__send-btn" @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          id: 0,
          messages: "Lorem ipsum dolor sit amet.",
        },
        {
          id: 1,
          messages:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus illo, ipsum non voluptatibus sit ratione.",
        },
      ],
      text: "",
    };
  },
  methods: {
    readStyleUser(item) {
      switch (item.id) {
        case 0:
          break;
        case 1:
          return "border-radius: 24px 0px 24px 24px;background-color: #00BF9D;";
        default:
          return;
      }
    },
    readStyle(item) {
      switch (item.id) {
        case 0:
          break;
        case 1:
          return "flex-direction: row-reverse;align-self: flex-end;";
        default:
          return;
      }
    },
    closeChat() {
      this.$emit("closeChat");
    },
    sendMessage() {
      if (this.text.length > 0) {
        this.messages.push({ id: 1, messages: this.text });
        this.text = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  padding: 50px 15px 30px 15px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: #5b5b5b;
  box-shadow: 0px 13px 38px 18px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  max-width: 925px;
  max-height: 550px;
  width: 100%;
  height: 100%;
  z-index: 10;
  &__close {
    cursor: pointer;
    position: absolute;
    right: 25px;
    top: 25px;
  }
  &__messages {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow: auto;
    max-height: 80%;
  }
  &__messages-item {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 50%;
    &__img {
    }
    &__text {
      font-size: 14px;
      color: $text;
      padding: 12px 20px;
      display: block;
      background-color: #1868fb;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.24),
        0px 2px 4px rgba(0, 0, 0, 0.16), 0px -1px 1px rgba(0, 0, 0, 0.08);
      border-radius: 0px 24px 24px 24px;
    }
  }
  .chat__send {
    position: absolute;
    bottom: 30px;
    left: 15px;
    right: 15px;
    display: flex;
    align-self: center;
    gap: 20px;
    &-input {
      padding: 0 15px;
      width: 100%;
      height: 35px;
      background-color: #000000;
      border: 1px solid #307fe2;
      box-shadow: 0px 0px 0px 4px rgba(48, 127, 226, 0.6);
      border-radius: 4px;
      font-size: 15px;
      color: $text;
    }
    &-btn {
      cursor: pointer;
      max-width: 130px;
      width: 100%;
      height: 35px;
      background-color: #307fe2;
      border-radius: 4px;
      font-family: "Inter900";
      font-size: 16px;
      color: $text;
      border: none;
    }
  }
}
</style>
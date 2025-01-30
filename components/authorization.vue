<template>
  <div class="auth">
    <div class="auth__content">
      <form class="auth__form">
        <div
          class="auth__form-fields"
          v-for="item in formState"
          :key="item?.name"
        >
          <p>{{ item?.name }}</p>
          <input
            v-model="item.value"
            :type="item?.type"
            :class="{ error: errorClass(item) }"
            @input="writeForm(item)"
            :placeholder="errorTextInput(item)"
            autocomplete="new-password"
          />
        </div>
        <span class="auth__form-forgot">Forgot Password?</span>
        <button
          class="auth__form-send"
          @click.prevent="sendForm"
        >Login</button>
      </form>
      <img
        class="auth__content-close"
        src="@/assets/images/reset.svg"
        alt="Закрыть окно"
      />
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapActions } from "pinia";
import { useStoreAuth } from "~~/store/Auth";
export default {
  name: "Authorization",
  data() {
    return {
      v$: useVuelidate(),
      formData: {
        Username: "",
        Password: "",
      },
      formState: [
        {
          name: "Username",
          type: "text",
          value: "",
        },
        {
          name: "Password",
          type: "password",
          value: "",
        },
      ],
      errors: {
        Username: false,
        Password: false,
      },
      textError: "Обязательное поле для заполнения",
    };
  },
  validations() {
    return {
      formData: {
        Username: { required },
        Password: { required },
      },
    };
  },
  methods: {
    ...mapActions(useStoreAuth, ["login"]),
    errorClass(item) {
      return this.errors[item.name];
    },
    errorTextInput(value) {
      return this.errors[value.name] ? this.textError : "";
    },
    writeForm(value) {
      this.formData[value?.name] = value?.value;
      this.v$.formData[value?.name].$touch();
      this.errors[value.name] = this.v$.formData[value.name].$error;
    },
    async sendForm() {
      try {
        const form = {
          phone: this.formData.Username,
          password: this.formData.Password,
        };
        this.login(form)
      } catch (e) {
        // console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__content {
    position: relative;
    background: $light-black;
    border: 4px solid $black;
    box-shadow: 2px 18px 26px 16px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    max-width: 800px;
    max-height: 600px;
    min-width: 800px;
    min-height: 600px;
    width: 100%;
    height: 100%;
    padding: 0 55px;
    display: grid;
    align-items: center;

    &-close {
      cursor: pointer;
      position: absolute;
      right: 25px;
      bottom: 20px;
    }
  }

  .auth__form {
    &-fields {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:last-child {
        margin-top: 30px;
      }

      p {
        font-size: 12px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: $gray-text;
      }

      input {
        flex: 0 1 60%;
        font-family: "Inter700";
        font-size: 16px;
        color: $gray-text;
        background: $black;
        border-radius: 12px;
        padding: 15px 20px;
        transition: all 0.3s ease-in-out;

        &:focus {
          outline: none;
        }
      }

      input.error {
        border-color: red;

        &::placeholder {
          color: red;
          font-size: 12px;
        }
      }
    }

    &-fields:nth-child(2) {
      margin-top: 50px;
    }

    &-forgot {
      cursor: pointer;
      font-family: "Inter500";
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(0, 163, 255, 0.64);
      display: flex;
      margin-top: 10px;
      margin-left: auto;
      width: 59%;
    }

    &-send {
      cursor: pointer;
      background: $green;
      box-shadow: 0px 0px 10px 8px rgba(46, 213, 115, 0.15);
      border-radius: 30px;
      padding: 13px 35px;
      max-width: 250px;
      width: 100%;
      font-family: "Inter700";
      font-size: 18px;
      color: $black;
      margin-top: 55px;
      margin-left: auto;
      margin-right: 15%;
      display: block;
    }
  }
}
</style>
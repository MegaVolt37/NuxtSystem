<template>
  <div
    class="container_fluid"
    :class="{ fixed: getModal }"
    :style="getModal
      ? 'box-shadow: 0px 8px 57px 139px rgba(125, 125, 125, 0.25);'
      : ''
      "
  >
    <header-home
      :activeComponent="activeComponent"
      @changeComponent="changeComponent"
    />
    <div class="container__home">
      <div
        class="home__top"
        v-if="activeComponent == 'graph'"
      >
      <select v-model="$colorMode.preference" >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>

        <!-- <UiFormItem v-for="item in forms" :key="item.title" :componentChild="item.component" :name="item.title" :default-value="item.value"/> -->
         <UiFormItem
            class="form-anim"
            :componentUtils="UtilsFieldPicker"
            :componentChild="UiFormInput"
            label="Сайты или социальные сети проекта"
            name="socialLinks"
            tooltip="Прикрепите ссылку на сайт и социальные сети проекта или заявителя. Рекомендуем убедиться, что аккаунты являются общедоступными"
            :types="types"
            :preview="isPreview"
            :default-value="[{value:213}]"
            :limited-to="5"
         />
        <!-- <UtilsFieldPicker
          :component="UiFormInput"
          :componentChild="UiFormInput"
          label="Сайты или социальные сети проекта"
          name="socialLinks"
          tooltip="Прикрепите ссылку на сайт и социальные сети проекта или заявителя. Рекомендуем убедиться, что аккаунты являются общедоступными"
          :preview="false"
          :limited-to="5"
        /> -->

      <!-- <SchemaForm :schema="schema" /> -->
      <button class=" text-white" @click="addElements">11111111111</button>
      <div>

      </div>
        <div class="home__top-sorting">
          <button class="home__top-sorting__button">
            <p>{{ content?.date }}</p>
            <img
              src="@/assets/images/arrowSmallWhite.svg"
              alt="Стрелка"
            />
          </button>
          <div></div>
        </div>
        <h1 class="">{{ timeTitle }} {{ readTime }}! {{ time }}</h1>
        <button class="home__top-export">
          <img
            src="@/assets/images/export.svg"
            alt="Экспортировать"
          />
          <p>Export</p>
        </button>
      </div>
      <transition
        name="home_component"
        mode="out-in"
      >
        <component :is="activeComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SchemaForm, useSchemaForm } from "formvuelate";
markRaw(SchemaForm);

const { validationSchema } = useSchemaAuth()

const level = ref(0)

const { $gsap } = useNuxtApp();

const { setErrors } = useValidationForm({ validationSchema })

const UtilsFieldPicker = resolveComponent("UtilsFieldPicker");
const UiFormInput = resolveComponent("UiFormInput");
const UiFormItem = resolveComponent("UiFormItem");
const graph = resolveComponent('Graph')
const users = resolveComponent('Users')
const tasks = resolveComponent('Tasks')
// import graph from "~/components/Graph/Graph.vue";
// import users from "~/components/Users/Users.vue";
// import tasks from "~/components/Tasks/Tasks.vue";

const test = ref([])
const forms = ref([
  {
    component: UiFormInput,
    title: "profitFrom",
    value: 1,
  },
  {
    component: UiFormInput,
    title: "profitFrom1",
    value: 2,
  },
  {
    component: UiFormInput,
    title: "profitFrom2",
    value: 3,
  }
])

const schema = ref({
  'nested0': {
    component: SchemaForm,
    schema: validationSchema,
    defaultValue: 'levels'
  },
  'levelItem0': {
    component: UiFormItem,
    componentChild: UiFormInput,
    label: "Level item " + level.value,
    defaultValue: '2',
    name: "Level item " + level.value
  }
});

const addLevelElements = () => {
  const item = "levelItem" + level.value;

  schema.value[item] = {
    component: UiFormItem,
    componentChild: UiFormInput,
    label: "Level item " + level.value,
    defaultValue: '2',
    name: "Level item " + level.value
  };

  var nested = "nested" + level.value;

  if (level.value !== 5) {
    schema.value[nested] = {
      component: SchemaForm,
      schema: validationSchema,
    };
  }

  level.value++;

  // if (level <= levels) {
  //   addLevelElements(obj[nested].schema, levels);
  // }
};

const addElements = () => {
  const {value,title, ...rest} = forms.value[forms.value.length - 1];
  forms.value.push({...rest,title: title + forms.value.length,  value: value + 1});
}

type componentName = 'graph' | 'users' | 'tasks';

const components = {
  graph,
  users,
  tasks,
}

const {$api} = useNuxtApp()

const { open: openModalTasks } = useVModal({
	attrs: {
		id: "main-modal-tasks",
		component: tasks,
	}
});

const [onSubmit, pending] = usePendingState(async () => {
  try {
    const body = toFormData(validationSchema.cast(formData.value))

    // const { data } = await $api.forms.businessCost(body)
  // console.log(body)
    // emit("after-submit", data)
  } catch (e) {
    // console.log(e)

    // const error = e?.data ?? {}
    // const errors = error.errors ?? {}

    // setErrors(errors)
  }
})


// const modalStore = useModalStore();
const { data:content } = await useAsyncData('home-content', () => queryContent('/home/').findOne())

const modals = import.meta.glob("~/components/modal/*.vue");

// const getComponent = computed(() =>
//     modals[`/components/modal/${modalStore.componentNameState}.vue`]
//         ? defineAsyncComponent(
//               modals[`/components/modal/${modalStore.componentNameState}.vue`]
//           )
//         : null
// );

const { getLogin, login } = useStoreAuth();
const storeModal = useStoreData();
const colorMode = useColorMode();

const formData = ref({})

useSchemaForm(formData)

let activeComponent = ref<componentName>('graph');
const socket: object = {};
const connected: object = {};
let time: string = "";
const interval = null;
const getModal = computed(() => storeModal.getModal);
const readTime = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 7) return "ночи";
  if (hour >= 6 && hour < 12) return "утро";
  if (hour >= 12 && hour < 18) return "день";
  if (hour >= 18 && hour < 22) return "вечер";
})
const timeTitle = computed(() => {
  switch (readTime.value) {
    case "ночи":
      return "Доброй";
    case "утро":
      return "Доброе";
    case "день":
      return "Добрый";
    case "вечер":
      return "Добрый";
  }
})
const changeComponent = (name: componentName): void => {
  activeComponent.value = name;
}
onMounted(async () => {
  // openModalTasks()
  await nextTick();

  nextTick(() => {
          const tl = $gsap.timeline({
            // scrollTrigger: {
            //   trigger: ".content",
            //   start: "top top",
            //   end: `+=100`,
            //   scrub: 1,
            //   pin: true,
            // },
          });
          tl.add(animateHeader($gsap, tl));
        });

  // watch(
  //   width,
  //   () => {
  //     if (width.value > 768) {
  //       nextTick(() => {
  //         const tl = $gsap.timeline({
  //           scrollTrigger: {
  //             trigger: ".content",
  //             start: "top top",
  //             end: `+=18000`,
  //             scrub: 1,
  //             pin: true,
  //           },
  //         });
  //         tl.add(animateHeader($gsap, tl));
  //         tl.add(animateDrawing($gsap, tl));
  //         tl.add(animateModeling($gsap, tl));
  //         tl.add(animateRender($gsap, tl));
  //         tl.add(animateFinally($gsap, tl));
  //         tl.add(animateAngle($gsap, tl));
  //       });
  //     } else {
  //       nextTick(() => {
  //         const tl = $gsap.timeline({});
  //         tl.add(animateHeaderMobile($gsap, tl));
  //         tl.add(animateDrawingMobile($gsap, tl));
  //         tl.add(animateRenderMobile($gsap, tl));
  //         tl.add(animateModelingMobile($gsap, tl));
  //         tl.add(animateFinallyMobile($gsap, tl));
  //         tl.add(animateAngleMobile($gsap, tl));
  //       });
  //     }
  //   },
  //   { immediate: true }
  // );
})
// export default {
//   name: "PageIndex",
//   setup(props, ctx) {
//     // const { getLogin, login } = useStoreAuth();
//     // const storeModal = useStoreData();
//     // let activeComponent = ref<componentName>("graph");
//     // const socket: object = {};
//     // const connected: object = {};
//     // let time: string = "";
//     // const interval = null;
//     // const getModal = computed(() => storeModal.getModal);
//     // const readTime = computed(() => {
//     //   const hour = new Date().getHours();
//     //   if (hour >= 22 || hour < 7) return "ночи";
//     //   if (hour >= 6 && hour < 12) return "утро";
//     //   if (hour >= 12 && hour < 18) return "день";
//     //   if (hour >= 18 && hour < 22) return "вечер";
//     // })
//     // const timeTitle = computed(() => {
//     //   switch (readTime.value) {
//     //     case "ночи":
//     //       return "Доброй";
//     //     case "утро":
//     //       return "Доброе";
//     //     case "день":
//     //       return "Добрый";
//     //     case "вечер":
//     //       return "Добрый";
//     //   }
//     // })
//     // const changeComponent = (name: componentName): void => {
//     //   activeComponent.value = name;
//     // }

//     return {
//       activeComponent,
//       socket,
//       connected,
//       time,
//       interval,
//       getLogin,
//       getModal,
//       readTime,
//       timeTitle,
//       changeComponent
//     }
//   },
//   mounted() {
//     // this.socket = this.$nuxtSocket({
//     //   channel: "/",
//     // });
//     // /* Listen for events: */
//     // this.socket.on("connect", (msg, cb) => {
//     //   this.connected.value = this.socket.connected;
//     //   console.log("connected: " + this.connected)
//     //   /* Handle event */
//     // });
//     // this.socket.on("disconnect", () => {
//     //   this.connected.value = this.socket.connected;
//     //   console.log("disconnect: " + this.connected)
//     // });
//     // this.interval = setInterval(() => {
//     //   this.time = new Date().toLocaleTimeString("ru-RU");
//     //   console.log("time: " + this.time);
//     // }, 1000);
//   },
//   methods: {
//     // changeComponent(name: string): void {
//     //   this.activeComponent = name;
//     // },
//     // method1() {
//     //   /* Emit events */
//     //   this.socket.emit('method1', {
//     //     hello: 'world'
//     //   }, (resp) => {
//     //     /* Handle response, if any */
//     //   })
//     // }
//   },
//   // beforeUnmount() {
//   //   clearInterval(this.interval);
//   // },
//   components: {
//     graph,
//     users,
//     tasks,
//   },
// };
</script>
<style lang="scss" scoped>
.container__home {
  max-width: 90%;
  margin: 0 auto;
}

.home__top {
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  .home__top-export {
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: center;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 8px;
    margin-left: 127px;

    p {
      font-family: "Inter700";
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.75px;
      text-transform: uppercase;
      color: $text;
    }
  }

  &-sorting__button {
    cursor: pointer;
    display: flex;
    gap: 10px;
    align-items: center;
    background-color: transparent;
    border: 1px solid #ffffff;
    box-shadow: 2px 6px 15px 2px rgba(12, 10, 11, 0.8);
    border-radius: 8px;
    padding: 15px;

    p {
      font-size: 14px;
      letter-spacing: 0.005em;
      color: $text;
    }
  }

  h1 {
    font-family: "Inter600";
    font-size: 34px;
    text-align: center;
    letter-spacing: 0.25px;
    @apply text-white dark:text-green;
  }
}

.home_component-enter-active,
.home_component-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.home_component-enter,
.home_component-leave-to

/* .fade-leave-active до версии 2.1.8 */
  {
  opacity: 0;
}

// .home_component-enter-active {
//   animation: change-components .5s ease-in-out 0s;
// }
// .home_component-leave-active {
//   animation: change-components .5s ease-in-out 0s;
// }
// @keyframes change-components {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// }</style>
<template>
  <div class="card text-blackv relative w-full max-w-4xl rounded-2xl bg-white">
    <!-- Heading -->
    <Heading @onCancel="cancel">
      <Tabs :tabList="tabList" :activeTab="activeTab" @onChange="changeTab" />
    </Heading>

    <div
      class="mt-[-2px] min-h-[247px] border-y border-[rgba(0,0,0,0.1)] px-6 py-9"
    >
      <Transition name="fade" mode="out-in" appear :duration="500">
        <!-- Tab-1 -->
        <StepsMain v-if="activeTab === 0" key="0" />
        <!-- Tab-2 -->
        <StepsLocations v-if="activeTab === 1" key="1" />

        <!-- Tab-3 -->
        <StepsDocuments v-if="activeTab === 2" key="2" />

        <!-- Tab-4 -->
        <StepsRoles v-if="activeTab === 3" key="3" />

        <!-- Submited -->
        <div
          class="absolute inset-0 overflow-auto bg-white p-6"
          v-if="activeTab === 4"
          key="4"
        >
          <!-- <button
            class="rounded-xl bg-secondary py-2 px-4 text-white"
            @click="cancel"
          >
            Cancel
          </button> -->
          <div
            class="mt-7 inline-flex items-center gap-[10px] rounded-lg bg-[#F4F4FF]/50 py-[10px] px-3 text-sm font-medium text-grey-400/50"
          >
            <div><IconInfo /></div>
            <caption class="text-left">
              P.S.
              <br />1) При наявності API, та в продакшн моді дані сильно
              відрізняються. Кожне унікальне значення має свій id/slug, та дані
              очевидно не відправляються на сервер у вигляди масивів тайтлів)
              <br />
              2) В продакшн код ділиться на більшу кількість компонентів, з
              ціллю повторного використання. Так як в тестовому більшість
              компонентів використовується 1 раз, то необхідності в цьому немає.
              <br />

              3) Нормальна валідація форм відсутня. Бажання гратися з
              валідаторами в тестовому завданні також відсутнє)
              <br />
              4) Якщо в продакшн дуже багато таблиць/списків, то бажано пошвидше
              перейти на vue3. У vue2 проблеми з рендерингом великої кількості
              елементів, і юзерам смартфонів буде не дуже приємно користуватись
              додатком. У vue3 для таких випадків є додаткові оптимізаційні
              директиви. Також сильно покращена робота з пам'яттю(300-400
              відсотків.)
            </caption>
          </div>
          <div class="text-base text-secondary">
            <div
              v-for="(value, name) in formData"
              :key="name"
              class="mb-4 border-b pb-3"
            >
              <h5 class="mb-4 text-xl font-semibold uppercase">{{ name }}</h5>
              <pre>{{ value }}</pre>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-6 py-[22px]">
      <div>
        <Transition mode="in-out" tag="div">
          <div
            v-if="activeTab === 0"
            class="flex items-center gap-2 text-base font-medium text-secondary"
          >
            <FormSwitch
              v-model="store.allCompaniesIsActive"
              @input="store.selectAllCompanies"
            />
            Active in all companies
            <IconInfo />
          </div>
        </Transition>
      </div>
      <button
        @click="onNextStep"
        class="h-10 rounded-[20px] bg-secondary px-4 text-base font-semibold text-white transition-all hover:bg-opacity-80 active:scale-95"
      >
        {{ activeTab === 3 ? "Invite user" : "Next step" }}
      </button>
    </div>
    <Transition name="fade" mode="out-in" appear :duration="500"> </Transition>
  </div>
</template>

<script>
import {
  useMainStore,
  useDocumentsStore,
  useLocationsStore,
  useRolesStore,
} from "./store";

import {
  StepsMain,
  StepsDocuments,
  StepsLocations,
  StepsRoles,
  IconInfo,
  Tabs,
  Heading,
  FormSwitch,
} from "./components";

export default {
  components: {
    StepsMain,
    StepsDocuments,
    StepsLocations,
    StepsRoles,
    IconInfo,
    Tabs,
    Heading,
    FormSwitch,
  },
  data: () => ({
    tabList: [
      "Main Info",
      "Available Locations",
      "Available Documents Custom Fields",
      "Roles",
    ],
    activeTab: 0,

    formSubmited: false,
    formData: {},
  }),
  computed: {
    store() {
      return useMainStore();
    },
    storeLocations() {
      return useLocationsStore();
    },
    storeDocuments() {
      return useDocumentsStore();
    },
    storeRoles() {
      return useRolesStore();
    },
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
    },

    onNextStep() {
      if (this.activeTab < 3) {
        this.activeTab += 1;
      } else {
        this.activeTab = 4;
        this.submit();
      }
    },

    submit() {
      try {
        const {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          position,
          selectedCompanies,
        } = this.store;

        const { selectedLocations, mainLocation } = this.storeLocations;

        this.formData = {
          main: {
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            position,
            selectedCompanies,
          },
          locations: {
            selectedLocations,
            mainLocation,
          },
          documents: {
            documentFields: this.storeDocuments.documentFields,
          },
          roles: {
            ...this.storeRoles.precoro,
          },
        };
      } catch (e) {
        console.log(e);
      }
    },

    cancel() {
      alert("cancel");
    },
  },
};
</script>

<style lang="scss">
.card {
  box-shadow: 0px 8px 16px rgba(54, 62, 113, 0.24);
}

.fade-enter-active,
.fade-leave-active {
  & > * {
    transition-duration: 200ms;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.6, 0.15, 0.35, 0.8);
  }
}

$delay: 100ms;
$delayStep: 100ms;

.fade-enter,
.fade-leave-to {
  & > * {
    opacity: 0;
    transform: translateY(40px);
  }
}
.fade-enter-active {
  & > * {
    &:nth-child(2) {
      transition-delay: $delay;
    }
    &:nth-child(3) {
      transition-delay: $delay + $delayStep;
    }
  }
}
.fade-leave-active {
  & > * {
    &:nth-child(1) {
      transition-delay: $delay + $delayStep;
    }
    &:nth-child(2) {
      transition-delay: $delay;
    }
  }
}
</style>

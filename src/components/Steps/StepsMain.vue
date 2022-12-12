<template>
  <div class="grid w-full grid-cols-2 gap-5">
    <FormLabel text="First name">
      <FormInput
        v-model="store.firstName"
        @input="() => (store.firstNameTouched = true)"
        :error="store.validations.firstName"
      />
    </FormLabel>

    <FormLabel text="Last name">
      <FormInput
        v-model="store.lastName"
        @input="() => (store.lastNameTouched = true)"
        :error="store.validations.lastName"
      />
    </FormLabel>

    <FormLabel text="Email addres">
      <FormInput
        type="email"
        v-model="store.emailAddress"
        @input="() => (store.emailAddressTouched = true)"
        :error="store.validations.emailAddress"
      />
    </FormLabel>

    <FormLabel
      text="Phone number"
      v-mask="'+38 09# ### ## ##'"
    >
      <FormInput
        type="tel"
        v-model="store.phoneNumber"
        @input="() => (store.phoneNumberTouched = true)"
        :error="store.validations.phoneNumber"
      />
    </FormLabel>

    <FormLabel text="Position">
      <FormInput
        v-model="store.position"
        @input="() => (store.positionTouched = true)"
        :error="store.validations.position"
      />
    </FormLabel>

    <FormLabel text="Available companies">
      <FormDropdown>
        <template #head>
          <div class="flex w-full" id="steps-main-dropdown" ref="dropdown">
            <div
              v-for="(item, index) in list"
              :key="item"
              class="flex h-[26px] items-center whitespace-nowrap rounded bg-[#F4F4FF] pl-2 pt-1 pb-1 text-sm font-medium text-secondary [&:not(:last-child)]:mr-[10px]"
              :class="{
                'overflow-hidden': index === list.length - 1,
              }"
            >
              <div :class="{ truncate: index === list.length - 1 }">
                {{ item }}
              </div>
              <div
                @click.prevent="deleteCompany(item)"
                class="cursor-pointer p-2"
              >
                <IconCancel />
              </div>
            </div>
            <div
              v-show="diffLength > 0"
              class="h-[26px] items-center gap-2 rounded bg-[#F4F4FF] px-2 py-1 text-sm font-medium text-secondary"
            >
              +{{ diffLength }}
            </div>
          </div>
        </template>

        <div class="grid grid-cols-2 gap-2 p-3 text-xs text-secondary">
          <div
            v-for="(item, index) in store.availableCompanies"
            :key="item"
            class="flex items-center gap-1 py-1"
          >
            <FormCheckbox
              v-model="store.selectedCompanies"
              :nativeValue="item"
            />
            {{ item }}
          </div>
        </div>
      </FormDropdown>
    </FormLabel>
  </div>
</template>
<script>
import { useResizeObserver, useThrottleFn, computedAsync } from "@vueuse/core";
import { useMainStore } from "../../store";
import { calculateTextWidth } from "@/utils/calculateTextWidth";

import { FormInput, FormLabel, FormDropdown, FormCheckbox } from "../Form/";

import { IconCancel } from "../Icon";

export default {
  data: () => ({
    updatedList: [],

    dropdownSize: 0,
  }),
  components: { FormInput, FormLabel, FormDropdown, IconCancel, FormCheckbox },
  mounted() {
    useResizeObserver(
      this.$refs.dropdown,
      useThrottleFn((entries) => {
        this.dropdownSize = entries[0].contentRect.width;
      }, 125)
    );
  },
  computed: {
    store() {
      return useMainStore();
    },

    list() {
      const w = this.dropdownSize;
      let counter = 0;
      let idx = -1;
      const res = this.store.selectedCompanies.filter((el, index) => {
        if (!w) return true;
        const v = calculateTextWidth(el) + 34;
        counter += v;
        if (counter >= w - 120) {
          if (idx === -1) {
            idx = index;
          } else return false;
        }

        return true;
      });

      counter = 0;
      idx = -1;
      return res;
    },
    diffLength() {
      return this.store.selectedCompanies.length - this.list.length;
    },
  },
  watch: {
    "store.selectedCompanies"() {
      if (
        this.store.selectedCompanies.length !==
        this.store.availableCompanies.length
      )
        this.store.allCompaniesIsActive = false;
    },
  },
  methods: {
    deleteCompany(item) {
      this.store.selectedCompanies = this.store.selectedCompanies.filter(
        (el) => el !== item
      );
    },
  },
};
</script>

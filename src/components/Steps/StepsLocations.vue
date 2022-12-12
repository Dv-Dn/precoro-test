<template>
  <div class="space-y-[10px]">
    <Collapse
      title="Precoro"
      class="font-medium"
      :subtitle="(this.store.selectedLocations.length || 'Not') + ' selected'"
      type="heading"
      opened
    >
      <FormLabel text="Main Location" required class="max-w-[345px]">
        <FormDropdown close-on-click clickable-head>
          <template #head>{{ store.mainLocation }}</template>
          <ul>
            <li
              v-for="item in store.availableMainLocations"
              :key="item"
              class="cursor-pointer p-4"
              @click="onSetMainLocation(item)"
            >
              {{ item }}
            </li>
          </ul>
        </FormDropdown>
      </FormLabel>
      <div class="mb-4 mt-5 flex items-center gap-2">
        <FormCheckbox
          v-model="allLocationsSelected"
          @input="onSelectAllLocations"
        />
        Select All Locations
      </div>
      <div class="">
        <h5 class="mb-[10px] opacity-60">Available Locations</h5>
        <div class="grid grid-cols-2 gap-y-4 gap-x-14">
          <div
            v-for="item in store.availableLocations"
            :key="item"
            class="flex items-center gap-2"
          >
            <FormCheckbox
              v-model="store.selectedLocations"
              :native-value="item"
            />{{ item }}
          </div>
        </div>
      </div>
    </Collapse>
    <!-- <hr class="my-[7px] h-[1px] w-full rounded-[2px] bg-grey-200" /> -->

    <Collapse
      type="heading"
      title="Precoro Development"
      class="text-base font-medium text-secondary"
      subtitle="5 selected"
    >
      <div></div>
    </Collapse>
    <!-- <hr class="my-[7px] h-[1px] w-full rounded-[2px] bg-grey-200" /> -->
    <Collapse
      type="heading"
      title="Procurement"
      class="text-base font-medium text-secondary"
      subtitle="2 selected"
    >
      <div></div>
    </Collapse>
  </div>
</template>
<script>
import { useLocationsStore } from "../../store";
import Collapse from "../Collapse.vue";
import FormCheckbox from "../Form/FormCheckbox.vue";
import FormDropdown from "../Form/FormDropdown.vue";
import FormLabel from "../Form/FormLabel.vue";

export default {
  components: { FormCheckbox, FormDropdown, FormLabel, Collapse },
  data: () => ({
    allLocationsSelected: false,
  }),
  watch: {
    "store.selectedLocations"(v) {
      if (v.length !== this.store.availableLocations.length)
        this.allLocationsSelected = false;
      else this.allLocationsSelected = true;
    },
  },
  computed: {
    store() {
      return useLocationsStore();
    },
  },
  methods: {
    onSelectAllLocations() {
      this.store.selectedLocations = this.allLocationsSelected
        ? this.store.availableLocations
        : [];
    },
    onSetMainLocation(location) {
      this.store.mainLocation = location;
    },
  },
};
</script>

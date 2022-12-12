<template>
  <div class="flex gap-6">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      @click="$emit('onChange', index)"
      :class="[
        'text-base',
        'flex',
        'items-center',
        'pb-5',
        'border-b-2',
        'font-semibold',
        'transition-all',
        'duration-300',
        'ease-in',
        'cursor-pointer',
        index === activeTab ? 'text-primary' : 'text-black',
        index === activeTab ? 'border-primary' : 'border-transparent',

        index !== activeTab && 'text-opacity-50',
      ]"
    >
      <div
        v-if="activeTab > index"
        class="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary"
      >
        <IconCheck />
      </div>
      <div
        v-else
        class="relative mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full"
        :class="[
          index === activeTab && 'bg-primary',
          index === activeTab && 'bg-opacity-5',
        ]"
      >
        {{ index + 1 }}
      </div>
      <div>{{ item }}</div>
    </div>
  </div>
</template>
<script>
import { IconCheck } from "./Icon/";

export default {
  components: { IconCheck },
  props: {
    tabList: {
      default: [],
      type: Array,
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    classList() {
      return [];
    },
  },
};
</script>

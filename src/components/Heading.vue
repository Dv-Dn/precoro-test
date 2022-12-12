<template>
  <div class="px-6 pt-6">
    <div class="mb-[14px] flex items-center justify-between">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <button @click="$emit('onCancel')">
        <IconCancelRounded />
      </button>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { IconCancelRounded } from "./Icon";

export default {
  props: {
    title: {
      type: String,
      default: "Invite User",
    },
  },
  components: { IconCancelRounded },
};
</script>

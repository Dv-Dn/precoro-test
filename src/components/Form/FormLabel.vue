<template>
  <label class="text-xs font-semibold text-grey-100">
    <div class="mb-1">{{ text }} <span v-if="required" class="text-red-100">*</span></div>
    <div>
      <slot></slot>
    </div>
  </label>
</template>
<script>
export default {
  props: {
    text: {
      default: "",
      type: String,
    },
    required: Boolean,
  },
};
</script>

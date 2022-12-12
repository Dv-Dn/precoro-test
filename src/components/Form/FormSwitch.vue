<template>
  <div
    class="relative h-6 w-11 cursor-pointer rounded-full p-[2px] transition-colors hover:bg-opacity-90"
    :class="[!value ? 'bg-grey-200' : 'bg-primary', value && 'border-primary']"
    @click="onSwitch"
  >
    <div
      class="shadow-[0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)] h-5 w-5 rounded-full bg-white transition-transform"
      :class="{ 'translate-x-full': value }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onSwitch() {
      if (!this.disabled) this.$emit("input", !this.value);
    },
  },
};
</script>

<template>
  <div>
    <input
      :type="type"
      class="h-10 w-full rounded-lg border border-border-100 px-2 py-[9px] font-medium text-black outline-none focus:border-border-300"
      :class="{
        'border-red-100': error,
        'focus:border-red-100': error,
      }"
      type="text"
      @input="onInput"
      :value="value"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      default: "",
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    error: Boolean,
  },
  computed: {
    // computedValue() {
    //   if (this.type === "tel") return this.telMask(this.value);
    //   else return this.value;
    // },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target?.value);
    },
  },
};
</script>

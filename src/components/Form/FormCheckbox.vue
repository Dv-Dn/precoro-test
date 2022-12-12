<template>
  <label
    class="relative flex cursor-pointer items-center justify-center"
    ref="label"
    :disabled="disabled"
    @click="focus"
    @keydown.prevent.enter="$refs.label.click()"
  >
    <slot />
    <input
      v-model="computedValue"
      class="border-[rgba(29, 36, 82, 0.1)] peer h-[18px] w-[18px] appearance-none rounded border transition-colors checked:border-none checked:bg-primary"
      type="checkbox"
      ref="input"
      @click.stop
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="nativeValue"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <!-- <div
        class="absolute inset-0 border border- opacity-0 peer-checked:opacity-100 rounded"
      ></div> -->
    <div class="absolute opacity-0 transition-opacity peer-checked:opacity-100">
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.82918 7.73564C3.73372 7.83166 3.60349 7.88523 3.46821 7.88523C3.33292 7.88523 3.20269 7.83166 3.10723 7.73564L0.224383 4.85232C-0.0747942 4.55315 -0.0747942 4.06801 0.224383 3.7694L0.585358 3.40833C0.884628 3.10915 1.3692 3.10915 1.66838 3.40833L3.46821 5.20825L8.3316 0.344759C8.63087 0.0455824 9.11591 0.0455824 9.41462 0.344759L9.7756 0.705828C10.0748 1.005 10.0748 1.49004 9.7756 1.78875L3.82918 7.73564Z"
          fill="white"
        />
      </svg>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    value: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    disabled: Boolean,
    required: Boolean,
    name: String,
  },
  data() {
    return {
      newValue: this.value,
      isFocused: false,
    };
  },

  computed: {
    checked() {
      if (Array.isArray(this.newValue)) {
        return this.newValue.indexOf(this.nativeValue) >= 0;
      }
      return this.newValue === this.nativeValue;
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("input", value);
      },
    },
  },
  watch: {
    value(value) {
      this.newValue = value;
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

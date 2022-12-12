<template>
  <div
    ref="dropdown"
    class="relative h-10 w-full rounded-lg border border-border-100 py-[9px] pl-2 text-base font-medium text-secondary outline-none focus:border-border-300"
  >
    <div
      class="v-dropdown-activator flex h-full items-center justify-between"
      :class="{
        'cursor-pointer': clickableHead,
      }"
      @click.prevent="onHeadClick"
    >
      <div class="overflow-hidden">
        <slot name="head"></slot>
      </div>
      <div
        @click.prevent="toggle"
        class="flex cursor-pointer items-center justify-center p-3 transition-transform duration-300"
        :class="{
          'rotate-180': isOpened,
        }"
      >
        <IconDropdownArrow />
      </div>
    </div>

    <transition name="dropdown-fade">
      <div
        v-if="isOpened"
        key="v-dropdown"
        class="absolute top-11 left-0 right-0 z-10 max-h-80 min-h-[120px] overflow-auto rounded-lg border border-border-100 bg-white"
        @click="onBodyClick"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import { onClickOutside } from "@vueuse/core";
import IconDropdownArrow from "../Icon/IconDropdownArrow.vue";

export default {
  props: {
    clickableHead: Boolean,
    closeOnClick: Boolean,
  },
  data: () => ({
    isOpened: false,
  }),
  mounted() {
    onClickOutside(this.$refs.dropdown, this.close);
  },
  methods: {
    onHeadClick() {
      if (this.clickableHead) this.toggle();
    },
    onBodyClick() {
      if (this.closeOnClick) this.close();
    },
    close() {
      this.isOpened = false;
    },
    toggle() {
      this.isOpened = !this.isOpened;
    },
  },
  components: { IconDropdownArrow },
};
</script>
<style lang="scss">
.dropdown-fade {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0);
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease, transform 0.4s ease;
  }
}
</style>

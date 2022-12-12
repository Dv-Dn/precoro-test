<template>
  <!-- <div class="flex items-start justify-start"> -->
  <div class="group" :class="[...mainClasses[type]]">
    <div
      class="flex items-center text-secondary"
      :class="[
        ...headClasses[type],
        {
          'cursor-pointer': $slots.default,
        },
      ]"
    >
      <slot name="check"></slot>
      <div
        class="flex w-full items-center justify-between"
        :class="{
          'ml-2': $slots.check,
          'border-b': type === 'default' || border,
          'py-[6px]': type === 'default',
          'border-grey-200': type === 'default' || border,
          'group-last:border-0': type === 'default' && !border,
        }"
        @click.prevent="toggle"
      >
        <div>{{ title }}</div>

        <div
          class="flex items-center gap-4 text-base font-medium text-secondary"
          :class="{ 'text-opacity-40': type === 'heading' }"
        >
          <div v-if="type === 'heading'">
            {{ subtitle }}
          </div>

          <div
            class="flex items-center justify-center p-[6px] transition-all"
            :class="{
              'rotate-180': !isOpened,
              'text-primary': isOpened && type === 'default',
            }"
            v-if="$slots.default"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 7"
              fill="currentColor"
              class="rotate-180"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.06114 0.625404C1.69021 0.274525 1.10979 0.274525 0.738859 0.625403C0.337607 1.00497 0.337607 1.64368 0.738859 2.02324L5.4835 6.51142C5.77328 6.78554 6.22672 6.78554 6.5165 6.51142L11.2611 2.02324C11.6624 1.64368 11.6624 1.00497 11.2611 0.625404C10.8902 0.274525 10.3098 0.274525 9.93886 0.625404L6 4.35135L2.06114 0.625404Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <Transition name="collapse" mode="in-out">
      <div
        class="pt-2 text-secondary transition-all"
        :class="{
          'pl-[5px]': type === 'default',
          'pb-4': type === 'heading',
        }"
        v-if="isOpened"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    type: {
      type: String,
      default: "default",
      validator(v) {
        return ["default", "heading"].includes(v);
      },
    },
    opened: Boolean,
    border: Boolean,
    subtitle: {
      type: String,
      default: "",
    },
  },

  data: function () {
    return { isOpened: this.opened };
  },

  computed: {
    mainClasses() {
      return {
        default: [],
        heading: ["pb-[15px]", "border-b", "border-grey-200", "last:border-0"],
      };
    },

    headClasses() {
      return {
        default: ["text-sm", "font-medium"],
        heading: ["font-semibold", "text-lg"],
      };
    },

    bodyClasses() {
      return {
        default: ["text-sm", "font-medium"],
        heading: ["text-base", "font-medium"],
      };
    },
  },
  methods: {
    toggle() {
      if (this.$slots.default) this.isOpened = !this.isOpened;
    },
  },
};
</script>
<style>
.collapse-enter, .collapse-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  /* height: 0; */
  padding: 0;
}
</style>

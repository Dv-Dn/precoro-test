<template>
  <Collapse :title="node.name" class="mb-2 last:mb-0" border>
    <template #check
      ><FormCheckbox v-model="node.selected" @input="onInput(node)"
    /></template>

    <node
      v-if="hasChildren"
      v-for="child in node.children"
      :key="child.name"
      :node="child"
    ></node>
  </Collapse>
</template>

<script>
import Collapse from "../Collapse.vue";
import FormCheckbox from "../Form/FormCheckbox.vue";

export default {
  name: "node",
  props: {
    node: Object,
  },
  components: {
    Collapse,
    FormCheckbox,
  },
  computed: {
    hasChildren() {
      return this.node.children && this.node.children.length;
    },
  },
  methods: {
    onInput(node) {
      if (node.children && node.children.length) {
        node.children.forEach((ch) => {
          ch.selected = node.selected;
          this.onInput(ch);
        });
      }
    },
  },
};
</script>

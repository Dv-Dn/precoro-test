<template>
  <div class="space-y-[10px]">
    <Collapse title="Precoro" subtitle="5 selected" type="heading" opened>
      <div class="mb-4 mt-2 flex items-center gap-2 font-medium text-secondary">
        <FormCheckbox v-model="allFieldsSelected" @input="selectAll" /> All
        Document Custom Fields
      </div>
      <div class="my-2 font-medium text-secondary/60">
        Available Document Custom Fields
      </div>
      <div class="grid grid-cols-3 gap-12">
        <div v-for="item in store.documentFields" :key="item.name">
          <h5 class="text-lg font-semibold">
            {{ item.name }}
          </h5>
          <div class="my-4 flex items-center text-base font-medium">
            <FormCheckbox
              v-model="item.selected"
              @input="store.recursiveCheck(item)"
              class="mr-2"
            />Select All
          </div>
          <div class="text-sm font-medium">
            <StepsDocumentsTree
              :node="node"
              v-for="node in item.children"
              :key="node.name"
              class="removed-border"
            />
          </div>
        </div>
      </div>
    </Collapse>
    <Collapse title="Precoro Development" subtitle="5 selected" type="heading">
      <div></div>
    </Collapse>
    <Collapse title="Procurement" subtitle="2 selected" type="heading">
      <div></div>
    </Collapse>
  </div>
</template>

<script>
import { useDocumentsStore } from "../../store";
import Collapse from "../Collapse.vue";
import FormCheckbox from "../Form/FormCheckbox.vue";
import StepsDocumentsTree from "./StepsDocumentsTree.vue";

export default {
  components: { Collapse, FormCheckbox, StepsDocumentsTree },
  data: () => ({
    allFieldsSelected: false,
    store: useDocumentsStore(),
  }),
  watch: {
    "store.documentFields": {
      handler() {
        this.store.documentFields.forEach((el) => {
          this.checkChildren(el);

          el.selected = el.children.every((e) => e.selected);
        });
        this.allFieldsSelected = this.store.documentFields.every(
          (el) => el.selected
        );
      },
      deep: true,
    },
  },
  methods: {
    selectAll(v) {
      this.store.documentFields.forEach((el) => {
        el.selected = v;
        this.store.recursiveCheck(el);
      });
    },

    checkChildren(node) {
      if (!node.children || !node.children.length) return node.selected;
      return node.children.some((el) => (el.selected = this.checkChildren(el)));
    },
  },
};
</script>

<style lang="scss">
.removed-border {
  &:last-child div {
    border: 0;
  }
}
</style>

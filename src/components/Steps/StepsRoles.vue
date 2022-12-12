<template>
  <div class="space-y-[10px]">
    <Collapse title="Precoro" :subtitle="precoroHeadText" type="heading" opened>
      <div class="flex gap-8 pt-[10px]">
        <table class="table-spacing">
          <thead class="mb-2">
            <tr class="text-grey-300">
              <th scope="col" class="pr-2 text-start font-semibold">
                Access to:
              </th>
              <th
                scope="col"
                class="font-medium"
                v-for="rule in store.rules"
                :key="rule.slug"
              >
                {{ rule.name }}
              </th>
            </tr>
          </thead>
          <tbody class="font-medium text-secondary">
            <tr class="">
              <th scope="row" class="pr-2 text-start font-semibold">
                All bellow
              </th>
              <td v-for="rule in store.rules" :key="rule.slug">
                <FormCheckbox
                  v-model="allBellow"
                  :native-value="rule.slug"
                  @input="checkAll(rule.slug)"
                />
              </td>
            </tr>
            <tr v-for="role in store.precoro.access" :key="role.name">
              <th scope="row" class="pr-2 text-start font-medium">
                {{ role.name }}
              </th>
              <td
                v-for="rule in store.rules"
                :key="rule.slug"
                v-if="role[rule.slug] !== undefined"
              >
                <FormCheckbox v-model="role[rule.slug]" />
              </td>
              <td v-else>
                <div class="h-6"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="relative pl-8">
          <div class="absolute left-0 top-3 bottom-3 w-[1px] bg-grey-200"></div>
          <table class="table-spacing text-secondary">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="flex items-center gap-1 font-semibold text-grey-300"
                >
                  Management: <IconInfo />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="flex items-center gap-4 font-semibold">
                  <FormCheckbox
                    v-model="managmentAllBellow"
                    @input="checkManagmentAllBellow"
                  />All bellow
                </td>
              </tr>
              <tr
                v-for="item in store.precoro.managment.slice(0, -1)"
                :key="item.name"
              >
                <td class="flex items-center gap-4 font-medium">
                  <FormCheckbox v-model="item.selected" />{{ item.name }}
                </td>
              </tr>
              <tr>
                <td><div class="h-6"></div></td>
              </tr>
              <tr>
                <td class="flex items-center gap-4 font-medium">
                  <FormCheckbox
                    v-model="
                      store.precoro.managment[
                        store.precoro.managment.length - 1
                      ].selected
                    "
                  />Admin (Full access) <IconWarning />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="mt-7 inline-flex items-center gap-[10px] rounded-lg bg-[#F4F4FF]/50 py-[10px] px-3 text-sm font-medium text-grey-400/50"
      >
        <div><IconInfo /></div>
        <caption class="text-left">
          The user becomes a
          <a href="#" class="text-primary underline decoration-primary/50"
            >Power user</a
          >
          if at least ONE of the following roles is selected:<br />
          Approve, View only, Configuration, Suppliers and Items, Budgets,
          Warehouse manager.
        </caption>
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
import { Collapse, FormCheckbox, IconInfo, IconWarning } from "..";
import { useRolesStore } from "../../store";

export default {
  components: { Collapse, FormCheckbox, IconInfo, IconWarning },
  data: () => ({
    allBellow: [],
    managmentAllBellow: false,
  }),

  computed: {
    store() {
      return useRolesStore();
    },
    precoroHeadText() {
      let res = "";
      let c = 0;

      if (this.rulesCheckedLength.viewOnly > 0) {
        res += "View ";
        c++;
      }
      if (this.rulesCheckedLength.create > 0) {
        res += "Create ";
        c++;
      }
      if (this.rulesCheckedLength.approve > 0) {
        res += "Approve ";
        c++;
      }
      if (this.rulesCheckedLength.pay > 0) {
        res += "Pay ";
        c++;
      }
      if (c == 0) res = "Not selected";
      return c == 1 ? res + "Only" : res.trim().split(" ").join(", ");
    },

    rulesCheckedLength() {
      return this.store.rules.reduce((res, { slug }) => {
        res[slug] = this.store.precoro.access.filter((el) => el[slug]).length;
        return res;
      }, {});
    },
  },

  watch: {
    "store.precoro.access": {
      handler() {
        this.allBellow = this.store.rules.map(({ slug }) => {
          return this.store.precoro.access.every((el) => {
            if (el[slug] === undefined) return true;
            return el[slug];
          })
            ? slug
            : null;
        });
      },
      deep: true,
    },
    "store.precoro.managment": {
      handler() {
        this.managmentAllBellow = this.store.precoro.managment.every(
          (el) => el.selected
        );
      },
      deep: true,
    },
  },

  methods: {
    checkManagmentAllBellow(v) {
      this.store.precoro.managment.forEach((el) => {
        el.selected = v;
      });
    },
    checkAll(slug) {
      const ch = this.allBellow.indexOf(slug) !== -1;

      this.store.precoro.access.forEach((item) => {
        if (item[slug] === undefined) return;
        item[slug] = ch;
      });
    },
  },
};
</script>
<style lang="scss">
.table-spacing {
  th,
  td {
    &:not(:last-child),
    &:not(:first-child) {
      padding: 8px;
    }
    &:last-child {
      padding: 8px 0 8px 8px;
    }
    &:first-child {
      padding: 8px 8px 8px 0;
    }
  }
}
</style>

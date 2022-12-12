import { defineStore } from "pinia";

export const useDocumentsStore = defineStore("documents", {
  state: () => {
    return {
      documentFields: [
        {
          name: "Classes",
          selected: false,
          children: [
            {
              name: "Class 1",
              selected: false,
              children: [
                {
                  name: "Some Class 2",
                  selected: false,
                },
                {
                  name: "Some Class 3",
                  selected: false,
                },
              ],
            },
            {
              name: "Class 2",
              selected: false,
              children: [
                {
                  name: "Some Class 2",
                  selected: false,
                },
                {
                  name: "Some Class 3",
                  selected: false,
                },
              ],
            },
            {
              name: "Class 3",
              selected: false,
              children: [],
            },
          ],
        },

        {
          name: "Departaments",
          selected: false,
          children: [
            {
              name: "Developers",
              selected: false,
              children: [
                {
                  name: "2nd Sub-Developers",
                  selected: false,
                  children: [
                    {
                      name: "3nd Sub-Developers",
                      selected: false,
                      children: [
                        {
                          name: "iOS & Android Devs",
                          selected: false,
                        },
                        {
                          name: "4th Sub-Developers",
                          selected: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "Сlass 3",
              selected: false,
              children: [],
            },
            {
              name: "Сlass 4",
              selected: false,
              children: [],
            },
          ],
        },

        {
          name: "DCF 3",
          selected: false,
          children: [
            {
              name: "Class 1",
              selected: false,
              children: [
                {
                  name: "Some Class 2",
                  selected: false,
                },
                {
                  name: "Some Class 3",
                  selected: false,
                },
              ],
            },
            {
              name: "Class 2",
              selected: false,
              children: [
                {
                  name: "Some Class 2",
                  selected: false,
                },
                {
                  name: "Some Class 3",
                  selected: false,
                },
              ],
            },
            {
              name: "Сlass 3",
              selected: false,
              children: [],
            },
            {
              name: "Сlass 4",
              selected: false,
              children: [],
            },
          ],
        },
      ],
    };
  },
  actions: {
    recursiveCheck(node) {
      if (node.children && node.children.length) {
        node.children.forEach((ch) => {
          ch.selected = node.selected;
          this.recursiveCheck(ch);
        });
      }
    },
  },
});

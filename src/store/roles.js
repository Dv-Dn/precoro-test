import { defineStore } from "pinia";

export const useRolesStore = defineStore("roles", {
  state: () => {
    return {
      rules: [
        { name: "View only", slug: "viewOnly" },
        { name: "Create", slug: "create" },
        { name: "Approve", slug: "approve" },
        { name: "Pay", slug: "pay" },
      ],

      // [
      // precoro:{},
      // precoroDevelopment:{},
      // procurement:{}
      // ]
      precoro: {
        access: [
          {
            name: "Warehouse requests",
            viewOnly: false,
            create: false,
            approve: false,
          },
          {
            name: "Purchase request",
            viewOnly: false,
            create: false,
            approve: false,
          },
          {
            name: "Request for proposals",
            viewOnly: false,
            create: false,
            approve: false,
          },
          {
            name: "Purchase orders",
            viewOnly: false,
            create: false,
            approve: false,
          },
          {
            name: "Receipts",
            viewOnly: false,
            create: false,
            approve: false,
          },
          {
            name: "Invoices",
            viewOnly: false,
            create: false,
            approve: false,
            pay: false,
          },
          {
            name: "Expenses",
            viewOnly: false,
            create: false,
            approve: false,
            pay: false,
          },
        ],
        managment: [
          { name: "Configuration", selected: false },
          { name: "Suppliers and items", selected: false },
          { name: "Budgets", selected: false },
          { name: "Warehouse manager", selected: false },
          { name: "Reports", selected: false },
          { name: "Admin (Full access)", selected: false },
        ],
      },
    };
  },
});

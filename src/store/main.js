import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      position: "",

      firstNameTouched: false,
      lastNameTouched: false,
      emailAddressTouched: false,
      phoneNumberTouched: false,
      positionTouched: false,

      allCompaniesIsActive: false,
      selectedCompanies: ["Creaga", "Some text"],
      availableCompanies: [
        "Creaga",
        "Some text",
        "Precoro Development",
        "Some very loooooong company name",
      ],
    };
  },
  getters: {
    validations() {
      return {
        firstName: this.firstNameTouched && this.firstName.length < 4,
        lastName: this.lastNameTouched && this.lastName.length < 4,
        emailAddress:
          this.emailAddressTouched &&
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            this.emailAddress
          ),
        phoneNumber: false,
        // this.phoneNumberTouched &&
        // !/^\+?3?8?(0\d{9})$/.test(this.phoneNumber),
        position: this.positionTouched && this.position.length < 4,
      };
    },
  },
  actions: {
    selectAllCompanies(v) {
      this.selectedCompanies = v ? this.availableCompanies : [];
    },
  },
});

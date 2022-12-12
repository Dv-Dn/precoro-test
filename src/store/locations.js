import { defineStore } from "pinia";

export const useLocationsStore = defineStore("locations", () => ({
  mainLocation: "Main Precoro US",
  availableMainLocations: ["Main Precoro US", "Precoro UA"],
  allLocationsSelected: false,
  availableLocations: [
    "Berlin",
    "Venice Office",
    "USA Office",
    "Canada",
    "Poland Office",
    "Mexico",
    "Ukraine Kiyv Lukivska 7 Main Office",
  ],
  selectedLocations: [],
}));

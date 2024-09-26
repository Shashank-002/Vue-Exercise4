import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import the correct icon sets
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"; // Regular icon
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Solid icon

// Add the icons to the library
library.add(faPenToSquare);
library.add(faTrash);

// Create the Vue app
const app = createApp(App);

// Register the FontAwesomeIcon component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Mount the app
app.mount("#app");

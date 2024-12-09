import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import {faPlus} from "@fortawesome/free-solid-svg-icons";


library.add(faPenToSquare);
library.add(faTrash);
library.add(faPlus);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

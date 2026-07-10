import "@fontsource/material-icons";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "svelte-material-ui/themes/material.css";
import "../public/smui.css";

import { mount } from "svelte";
import { App } from "./slices/app/ui";

mount(App, { target: document.body });

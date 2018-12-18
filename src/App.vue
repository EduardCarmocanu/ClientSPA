<template>
	<div id="app">
		<app-loadingscreen/>
		<app-header/>
		<descriptions-box/>
		<google-maps/>
		<app-filter/>
	</div>
</template>

<script>
import "./assets/styles/stylesheet.scss";

import Header from "./components/Header/Header";
import GoogleMaps from "./components/GoogleMaps/GoogleMaps";
import Filter from "./components/Filter/Filter";
import DescriptionBox from "./components/DescriptionBox/DescriptionBox";
import Loadingscreen from "./components/Loadingscreen/Loadingscreen";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    "app-header": Header,
    "google-maps": GoogleMaps,
    "app-filter": Filter,
    "descriptions-box": DescriptionBox,
    "app-loadingscreen": Loadingscreen
  },
};
</script>
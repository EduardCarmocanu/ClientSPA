<template>
	<div id="app">
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

export default {
  name: "app",
  components: {
    "app-header": Header,
    "google-maps": GoogleMaps,
    "app-filter": Filter,
    "descriptions-box": DescriptionBox,
  },
};
</script>
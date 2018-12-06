import RequestFactory from "@/utils/RequestFactory";

class MarkerTypesStore {
	types = [];
 
	constructor () {
		RequestFactory.GET("markerTypes", "", (markerTypes) => {
			this.types = markerTypes;
		});
	}
}

export default new MarkerTypesStore();
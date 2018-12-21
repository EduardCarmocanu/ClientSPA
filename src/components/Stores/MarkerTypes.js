import RequestFactory from "@/utils/RequestFactory";

class MarkerTypesStore {
	types = [];
 
	constructor () {
		RequestFactory.GET("GetTypes", "", (markerTypes) => {
			this.types = markerTypes;
		});
	}
}

export default new MarkerTypesStore();
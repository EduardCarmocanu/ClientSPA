<template>
	<div>
		<div class="google-map" id="map-container" ref="map"></div>
	</div>
</template>

<script>
	import _MapConfig from './configs/map.config.js';
	import { EventBus } from './../../utils/event-bus.js'
	import RequestFactory from '@/utils/RequestFactory';
	import MarkerTypes from '@/components/Stores/MarkerTypes'

	export default {
		data () {
			return {
				map: {},
				markersStore: {},
				markerTypes: MarkerTypes,
				activeMarkerType: 1,
				bounds: {
					NE: new google.maps.LatLng(16.0, 26.0),
					SW: new google.maps.LatLng(-57.0, -77.0)
				}
			}
		},
		mounted () {
			this.map = new google.maps.Map(
				this.$refs.map,
				_MapConfig
			);
			this.map.addListener('bounds_changed', this.CheckBoundries)

			this.initializeMapOverlay();

			EventBus.$on('SetNewActiveMarkers', markerType => {
				this.SetNewActiveMarkers(markerType);
			})
			RequestFactory.GET("GetMarkers", "", this.initializeMarkers);
		},
		methods: {
			CheckBoundries() {
				var correctionBoundries = []

				if (this.map.getBounds().getNorthEast().lat() > this.bounds.NE.lat()) {
					correctionBoundries.push("N")
				}
				if (this.map.getBounds().getNorthEast().lng() > this.bounds.NE.lng()) {
					correctionBoundries.push("E")
				}
				if (this.map.getBounds().getSouthWest().lat() < this.bounds.SW.lat()) {
					correctionBoundries.push("S")
				}
				if (this.map.getBounds().getSouthWest().lng() < this.bounds.SW.lng()) {
					correctionBoundries.push("W")
				}
				
				this.CorrectBoundries(correctionBoundries)

			},
			CorrectBoundries (boundries) {
				if (boundries.length > 0) {
					var N = this.map.getBounds().getNorthEast().lat();
					var E = this.map.getBounds().getNorthEast().lng();
					var S = this.map.getBounds().getSouthWest().lat();
					var W = this.map.getBounds().getSouthWest().lng();

					boundries.forEach(boundry => {
						switch (boundry) {
							case 'N':
								N = this.bounds.NE.lat() - 0.1;
								break;
							case 'E':
								E = this.bounds.NE.lng() - 0.1;
								break;
							case 'S':
								S = this.bounds.SW.lat() + 0.1
								break;
							case 'W':
								W = this.bounds.SW.lng() + 0.1
								break;
							default:
								break;
						}
					})
					this.map.fitBounds(new google.maps.LatLngBounds(
						new google.maps.LatLng(N, W),
						new google.maps.LatLng(S, E)
					));
					this.map.setZoom(4);
				}
			},
			initializeMarkers (markersList) {
				markersList.forEach((marker) => {
					var markerInstance = new google.maps.Marker({
						position: new google.maps.LatLng(marker.lat, marker.lng),
						type: marker.markerTypeID,
						descriptionID: marker.description.id
					});
					markerInstance.addListener('click', () => {
						this.ShowMarkerDescription(markerInstance.descriptionID, markerInstance.type)
					});
					this.SetMarker(markerInstance);
				});
				this.SetNewActiveMarkers(this.activeMarkerType);
			},
			initializeMapOverlay() {
				var zooMap = new google.maps.ImageMapType({	
					getTileUrl: () => {
						return require('@/assets/img/map-overlay.png');
					},
					tileSize: new google.maps.Size(1173, 932),
					maxZoom: 4,
					minZoom: 4,
					name: 'zoo',
					bounds: {
						north: 55.814046,
						south: 55.803109,
						east: 9.364265,
						west: 9.340000,
					}
				});
				this.map.mapTypes.set('zoo', zooMap);
				this.map.setMapTypeId('zoo');	
			},
			SetMarker (marker) {
				if (this.markersStore.hasOwnProperty(marker.type)) {
					this.markersStore[marker.type].push(marker)
				}
				else {
					this.markersStore[marker.type] = [marker]
				}
			},
			SetActiveMarkers() {
				if (this.markersStore[this.activeMarkerType] !== undefined) {
					this.markersStore[this.activeMarkerType].forEach( marker => {
						marker.setMap(this.map);
					})
				}
			},
			UnsetActiveMarkers() {
				if (this.markersStore[this.activeMarkerType] !== undefined) {
					this.markersStore[this.activeMarkerType].forEach(marker => {
						marker.setMap(null);
					})
				}
			},
			SetNewActiveMarkers(markerType) {
				this.UnsetActiveMarkers();
				this.activeMarkerType = markerType;
				this.SetActiveMarkers();
			},
			ShowMarkerDescription(descriptionID, markerType) {
				EventBus.$emit('ShowDescription', descriptionID, markerType);
			}
		}
	};
</script>

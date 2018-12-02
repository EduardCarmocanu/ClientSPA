<template>
	<div>
		<div class="google-map" id="map-container" ref="map"></div>
	</div>
</template>

<script>
	import FetchMarkers from './../../utils/FetchMarkers.js';
	import _MapConfig from './configs/map.config.js';
	import { EventBus } from './../../utils/event-bus.js'


	export default {
		data () {
			return {
				map: {},
				markersStore: {},
				activeMarkerType: 'Animal',
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
			this.initializeMarkers()

			var zooMap = new google.maps.ImageMapType({	
				getTileUrl: () => {
					return require('@/assets/img/map-overlay.png');
				},
				tileSize: new google.maps.Size(1173, 932),
				maxZoom: 4,
				minZoom: 4,
				name: 'zoo'
			});
			this.map.mapTypes.set('zoo', zooMap);
			this.map.setMapTypeId('zoo');	

			EventBus.$on('SetNewActiveMarkers', markerType => {
				this.SetNewActiveMarkers(markerType);
			})
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
				}
			},
			initializeMarkers () {
				FetchMarkers().forEach((Marker) => {
					var markerInstance = new google.maps.Marker({
						position: new google.maps.LatLng(Marker.Lat, Marker.Lng),
						title: Marker.Title,
						_type: Marker.Type,
						_expireDate: Marker.ExpireDate,
						_descriptionId: Marker.DescriptionId
					})

					markerInstance.addListener('click', () => {
						this.ShowMarkerDescription(markerInstance._descriptionId)
					});
					
					this.SetMarker(markerInstance);
				});
				this.SetNewActiveMarkers(this.activeMarkerType);
			},
			SetMarker (marker) {
				if (this.markersStore.hasOwnProperty(marker._type)) {
					this.markersStore[marker._type].push(marker)
				}
				else {
					this.markersStore[marker._type] = [marker]
				}
			},
			SetActiveMarkers() {
				this.markersStore[this.activeMarkerType].forEach( marker => {
					marker.setMap(this.map);
				})
			},
			UnsetActiveMarkers() {
				this.markersStore[this.activeMarkerType].forEach( marker => {
					marker.setMap(null);
				})
			},
			SetNewActiveMarkers(markerType) {
				this.UnsetActiveMarkers();
				this.activeMarkerType = markerType;
				this.SetActiveMarkers();
			},
			ShowMarkerDescription(_descriptionId) {
				EventBus.$emit('ShowDescription', _descriptionId);
			}
		}
	};
</script>

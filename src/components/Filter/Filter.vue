<template>
	<div>
		<div class="filter">
			<div id="left-control" v-on:click="scrollLeft">
				<img src="https://img.icons8.com/ios-glyphs/30/000000/back.png" class="control-image">
			</div>
			<ul v-if="markerTypes.types.length > 0" id="user-nav-list">
				<li 
					class="type-filter"
					v-for="type in markerTypes.types" 
					:key="type.id" 
					@click="EmitNewActiveMarkerType(type.id)"
					:class="type.id === activeMarkerType ? 'type-filter--active' : null"
					:id="type.id"
				>
					<img :src="require('@/assets/img/icons/types/' + type.name + '.png')" :alt="type.name">
				</li>
			</ul>
			<div id="right-control" v-on:click="scrollRight">
				<img src="https://img.icons8.com/ios-glyphs/30/000000/forward.png" class="control-image">
			</div>
		</div>
	</div>
</template>

<script>
import { EventBus } from '@/utils/event-bus.js'
import RequestFactory from '@/utils/RequestFactory'
import MarkerTypes from '@/components/Stores/MarkerTypes'

export default {
	data () {
		return {
			markerTypes: MarkerTypes,
			activeMarkerType: 1,
		}
	},
	methods: {
		EmitNewActiveMarkerType (markerType) {
			this.activeMarkerType = markerType;
			EventBus.$emit('SetNewActiveMarkers', markerType);
		},
		scrollRight() {
			let right = document.getElementById('user-nav-list').lastChild;
			right.scrollIntoView();

		},
		scrollLeft() {
			let left = document.getElementById('user-nav-list').firstChild;
			left.scrollIntoView();
		}
	}
}
</script>


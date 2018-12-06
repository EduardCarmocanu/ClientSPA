<template>
	<div class="filter">
		<ul v-if="markerTypes.types.length > 0">
			<li 
				class="type-filter"
				v-for="type in markerTypes.types" 
				:key="type.id" 
				@click="EmitNewActiveMarkerType(type.id)"
				:class="type === activeMarkerType ? 'type-filter--active' : null"
			>
				<img :src="require('@/assets/img/icons/types/' + type.name + '.png')" :alt="type.name">
			</li>
		</ul>
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
			activeMarkerType: 1
		}
	},
	methods: {
		EmitNewActiveMarkerType (markerType) {
			this.activeMarkerType = markerType;
			EventBus.$emit('SetNewActiveMarkers', markerType);
		}
	}
}
</script>


<template>
	<div class="filter">
		<ul>
			<li 
				class="type-filter"
				v-for="markerType in markerTypes" 
				:key="markerType" 
				@click="EmitNewActiveMarkerType(markerType)"
				:class="markerType === activeMarkerType ? 'type-filter--active' : null"
			>
				<img :src="require('@/assets/img/icons/types/' + markerType + '.png')" :alt="markerType">
			</li>
		</ul>
	</div>
</template>

<script>
import { EventBus } from '@/utils/event-bus.js'

export default {
	data () {
		return {
			markerTypes: [
				'Playground',
				'Shop',
				'Animal',
				'Accommodation',
			],
			activeMarkerType: 'Animal'
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


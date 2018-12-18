<template>
	<div>
		<div class="filter" :class="firstTimeUser ? 'filter--first-time' : null">
			<p class="filter__instructions" :class="!firstTimeUser ? 'filter__instructions--hide' : null">Use finger to scroll filters</p>
			<ul ref="filtersList">
				<template v-if="markerTypes.types.length > 0">
					<li 
						class="type-filter"
						v-for="type in markerTypes.types" 
						:key="type.id" 
						@click="EmitNewActiveMarkerType(type.id)"
						:class="type.id === activeMarkerType ? 'type-filter--active' : null"
					>
						<img :src="require('@/assets/img/icons/types/' + type.name + '.png')" :alt="type.name">
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
import { EventBus } from '@/utils/event-bus.js'
import MarkerTypes from '@/components/Stores/MarkerTypes'

export default {
	data () {
		return {
			markerTypes: MarkerTypes,
			activeMarkerType: 1,
			firstTimeUser: true
		}
	},
	mounted () {
		setTimeout(() => {
			this.firstTimeUser = false;
		}, 5000);
	},
	methods: {
		EmitNewActiveMarkerType (markerType) {
			this.activeMarkerType = markerType;
			EventBus.$emit('SetNewActiveMarkers', markerType);
		}
	}
}
</script>


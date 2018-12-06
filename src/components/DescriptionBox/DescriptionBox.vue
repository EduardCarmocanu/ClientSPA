<template>
	<div 
		class="description-box" 
		:class="showDescriptionBox ? 'description-box--active' : null" 
		ref="descriptionBox" 
		@click.self="CloseDescription"
	>
		<div class="description-box__content">
			<div class="cover">
				<img src="@/assets/img/icons/close.png" alt="close" class="close" @click="CloseDescription">
			</div>
			<div class="body">
				<template v-if="description !== null">
					<img 
						:src="require('@/assets/img/icons/types/' 
							+ markerTypes.types[descriptionType - 1].name 
							+ '.png')" 
						:alt="markerTypes.types[descriptionType - 1].name"
						class="type"
					>
					<h1 class="title">
						{{ description.title }}
					</h1>
					<h5 class="placement">
						{{ description.location }}
					</h5>
					<div v-html="description.body" class="description-container"></div>	
				</template>
			</div>
		</div>
		<div class="bottom-close-button" @click="CloseDescription">
			<img src="@/assets/img/icons/close.png" alt="close">
		</div>
	</div>
</template>
<script>
	import { EventBus } from '@/utils/event-bus.js';
	import RequestFactory from '@/utils/RequestFactory';
	import MarkerTypes from '@/components/Stores/MarkerTypes'

	export default {
		data() {
			return {
				markerTypes: MarkerTypes,
				showDescriptionBox: false,
				descriptionType: null,
				description: null,
			}
		},
		mounted() {
			EventBus.$on('ShowDescription', (descriptionID, type) => {
				console.log(MarkerTypes)
				this.descriptionType = type;
				this.ShowDescription(descriptionID);
			})
		},
		methods: {
			ShowDescription(descriptionID) {
				RequestFactory.GET("descriptions", descriptionID, (description) => {
					this.showDescriptionBox = true;
					this.description = description;					
				})
				this.$refs.descriptionBox.style.zIndex = 101;
			},
			CloseDescription() {
				this.showDescriptionBox = false;
				setTimeout(() => {
					this.$refs.descriptionBox.style.zIndex = -1;
					this.description = null;
					this.descriptionType = null
				}, 300);
			}
		}
	}
</script>

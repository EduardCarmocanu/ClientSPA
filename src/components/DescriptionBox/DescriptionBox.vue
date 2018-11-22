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
				<template v-if="descriptions.length > 0">
					<img 
						:src="require('@/assets/img/icons/types/' 
							+ descriptions[activeDescriptionId].DescriptionType 
							+ '.png')" 
						:alt="descriptions[activeDescriptionId].DescriptionType"
						class="type"
					>
					<h1 class="title">
						{{ descriptions[activeDescriptionId].Title }}
					</h1>
					<h5 class="placement">
						{{ descriptions[activeDescriptionId].Location }}
					</h5>
					<div v-html="descriptions[activeDescriptionId].Body" class="description-container"></div>	
				</template>
			</div>
		</div>
		<div class="bottom-close-button" @click="CloseDescription">
			<img src="@/assets/img/icons/close.png" alt="close">
		</div>
	</div>
</template>
<script>
	import { EventBus } from '@/utils/event-bus.js'
	import FetchDescriptions from '@/utils/FetchDescriptions.js';

	export default {
		data() {
			return {
				showDescriptionBox: false,
				activeDescriptionId: 0,
				descriptions: []
			}
		},
		mounted() {
			this.descriptions = FetchDescriptions();

			EventBus.$on('ShowDescription', _descriptionId => {
				this.ShowDescription(_descriptionId)
			})
		},
		methods: {
			ShowDescription(_descriptionId) {
				this.showDescriptionBox = true;
				this.activeDescriptionId = _descriptionId - 1
				this.$refs.descriptionBox.style.zIndex = 101
			},
			CloseDescription() {
				this.showDescriptionBox = false
				setTimeout(() => {
					this.$refs.descriptionBox.style.zIndex = -1
				}, 300);
			}
		}
	}
</script>

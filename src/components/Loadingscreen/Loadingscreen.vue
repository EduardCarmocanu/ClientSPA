<template>
	<div class="loadscreen-container" :class="!showLoadingScreen ? 'loadscreen-container--hide' : null">
        <div class="loadbox">
            <div class="loadscreen-box">
                <img src="src/assets/img/icons/logo@2x.png" class="load-image">
            </div>
            <div class="icon-box">
                <img src="src/assets/img/icons/temploadlogo.png" class="icon-image">
            </div>
            <div class="loadscreen-footer">
                <p>Powered by givskud</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            showLoadingScreen: false
        }
    },
    methods: {
        hidePage() {
            this.showLoadingScreen = !this.showLoadingScreen;
        }
    }
    
}
</script>
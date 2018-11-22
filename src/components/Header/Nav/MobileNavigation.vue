<template>
	<div class="mobile-nav-wrapper">
		<div class="mobile-nav__open" @click="menuOpen = true">
			<img src="@/assets/img/icons/burger.png" alt="open menu">
		</div>
		<div class="mobile-nav" :class="menuOpen ? 'mobile-nav--open' : null">
			<div class="mobile-nav__header">
				<div class="close" @click="menuOpen = false">
					<img src="@/assets/img/icons/close.png" alt="close navbar">
				</div>
				<div class="cover">
					<img src="@/assets/img/icons/logo.png" alt="Givskud zoo logo">
				</div>
			</div>
			<div class="mobile-nav__body">
				<div class="links">
					<ul>
						<li>
							<h3>Link</h3>
						</li>
						<li>
							<h3>Link</h3>
						</li>
						<li>
							<h3>Link</h3>
						</li>
						<li>
							<h3>Link</h3>
						</li>
					</ul>
				</div>
				<div class="social-media">
					<img src="@/assets/img/icons/facebook.png" alt="facebook">
					<img src="@/assets/img/icons/instagram.png" alt="instagram">
					<img src="@/assets/img/icons/tripadvisor.png" alt="tripadvisor">
				</div>
				<div class="copyright">
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos libero beatae dicta eveniet ipsa veritati</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			menuOpen: false
		}
	}
}
</script>

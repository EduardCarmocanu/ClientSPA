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
				<div class="mobile-nav_footer">
					<div class="links">
						<ul>
							<li>
								<a href="www.givskudzoo.dk" target="blank"><h3>Givskud on the web</h3></a>
							</li>
							<li>
								<a href="#"><h3>About us</h3></a>
							</li>
							<li>
								<a href="#"><h3>Link</h3></a>
							</li>
						</ul>
					</div>
					<div class="social-media">
						<a href="#"><img src="@/assets/img/icons/facebook.png" alt="facebook"></a>
						<a href="#"><img src="@/assets/img/icons/instagram.png" alt="instagram"></a>
						<a href="#"><img src="@/assets/img/icons/tripadvisor.png" alt="tripadvisor"></a>
					</div>
					<div class="copyright">
						<p>@copyright 2018 Givskud Zoo  -  ZOOTOPIA. All rights reserved.</p>
					</div>
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

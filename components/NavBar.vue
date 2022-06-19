<i18n>
{
  "fr": {
    "husband": "Zakaria",
    "wife": "Jihane"
  },
  "ar": {
    "husband": "زكرياء",
    "wife": "جيهان"
  }
}
</i18n>
<template>
	<div class="header">
		{{ $t('husband') }} <font-awesome-icon :icon="['fas', 'heart']" class='heart'/> {{ $t('wife') }} 
	</div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'NavBar',

//   mounted: function(){
//   	// if ($(window).width() < 1024 ) {
//   	// 	$('#nav-l').remove()
//   	// }
//   }
}
</script>

<style lang="scss" scoped>
  	$colorprimary : #ef5974;
  	$background : #ef5974;
	@import url('https://fonts.googleapis.com/css?family=Niconne');

    .header {
		position: fixed;
		top: 0px;
		width: 100vw;
		background:$background;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-family: 'Niconne', cursive ;
		line-height:52px;
		font-size: 35px;
		height:80px;
		z-index: 1;
		.heart{
			padding: 15px;
			width: 60px;
    		height: 45px;
		}
	}
</style>
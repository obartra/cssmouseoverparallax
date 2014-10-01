<!DOCTYPE html>
<!--[if lt IE 9]>
	<meta http-equiv="refresh" content="0;url=/old" />
<![endif]-->
<html class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>CSS Parallax</title>
		<meta name="description" content="CSS-only mouseover parallax demo. Using a grid of divs and css transitions we simulate mouseover parallax without JavaScript">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?
			if (isset($build)){
		?>
			<style> <?include "/css/main.css" ?></style>
			<script async src="/js/main.min.js"></script>
		<?
			}else{
		?>
			<script src="/vendor/requirejs/require.js"></script>
			<link rel="stylesheet" href="css/main.css">
			<script src="/js/main.js"></script>
			<script src="/vendor/modernizr/modernizr.js"></script>
		<?
			}
		?>
		<style>
			[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak],
			.ng-cloak, .x-ng-cloak,
			.ng-hide {
				display: none !important;
			}
		</style>
	</head>
	<body ng-class="{hidepopup: !showOptions}">
		<? include 'templates/errors.html' ?>
		<? include 'templates/loading.html' ?>
		<header>
			<? include 'templates/header.html' ?>
		</header>
		<section class="popup" ng-cloak>
			<? include 'templates/options.html' ?>
		</section>
		<ng-view></ng-view>

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-26122145-5', 'auto');
			ga('send', 'pageview');
		</script>
	</body>
</html>

<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();

	//uiテスト用ダミー
	let publicPageUrl = '/dummy_profile/';
	let accountDisplayName = 'テスト';
	let accountAvatarUrl = 'https://pic.atserver186.jp/img/atserver/test/-444zh0.jpg';
</script>

<svelte:head
	><link rel="stylesheet" href="https://cdn.atserver186.jp/libs/fontawesome/css/all.min.css" /><link
		rel="icon"
		href={favicon}
	/></svelte:head
>

{@render children()}

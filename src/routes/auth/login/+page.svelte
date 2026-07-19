<script>
	const { data } = $props();

	import { onMount } from 'svelte';

	let pageTitle = 'ログイン';
</script>

<svelte:head>
	<title>{pageTitle} | {data.serviceName}</title>
	<meta property="og:title" content="{data.accountDisplayName} | {data.serviceName}" />
</svelte:head>

<p>ログイン</p>
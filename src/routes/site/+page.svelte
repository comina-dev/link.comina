<script>
	const { data } = $props();

	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>{data.serviceName}</title>
	<meta property="og:title" content="{data.serviceName}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<p>test</p>
</main>
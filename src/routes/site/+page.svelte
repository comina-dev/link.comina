<script>
	const { data } = $props();

	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>{data.serviceName}</title>
	<meta property="og:title" content={data.serviceName} />
</svelte:head>

<main>
	<section class="min-h-screen bg-amber-200">
		<p>test</p>
	</section>
	<section class="my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2">
		<p>サービス紹介/qa</p>
	</section>
	<section class="my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2">
		<p>お知らせ</p>
	</section>
	<section class="my-10 w-full bg-gray-200 mx-auto p-2">
		<p>登録ユーザ表示</p>
		<p>横流し→/←</p>
	</section>
	<section class="my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2">
		<p>登録して始める的な</p>
	</section>
</main>

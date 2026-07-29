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
		<p>登録して始める的なもの</p>
		<form class="flex justify-between items-center overflow-hidden rounded-4xl w-[70%] mx-auto" action="/login/" method="GET">
			<input
				class="w-full h-12 px-3 py-3.75 border-none box-border text-[1em] outline-0"
				type="text"
				id="searchTerm"
				name="search"
				placeholder="{data.serviceDomainDisp}/あなたの名前"
			/>
			<button class="flex justify-center items-center w-25 h-12 border-0 bg-amber-200 cursor-pointer" type="submit" title="検索する"
				><i class="fas fa-search"></i></button
			>
		</form>
	</section>
</main>

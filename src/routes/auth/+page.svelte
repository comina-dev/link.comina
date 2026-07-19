<script>
	const { data } = $props();

	import { onMount } from 'svelte';

	let pageTitle = 'ようこそ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.serviceName}</title>
	<meta property="og:title" content="{data.accountDisplayName} | {data.serviceName}" />
</svelte:head>

<main>
	<section class="grid grid-cols-2 min-h-screen">
		<div class="my-auto ml-auto mr-50">
			<a href="/" class="flex shrink-0 whitespace-nowrap transition w-fit" title="ホーム">
				<img src={data.serviceIconUrlShort} alt="ATSERVER Logo" class="h-10" />
				<p class="text-(--main-text-color) m-auto ml-2 font-bold text-2xl">{data.serviceName}</p>
			</a>
		</div>
		<div class="flex flex-col p-8 w-[50%] my-auto mr-auto ml-50">
			<a
				href="/auth/login"
				class="bg-(--emphasis-text-color) p-4 text-center rounded-4xl mb-5 text-xl transition-all hover:bg-(--sub-hover-color)"
				style="border: 0.5px solid var(--small-text-color);">ログイン</a
			>
			<a
				href="/auth/register"
				class="bg-(--emphasis-text-color) p-4 text-center rounded-4xl mb-5 text-xl transition-all hover:bg-(--sub-hover-color)"
				style="border: 0.5px solid var(--small-text-color);">新規登録</a
			>
			<a
				href="/"
				class="bg-(--emphasis-text-color) p-4 text-center rounded-4xl text-xl transition-all hover:bg-(--sub-hover-color)"
				style="border: 0.5px solid var(--small-text-color);"
				><i class="fa-brands fa-google mr-1.5"></i>Googleで続ける</a
			>
			<hr class="m-hr" />
			<div class="flex gap-2 mx-auto">
				<a href="/app/help/terms" class="text-xs">利用規約</a>
				<a href="/app/help/privacy" class="text-xs">プライバシーポリシー</a>
				<a href="/app/help/cookie" class="text-xs">クッキーポリシー</a>
			</div>
		</div>
	</section>
</main>

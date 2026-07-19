<script>
	const { data } = $props();

	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>{data.accountDisplayName} | {data.serviceName}</title>
	<meta property="og:title" content="{data.accountDisplayName} | {data.serviceName}" />
</svelte:head>

<main>
	<section class="grid grid-cols-2 min-h-screen">
		<div class="my-auto ml-auto mr-50">
			<div class="flex shrink-0 whitespace-nowrap transition w-fit">
				<img src={data.serviceIconUrlShort} alt="ATSERVER Logo" class="h-10" />
				<p class="text-(--main-text-color) m-auto ml-2 font-bold text-2xl">{data.serviceName}</p>
			</div>
		</div>
		<div class="flex flex-col p-8 w-[50%] my-auto mr-auto ml-50">
			<a
				href="/app/auth/login"
				class="bg-(--emphasis-text-color) p-4 text-center rounded-4xl mb-5 text-xl">ログイン</a
			>
			<a
				href="/app/auth/register"
				class="bg-(--emphasis-text-color) p-4 text-center rounded-4xl mb-5 text-xl">新規登録</a
			>
			<a href="/" class="bg-(--emphasis-text-color) p-4 text-center rounded-4xl text-xl"
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

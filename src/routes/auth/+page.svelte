<script>
	const { data } = $props();

	import { onMount } from 'svelte';

	let pageTitle = 'ようこそ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.serviceName}</title>
	<meta property="og:title" content="{data.accountDisplayName} | {data.serviceName}" />
</svelte:head>

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
<div class="flex gap-2 mx-auto mt-4">
	<a href="/app/help/terms" class="text-xs">利用規約</a>
	<a href="/app/help/privacy" class="text-xs">プライバシーポリシー</a>
	<a href="/app/help/cookie" class="text-xs">クッキーポリシー</a>
</div>

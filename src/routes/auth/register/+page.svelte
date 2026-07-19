<script>
	const { data } = $props();

	import { onMount } from 'svelte';

	let pageTitle = '新規登録';
</script>

<svelte:head>
	<title>{pageTitle} | {data.serviceName}</title>
	<meta property="og:title" content="{data.accountDisplayName} | {data.serviceName}" />
</svelte:head>

<div class="flex mb-4">
	<a
		href="/auth"
		class="mr-auto bg-(--emphasis-text-color) py-2 px-4 rounded-4xl transition-all hover:bg-(--sub-hover-color)"
		style="border: 0.5px solid var(--small-text-color);" title="戻る"
	>
		<i class="fa-solid fa-arrow-left"></i>
	</a>
</div>
<label class="mb-4">
	<div class="mb-1 flex items-end justify-between">
		<span class="text-xl">メールアドレス</span>
		<span class="text-lg font-normal text-gray-500">(例: &nbsp;hogehoge@example.com)</span>
	</div>
	<input type="text" class="w-full rounded-3xl outline-none appearance-none" />
</label>
<label class="mb-4">
	<div class="mb-1 flex items-end justify-between">
		<span class="text-xl">パスワード</span>
	</div>
	<input type="text" class="w-full rounded-3xl outline-none appearance-none" />
</label>
<label>
	<div class="mb-1 flex items-end justify-between">
		<span class="text-xl">パスワード(確認)</span>
	</div>
	<input type="text" class="w-full rounded-3xl outline-none appearance-none" />
</label>
<div class="my-4">
	<input type="checkbox" class="mr-2 cursor-pointer" />
	<a href="/app/help/terms" class="appearance-none underline outline-none"> 利用規約 </a>/<a
		href="/app/help/privacy"
		class="appearance-none underline outline-none"
	>
		プライバシーポリシー
	</a>
	に同意する
</div>
<div class="flex">
	<a
		href="/"
		class="ml-auto bg-(--emphasis-text-color) py-2 px-4 rounded-4xl transition-all hover:bg-(--sub-hover-color)"
		style="border: 0.5px solid var(--small-text-color);"
	>
		続ける<i class="fa-solid fa-arrow-right ml-1"></i>
	</a>
</div>

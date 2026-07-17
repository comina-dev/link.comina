<script lang="ts">
	import '../layout.css';
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

<main class="min-h-screen">
	<div class="main-grid">
		<aside
			class="min-h-screen bg-white p-4"
			style="border-right: 0.5px solid var(--small-text-color);"
		>
			<div class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer">
				<a href="/app/home" class="flex shrink-0 whitespace-nowrap transition w-fit">
					<img
						src="https://cdn.atserver186.jp/img/material/ats-logo.webp"
						alt="ATSERVER Logo"
						class="h-10"
					/>
					<p class="text-(--main-text-color) m-auto ml-2 font-bold">Comina Link</p></a
				>
			</div>
			<ul>
				<hr class="m-hr" />
				<li
					class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
				>
					<a href="/app/home"
						><i class="fa-solid fa-house mr-1 text-bace"></i>ホーム</a
					>
				</li>
				<li
					class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
				>
					<a href="/app/profile"
						><i class="fa-solid fa-circle-user mr-1 text-bace"></i>プロフィール編集</a
					>
				</li>
				<li
					class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
				>
					<a href="/app/links"><i class="fa-solid fa-link mr-1 text-bace"></i>リンク設定</a>
				</li>
				<li
					class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
				>
					<a href="/app/posts"><i class="fa-solid fa-circle-plus mr-1 text-bace"></i>投稿管理</a>
				</li>
				<li
					class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
				>
					<a href="/app/design"><i class="fa-solid fa-pen-fancy mr-1 text-bace"></i>デザイン設定</a>
				</li>
				<li
					class="hover:bg-(--small-text-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
				>
					<a href={publicPageUrl}
						><i class="fa-solid fa-square-arrow-up-right mr-1 text-bace"></i>あなたの公開ページ</a
					>
				</li>
			</ul>
			<div class="mt-auto">
				<!--s: account-info-->
				<button type="button" class="cursor-pointer w-full hover:bg-(--small-text-color) transition rounded-xl p-1">
					<div class="flex account-info">
						<div class="account-info_avatar">
							<img src={accountAvatarUrl} alt="{accountDisplayName}のアイコン" class="h-10 rounded-full" />
						</div>
						<div class="my-auto ml-2 account-info_name">{accountDisplayName}</div>
						<i class="fa-solid fa-chevron-right my-auto ml-auto"></i>
					</div>
				</button>
				<!--e: account-info-->
			</div>
		</aside>
		<div class="main-content-area">
			{@render children()}
		</div>
	</div>
</main>

<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();

	/*s: モーダル*/
	import MainModal from '$lib/components/ui/MainModal.svelte';
	let showMainModal = $state(false);
	let modalType = $state('');

	function openModal(type: string) {
		showMainModal = true;
		modalType = type;
	}
	/*e:モーダル*/

	//ハンバーガーメニュー
	let open = $state(false);
	let isOtherClosing = $state(false);
	let otherOpen = $state(false);
	let pendingOpen = false;

	function closeOther(goBackToMenu: boolean = false) {
		if (goBackToMenu) pendingOpen = true;
		otherOpen = false;
	}

	//100pxスクロールでヘッダーの表示を変更
	let scrolled = $state(false);

	/*動的クラス*/
	//ヘッダー
	import { fade } from 'svelte/transition';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { navState } from '$lib/stores/navState.svelte.js';

	const headerClass = $derived(
		`absolute top-0 z-20 flex w-full flex-col overflow-hidden border border-black/10 bg-white/80 backdrop-blur-md transition-all duration-500` +
			(scrolled ? ' scroll-nav' : '') +
			(otherOpen
				? ' max-h-[100vh] rounded-b-[1.0rem]'
				: open
					? ' max-h-[400px] rounded-b-[1.0rem]'
					: ' max-h-[56px]')
	);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 100;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	//uiテスト用ダミー*/
	let publicPageUrl = '/dummy_profile/';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.atserver186.jp/libs/fontawesome/css/all.min.css" /><link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

<MainModal bind:showMainModal>
	<!--s: account_info-->
	{#if modalType === 'account_info'}
		<h2 class="mb-4 text-center text-2xl font-bace text-(--main-text-color)">
			<i class="fa-solid fa-circle-info mr-2"></i>アカウント情報
		</h2>
		<hr class="m-hr" />
		<div class="flex">
			<div>
				<img
					src={data.accountAvatarUrl}
					alt="{data.accountDisplayName}のアイコン"
					class="h-10 rounded-full"
				/>
			</div>
			<div class="my-auto ml-2">{data.accountDisplayName}</div>
		</div>
		<div class="flex flex-col">
			<a href="/app/settings"
				><i class="fa-solid fa-circle-user mr-1 text-bace"></i>プロフィール編集</a
			>
			<a href="/app/help"
				><i class="fa-regular fa-circle-question mr-1 text-bace"></i>ヘルプセンター</a
			>
			<a href="/app/settings"><i class="fa-regular fa-message mr-1 text-bace"></i>フィードバック</a>
			<hr class="m-hr" />
			<a href="/app/settings"
				><i class="fa-solid fa-arrow-right-from-bracket mr-1 text-bace"></i>ログアウト</a
			>
		</div>
		<!--e: account_info-->
		<!---->
		<!--s: test-->
	{:else if modalType === 'test'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="fa-solid fa-money-check-dollar mr-2"></i>お支払いについて
		</p>
		<hr class="main-hr" />
		<p class="leading-[1.8rem]">test</p>
		<!--e: test-->
	{/if}
</MainModal>

<main class="min-h-screen">
	<div class="main-grid">
		<aside
			class="min-h-screen bg-white p-4 hidden md:flex md:flex-col"
			style="border-right: 0.5px solid var(--small-text-color);"
		>
			<div class="flex flex-col h-full">
				<div class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer">
					<a href="/app/home" class="flex shrink-0 whitespace-nowrap transition w-fit">
						<img src={data.serviceIconUrlShort} alt="ATSERVER Logo" class="h-10" />
						<p class="text-(--main-text-color) m-auto ml-2 font-bold">{data.serviceName}</p></a
					>
				</div>
				<ul>
					<hr class="m-hr" />
					<li
						class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
					>
						<a href="/app/home"><i class="fa-solid fa-house mr-1 text-bace"></i>ホーム</a>
					</li>
					<li
						class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
					>
						<a href="/app/links"><i class="fa-solid fa-link mr-1 text-bace"></i>リンク設定</a>
					</li>
					<li
						class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
					>
						<a href="/app/posts"><i class="fa-solid fa-circle-plus mr-1 text-bace"></i>投稿管理</a>
					</li>
					<li
						class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
					>
						<a href="/app/design"
							><i class="fa-solid fa-pen-fancy mr-1 text-bace"></i>デザイン設定</a
						>
					</li>
					<li
						class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
					>
						<a href="/app/media"
							><i class="fa-solid fa-images mr-1 text-bace"></i>メディアライブラリ</a
						>
					</li>
					<li
						class="hover:bg-(--main-hover-color) transition p-1 rounded-xl cursor-pointer my-4 text-lg font-thin"
					>
						<a href={publicPageUrl}
							><i class="fa-solid fa-square-arrow-up-right mr-1 text-bace"></i>あなたの公開ページ</a
						>
					</li>
				</ul>

				<div class="mt-auto">
					<!--s: account-info-->
					<button
						type="button"
						onclick={() => openModal('account_info')}
						class="cursor-pointer w-full hover:bg-(--main-hover-color) transition rounded-xl p-1"
					>
						<div class="flex">
							<div>
								<img
									src={data.accountAvatarUrl}
									alt="{data.accountDisplayName}のアイコン"
									class="h-10 rounded-full"
								/>
							</div>
							<div class="my-auto ml-2">{data.accountDisplayName}</div>
							<i class="fa-solid fa-chevron-right my-auto ml-auto"></i>
						</div>
					</button>
					<!--e: account-info-->
				</div>
			</div>
		</aside>
		<div class="main-content-area">
			{#if navState.visible}
				<div class="app-header-anchor">
					<header class={headerClass}>
						<div class="flex items-center justify-between px-2 py-2">
							<!--s:ロゴ-->
							<a href="/" class="flex shrink-0 whitespace-nowrap transition md:hidden">
								<img src={data.serviceIconUrlShort} alt="" class="h-10 w-auto rounded-xl" />
							</a>
							<!--e:ロゴ-->
							<!---->
							<div class="flex items-center md:hidden">
								<!--s:スマホ用検索ボタン-->
								<button
									onclick={() => openModal('account_info')}
									type="button"
									title="プロフィール情報"
									class="mr-4 cursor-pointer text-bace"
								>
									<i class="fa-solid fa-circle-user"></i>
								</button>
								<!--e:スマホ用検索ボタン-->
								<!---->
								<!--s:スマホ用ハンバーガー / その他メニュー閉じる-->
								<div class="grid">
									{#if !otherOpen}
										<button
											class="col-start-1 row-start-1 flex cursor-pointer flex-col gap-1.5"
											transition:fade={{ duration: 300 }}
											onclick={() => (open = !open)}
											title="メニュー"
										>
											<div
												class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center"
											>
												<input class="peer hidden" type="checkbox" checked={open} />
												<div
													class="header-hamburger h-0.5 w-[50%] origin-left translate-y-[0.45rem] rounded-sm bg-black transition-all duration-300 peer-checked:-rotate-45"
												></div>
												<div
													class="header-hamburger h-0.5 w-[50%] origin-center rounded-md bg-black transition-all duration-300 peer-checked:hidden"
												></div>
												<div
													class="header-hamburger h-0.5 w-[50%] origin-left translate-y-[-0.45rem] rounded-md bg-black transition-all duration-300 peer-checked:rotate-45"
												></div>
											</div>
										</button>
									{/if}

									{#if otherOpen}
										<button
											class="col-start-1 row-start-1 flex cursor-pointer flex-col gap-1.5"
											transition:fade={{ duration: 300 }}
											onclick={() => closeOther(open)}
											title="メニュー"
										>
											<div
												class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center"
											>
												<i class="fa-solid fa-angle-left other-close-ico"></i>
											</div>
										</button>
									{/if}
								</div>
								<!--s:スマホ用ハンバーガー / その他メニュー閉じる-->
							</div>
							<!---->
							<!--s:PC用メニュー-->
							<nav class="hidden md:flex">
								<ul class="flex items-center gap-5 whitespace-nowrap transition">
									<li>
										<a href="/app/" class="header-text ml-3 text-xs tracking-wider transition"
											>リンク</a
										>
									</li>
								</ul>
							</nav>
							<!--e:PC用メニュー-->
						</div>

						<!--スマホ用メニュー-->
						{#if !otherOpen && !isOtherClosing}
							<nav class="px-6 pt-6 pb-6 md:hidden">
								<ul class="flex flex-col gap-4 text-sm tracking-wide">
									<li>
										<a href="/app/home" class="header-text"
											><i class="fa-solid fa-house mr-1 text-bace"></i>ホーム</a
										>
									</li>
									<li>
										<a href="/app/links" class="header-text"
											><i class="fa-solid fa-link mr-1 text-bace"></i>リンク設定</a
										>
									</li>
									<li>
										<a href="/app/post" class="header-text"
											><i class="fa-solid fa-circle-plus mr-1 text-bace"></i>投稿管理</a
										>
									</li>
									<li>
										<a href="/app/media" class="header-text"
											><i class="fa-solid fa-images mr-1 text-bace"></i>メディアライブラリ</a
										>
									</li>
									<li>
										<a href="{publicPageUrl}" class="header-text flex">
											<img src={data.accountAvatarUrl} alt="{data.accountDisplayName}のアイコン" class="h-5 rounded-4xl mr-1"/>
											あなたの公開ページ
										</a>
									</li>
									<hr class="m-hr" />
									<li>
										<a href="/site/info" class="header-text"
											><i class="fa-solid fa-images mr-1 text-bace"></i>システム情報</a
										>
									</li>
								</ul>
							</nav>
						{/if}
					</header>
				</div>
			{/if}

			{@render children()}
		</div>
	</div>
</main>

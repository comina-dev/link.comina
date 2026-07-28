<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	/*ローディングアニメーション*/
	import { isVisible, hasInitialized } from '$lib/stores/loadingAnime.js';
	import Loading from '$lib/components/ui/LoadingAnime.svelte';
	import { get } from 'svelte/store';
	/*独自スタイル*/
	import '../layout.css';
	/*NProgress*/
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	/*Sqiper*/
	import Swiper from 'swiper';
	import 'swiper/css';
	/*favicon*/
	import favicon from '$lib/assets/favicon.png';
	/*SEO*/
	import { page } from '$app/stores';
	/*モーダル*/
	import Modal from '$lib/components/ui/MainModal.svelte';
	/*共通パーツ表示・非表示切り替え*/
	import { navState } from '$lib/stores/navState.svelte.js';

	/*NProgressの設定*/
	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
		// ページ遷移時にメニューを閉じる
		open = false;
		otherOpen = false;
	});

	//export
	let { data, children } = $props();
	let accordionOpen = $state(false);

	//ハンバーガーメニュー
	let open = $state(false);
	let isOtherClosing = $state(false);
	let otherOpen = $state(false);
	let pendingOpen = false;

	function closeOther(goBackToMenu: boolean = false) {
		if (goBackToMenu) pendingOpen = true;
		otherOpen = false;
	}

	/*s:モーダル*/
	let showMainModal = $state(false);
	let modalType = $state('');

	function openModal(type: string) {
		showMainModal = true;
		modalType = type;
	}
	/*e:モーダル*/
	//
	/*s:カルーセル*/
	let swiperContainer: HTMLDivElement | null = null;
	let swiperInstance: any = null;

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			// Ctrl + K (または Cmd + K) を判定
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault(); // ブラウザのデフォルト挙動を無効化
				openModal('a');
			}
		};

		window.addEventListener('keydown', handleKeydown);

		// クリーンアップ関数
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	/*ローディングアニメーション*/
	onMount(() => {
		// localStorage をチェック
		const alreadySeen = localStorage.getItem('hasSeenIntro');

		if (!alreadySeen) {
			//初回アクセスの場合
			isVisible.set(true);

			//動画を視聴済みのフラグを追加
			localStorage.setItem('hasSeenIntro', 'true');

			//動画の長さに合わせて自動で消す（動画のendedイベントを使わない場合の保険）
			setTimeout(() => {
				isVisible.set(false);
			}, 5000);
		}
	});

	const headerClass = $derived(
		`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] z-20 border border-black/10 bg-white/80 backdrop-blur-md transition-all duration-500 rounded-4xl md:w-[60%]` +
			(otherOpen
				? ' max-h-[100vh] rounded-b-4xl'
				: open
					? ' max-h-[400px] rounded-b-4xl'
					: ' max-h-[56px]')
	);
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.atserver186.jp/libs/fontawesome/css/all.min.css" />
	<link rel="icon" href={favicon} />
	<!--s:SEO-->
	<!--各ページでheadに内容がなければ以下の内容が表示される-->
	<title>ATSERVER</title>
	<meta name="description" content="Comina Linkの説明" />
	<meta name="keywords" content="test,テスト" />
	<meta property="og:site_name" content={data.serviceName} />
	<meta property="og:type" content="website" />
	<!--<meta property="og:image" content="https://atserver186.jp/ogp.png" />-->
	<meta property="og:title" content={data.serviceName} />
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ATSERVER186" />
	<!--e:SEO-->
</svelte:head>

<Modal bind:showMainModal>
	{#if modalType === 'test'}
		<form class="s-search-form mb-4" action="/search/" method="GET">
			<input
				class="s-search-input"
				type="text"
				id="searchTerm"
				name="search"
				placeholder="検索..."
			/>
			<button class="m-search-button" type="submit" title="検索する"
				><i class="fas fa-search"></i></button
			>
		</form>
		<p class="mt-4 text-lg">現在検索機能は実装されていません。</p>
	{:else if modalType === 'b'}{/if}
</Modal>

{#if $isVisible}
	<Loading />
{/if}

{#if navState.visible}
	<header class={headerClass}>
		<div class="flex items-center justify-between px-2 py-2">
			<!--s:ロゴ-->
			<a href="/site" class="flex shrink-0 transition">
				<img src={data.serviceIconUrlShort} alt="" class="h-10 w-auto rounded-4xl" />
				<p class="header-text m-auto ml-2 font-bold">Comina Link</p>
			</a>
			<!--e:ロゴ-->
			<!---->
			<div class="flex md:hidden">
				<!--s:スマホ用検索ボタン-->
				<button
					onclick={() => openModal('search')}
					type="button"
					title="ユーザまたはページを検索する"
					class="mr-4 cursor-pointer text-sm"><i class="fa-solid fa-magnifying-glass"></i></button
				>
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
							<div class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center">
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
				</div>
				<!--s:スマホ用ハンバーガー / その他メニュー閉じる-->
			</div>
			<!---->
			<!--s:PC用メニュー-->
			<nav class="hidden md:flex flex-1 ml-3">
				<!-- ★ flex-1 を追加 -->
				<ul class="flex items-center gap-5 whitespace-nowrap transition w-full">
					<!-- w-full は維持 -->
					<li>
						<a href="/site" class="text-xs tracking-wider transition">ホーム</a>
					</li>
					<li>
						<a href="/site/explore" class="text-xs tracking-wider transition">探索</a>
					</li>
					<li>
						<a href="/site/help" class="text-xs tracking-wider transition">ヘルプ</a>
					</li>
					<!--s: auth-->
					<li class="ml-auto">
						<!-- これで右端に寄ります -->
						<a href="/auth/login" class="text-xs tracking-wider transition">ログイン</a>
					</li>
					<li class="bg-(--main-accent-color) rounded-4xl px-4 py-2">
						<a href="/auth/register" class="text-xs tracking-wider transition text-white"
							>新規登録</a
						>
					</li>
					<!--e: auth-->
				</ul>
			</nav>
			<!--e:PC用メニュー-->
		</div>

		<!--スマホ用メニュー-->
		{#if open && !otherOpen && !isOtherClosing}
			<nav class="px-6 pt-6 pb-6 md:hidden" transition:fade={{ duration: 300 }}>
				<ul class="flex flex-col gap-4 text-sm tracking-wide">
					<li><a href="/site" class="header-text">ホーム</a></li>
					<li><a href="/site/explore" class="header-text">探索</a></li>
					<li><a href="/site/help" class="header-text">ヘルプ</a></li>
					<li><a href="/site/contact" class="header-text">お問い合わせ</a></li>
				</ul>
			</nav>
		{/if}
	</header>
{/if}

{@render children()}

{#if navState.visible}
	<!--フッター-->
	<footer class="footer m-0 w-full">
		<div class="container">
			<div class="hidden md:flex">
				<div class="footer-top-content">
					<!-- フッターの左側コンテンツ -->
					<div class="footer-flex-content">
						<div class="footer-logo">
							<a href="/">
								<img
									src={data.serviceIconUrlShort}
									alt={data.serviceName}
									class="h-auto w-15 rounded-xl"
								/>
							</a>
						</div>
					</div>

					<!-- フッターの右側コンテンツ -->
					<div class="footer-flex-content">
						<h4>サービス</h4>
						<ul>
							<li><a href="/service">webサービス</a></li>
							<li><a href="/software">ソフトウェア</a></li>
							<li><a href="/works/">関連サービス一覧</a></li>
							<li>
								<a href="https://dev.atserver186.jp" target="_blank"
									><i class="fa-solid fa-arrow-up-right-from-square text-xs mr-1"
									></i>dev.atserver186.jp</a
								>
							</li>
						</ul>
					</div>
					<div class="footer-flex-content">
						<h4>ATSERVERについて</h4>
						<ul>
							<li>
								<a href="/about">
									<span>当サイトについて</span>
								</a>
							</li>
							<li>
								<a href="/news">
									<span>お知らせ</span>
								</a>
							</li>
							<li>
								<a href="/site/oss">
									<span>使用しているOSS</span>
								</a>
							</li>
							<li>
								<a href="/site/saucecode">
									<span>ソースコード</span>
								</a>
							</li>
							<li>
								<a href="/site/terms">
									<span>利用規約</span>
								</a>
							</li>
							<li>
								<a href="/site/privacypolicy">
									<span>プライバシーポリシー</span>
								</a>
							</li>
							<li>
								<a href="/contact">
									<span>お問い合わせ</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="footer-flex-content">
						<h4>各種SNS / リンク</h4>
						<ul>
							<li>
								<a href="https://x.com/t_aoki186" target="_blank">
									<i class="fa-brands fa-x-twitter mr-1 text-xs"></i>
									<span>X(Twitter)</span>
								</a>
							</li>
							<li>
								<a href="https://github.com/t-aoki186" target="_blank">
									<i class="fa-brands fa-github text-xs"></i>
									<span>Github</span>
								</a>
							</li>
							<li>
								<a href="https://gitlab.atserver186.jp/" target="_blank">
									<i class="fa-brands fa-gitlab text-xs"></i>
									<span>Gitlab</span>
								</a>
							</li>
							<li>
								<a href="/site/links">
									<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
									<span>すべてのリンクを確認する</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--s:モバイル表示用-->
			<div class="flex w-full flex-col p-1 md:hidden">
				<!--s:ロゴ・住所-->
				<div class="flex flex-col items-center justify-center gap-4">
					<a href="/">
						<img
							src={data.serviceIconUrlShort}
							alt={data.serviceName}
							class="mt-4 h-auto w-20 rounded-xl"
						/>
					</a>
				</div>
				<!--s:ロゴ・住所-->
				<!---->
				<!--s:アコーディオン-->
				<div class="mt-8">
					<details class="accordion-main mb-4 min-w-full">
						<summary class="font-bold">サービス</summary>
						<ul class="pt-2 pl-2">
							<li><a href="/service">webサービス</a></li>
							<li><a href="/software">ソフトウェア</a></li>
							<li><a href="/works/">関連サービス一覧</a></li>
							<li>
								<a href="https://dev.atserver186.jp" target="_blank"
									><i class="fa-solid fa-arrow-up-right-from-square text-xs mr-1"
									></i>dev.atserver186.jp</a
								>
							</li>
						</ul>
					</details>
					<details class="accordion-main mb-4 min-w-full">
						<summary class="font-bold">ATSERVERについて</summary>
						<ul class="pt-2 pl-2">
							<li>
								<a href="/about">
									<span>当サイトについて</span>
								</a>
							</li>
							<li>
								<a href="/news">
									<span>お知らせ</span>
								</a>
							</li>
							<li>
								<a href="/site/oss">
									<span>使用しているOSS</span>
								</a>
							</li>
							<li>
								<a href="/site/saucecode">
									<span>ソースコード</span>
								</a>
							</li>
							<li>
								<a href="/site/terms">
									<span>利用規約</span>
								</a>
							</li>
							<li>
								<a href="/site/privacypolicy">
									<span>プライバシーポリシー</span>
								</a>
							</li>
							<li>
								<a href="/contact">
									<span>お問い合わせ</span>
								</a>
							</li>
						</ul>
					</details>
					<details class="accordion-main min-w-full">
						<summary class="font-bold">各種SNS / リンク</summary>
						<ul class="pt-2 pl-2">
							<li>
								<a href="https://x.com/t_aoki186" target="_blank">
									<i class="fa-brands fa-x-twitter mr-1 text-xs"></i>
									<span>X(Twitter)</span>
								</a>
							</li>
							<li>
								<a href="https://github.com/t-aoki186" target="_blank">
									<i class="fa-brands fa-github text-xs"></i>
									<span>Github</span>
								</a>
							</li>
							<li>
								<a href="https://gitlab.atserver186.jp/" target="_blank">
									<i class="fa-brands fa-gitlab text-xs"></i>
									<span>Gitlab</span>
								</a>
							</li>
							<li>
								<a href="/site/links">
									<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
									<span>すべてのリンクを確認する</span>
								</a>
							</li>
						</ul>
					</details>
				</div>
				<!--e:アコーディオン-->
			</div>
			<!--e:モバイル表示用-->
			<!---->
			<!--s:フッター最下部-->
			<div class="footer-bottom-content mx-auto">
				<br />
				<hr class="sub-hr" />
				<br />
				<a href="/site/terms/" class="footer-link" style="margin-right: 10px;">サイトポリシー</a
				><span class="footer-span">|</span>
				<a
					href="/site/privacypolicy/"
					class="footer-link"
					style="margin-right: 10px; margin-left: 10px;">プライバシーポリシー</a
				><span class="footer-span">|</span>
				<a href="/contact" class="footer-link" style="margin-left: 10px;">お問い合わせ</a>
				<p class="footer-text">
					&copy; 2026 ATSERVER. | atserver186.jp All Rights Reserved.
					本サイトの無断転載は、固くこれを禁じます。
				</p>
			</div>
			<!--e:フッター最下部-->
		</div>
	</footer>
{/if}

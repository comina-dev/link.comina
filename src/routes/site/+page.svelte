<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { reveal } from '$lib/reveal';
</script>

<svelte:head>
	<title>{data.serviceName}</title>
	<meta property="og:title" content={data.serviceName} />
</svelte:head>

<main>
	<section class="min-h-screen bg-amber-200">
		<p>test</p>
		<!--
		カルーセル(Swiper)とページ最下部の「登録して始める」の小さいものを配置。
		-->
	</section>
	<section class="sicon my-10 w-[80%] bg-gray-200 mx-auto p-2 transition-all">
		<h2>サービス紹介など</h2>
		<hr class="m-hr" />
	</section>
	<section class="sicon my-10 bg-gray-200 mx-auto p-2 transition-all">
		<h2>お知らせ</h2>
		<div class="main-link">
			<div class="link-3" style="margin: 0 5px 5px 5px; ">
				<hr class="main-hr mb-4" />
				<ul>
					{#each data?.latestNews ?? [] as post}
						<li class="mx-auto mb-4 w-full list-none">
							<a href="/site/news/{post.category}/{post.slug}">
								<div
									class="news-list flex border-l-2 pl-4"
									style="border-left-color: var(--main-text-color);"
								>
									<div class="news-list-date-box mr-4">
										<span class="news-list-month"
											>{String(new Date(post.date).getMonth() + 1).padStart(2, '0')}</span
										>
										<span class="news-list-slash">/</span>
										<span class="news-list-date"
											>{String(new Date(post.date).getDate()).padStart(2, '0')}</span
										>
									</div>
									<div class="truncate-parent flex-col">
										<p class="truncate-title news-list-title ml-2 font-bold">{post.title}</p>
									</div>
									<div class="news-list-icon my-auto ml-auto">
										<i class="fa-solid fa-angles-right left-auto mr-2"></i>
									</div>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="link-4 flex items-center justify-center">
				<i
					class="tf26-icon-material icon-megaphone -scale-x-100 rotate-30 transform text-[12rem] text-(--main-text-color)"
				></i>
			</div>
			<!--
		atserver186.jpと同じ形で、markdownではなくdbで管理。
		-->
		</div>
	</section>
	<section class="my-10 w-full bg-gray-200 mx-auto p-2 transition-all">
		<p>登録ユーザ表示</p>
		<p>横流し→/←</p>
		<!--
		-->
	</section>
	<section class="sicon my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2 transition-all">
		<p>登録して始める的なもの</p>
		<form
			class="flex justify-between items-center overflow-hidden rounded-4xl w-[70%] mx-auto"
			action="/login/"
			method="GET"
		>
			<input
				class="w-full h-12 px-3 py-3.75 border-none box-border text-[1em] outline-0"
				type="text"
				id="searchTerm"
				name="search"
				placeholder="{data.serviceDomainDisp}/あなたの名前"
			/>
			<button
				class="flex justify-center items-center w-25 h-12 border-0 bg-amber-200 cursor-pointer"
				type="submit"
				title="検索する"><i class="fas fa-search"></i></button
			>
		</form>
		<!--
		フォームにユーザ名を入力させ、始めるボタンを押すとログインページに入力されたユーザ名をURLパラメータとして渡す。
		もしユーザがログイン中であればそのまま管理画面へ、そうでなければ新規登録ページにURLパラメータを維持した状態でリダイレクトし、
		希望するユーザ名フォームに自動でsihomeで入力されたユーザ名を入力する。
		もしそのユーザ名が使用中であれば警告を表示し、登録できないようにする。
		-->
	</section>
</main>

<style>
	.sicon {
		width: 55%;
	}

	@media (max-width: 1280px) {
		.sicon {
			width: 65%;
		}
	}

	@media (max-width: 1024px) {
		.sicon {
			width: 85%;
		}
	}

	@media (max-width: 768px) {
		.sicon {
			width: 95%;
		}
	}
</style>

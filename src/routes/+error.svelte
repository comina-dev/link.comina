<script>
	import { page } from '$app/state';
</script>

{#if page.status === 404}
	<main class="mt-15 mr-1 ml-1 min-h-screen bg-(--main-bg-color)">
		<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
			<p class="legacy-title">404</p>
		</div>
		<section class="container mx-auto mt-4 mb-25">
			<div class="mb-4 min-w-full">
				<p class="text-3xl">お探しのページは見つかりませんでした。</p>
			</div>
			<a href="/" class="link-main">
				<div class="link-main-underline">
					<i class="fa-solid fa-arrow-right-long"></i>
					<span>トップページに戻る</span>
				</div>
			</a>
		</section>
	</main>
	<ol class="main-breadcrumb container mx-auto">
		<li><a href="/">ホーム</a></li>
		<li>404</li>
	</ol>
{:else if page.status === 500}
	<h1>500</h1>
{:else}
	<h1>不明なエラーが発生しました。</h1>
{/if}

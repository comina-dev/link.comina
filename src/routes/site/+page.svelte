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
		<!--
		カルーセル(Swiper)とページ最下部の「登録して始める」の小さいものを配置。
		-->
	</section>
	<section class="my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2">
		<p>サービス紹介/qa</p>
	</section>
	<section class="my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2">
		<p>お知らせ</p>
		<!--
		atserver186.jpと同じ形で、markdownではなくdbで管理。
		-->
	</section>
	<section class="my-10 w-full bg-gray-200 mx-auto p-2">
		<p>登録ユーザ表示</p>
		<p>横流し→/←</p>
		<!--
		-->
	</section>
	<section class="my-10 w-[80%] bg-gray-200 mx-auto rounded-3xl p-2">
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

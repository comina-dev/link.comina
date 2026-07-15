<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
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
		</aside>
		<div class="main-content-area">
			{@render children()}
		</div>
	</div>
</main>

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

	//uiテスト用ダミー*/
	let publicPageUrl = '/dummy_profile/';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.atserver186.jp/libs/fontawesome/css/all.min.css" /><link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

<main>
	<section class="grid min-h-screen md:grid-cols-2">
		<div class="mt-auto mx-auto md:ml-auto md:mr-50 md:my-auto">
			<a href="/" class="flex shrink-0 whitespace-nowrap transition w-fit" title="ホーム">
				<img src={data.serviceIconUrlShort} alt="ATSERVER Logo" class="h-10" />
				<p class="text-(--main-text-color) m-auto ml-2 font-bold text-2xl">{data.serviceName}</p>
			</a>
		</div>
		<div class="flex flex-col p-8 w-full h-100 mb-auto mx-auto md:h-auto md:w-[50%] md:mr-auto md:ml-50 md:my-auto">
			{@render children()}
		</div>
	</section>
</main>

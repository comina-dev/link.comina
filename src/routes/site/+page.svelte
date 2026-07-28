<script>
	const { data } = $props();

	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>{data.serviceName}</title>
	<meta property="og:title" content="{data.serviceName}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="legacy-title" style="color: black; margin-bottom: 0;">test</p>
	</div>
	<section class="container mx-auto mt-25 mb-25">
		<div class="flex flex-col">
			<a href="/site/terms" class="mb-4 font-bold underline"
				><i class="fa-solid fa-arrow-up-right-from-square mr-1 text-sm"></i>利用規約はこちら</a
			>
			<p class="mb-2">
				ATSERVER（以下「当サイト」）は、ユーザーの個人情報の保護を重視し、以下の通りプライバシーポリシーを定めます。
			</p>
			<h3 class="mb-2 text-lg font-bold">第1条（個人情報の収集方法）</h3>
			<ul class="mb-2">
				当サイトでは、以下の場合に個人情報を取得することがあります。
				<li><strong>・</strong>お問い合わせ時: お名前、メールアドレス、お問い合わせ内容</li>
				<li>
					<strong>・</strong>アクセス解析:
					サイトの改善を目的として、Cookie（クッキー）等を利用した匿名情報の収集（Google
					Analytics等を利用する場合）
				</li>
			</ul>
			<h3 class="mb-2 text-lg font-bold">第2条（個人情報の利用目的）</h3>
			<ul class="mb-2">
				収集した個人情報は、以下の目的でのみ利用します。
				<li><strong>・</strong>お問い合わせに対する回答や連絡のため</li>
				<li><strong>・</strong>サービスの利用状況を分析し、利便性を向上させるため</li>
			</ul>
			<h3 class="mb-2 text-lg font-bold">第3条（画像の取り扱いについて）</h3>
			<ul class="mb-2">
				<li>
					<strong>1.</strong>一時的な保持:
					変換のためにアップロードされた画像データは、変換およびダウンロードの目的でのみ一時的に保持されます。
				</li>
				<li>
					<strong>2.</strong>自動削除:
					ダウンロード完了時、またはアップロードから30分以内に、システムによりサーバーから自動的に完全削除されます。
				</li>
				<li>
					<strong>3.</strong>非公開の原則:
					アップロードされた画像を当サイトが閲覧したり、第三者に提供したりすることはありません。
				</li>
			</ul>
			<h3 class="mb-2 text-lg font-bold">第4条（個人情報の第三者提供）</h3>
			<p class="mb-2">
				当サイトは、法令に基づき開示が必要な場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
			</p>
			<h3 class="mb-2 text-lg font-bold">第5条（免責事項）</h3>
			<p class="mb-2">
				当サイトからのリンク先や、広告掲載先などで生じたトラブルについては、当サイトは一切の責任を負いかねます。
			</p>
		</div>
	</section>
</main>
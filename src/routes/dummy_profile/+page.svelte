<script>
	const { data } = $props();

	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>{data.accountDisplayName} | {data.serviceName}</title>
	<meta property="og:title" content="{data.accountDisplayName} | {data.serviceName}" />
</svelte:head>

<main class="main-content">
	<section class="profile-section">
    <!--s: service-ad-->
		<img
			src={data.serviceIconUrlLong}
			alt={data.serviceName}
			style="width:100px;max-width:90vw;height:auto;margin-bottom:8px;"
		/>
        <!--e: service-ad-->
        <!---->
		<img
			class="profile-avatar"
			src={data.accountAvatarUrl}
			alt="{data.accountDisplayName}のアイコン"
		/>
		<!--s: user-text-->
		<div class="profile-text">
			<h3 class="profile-display-name">{data.accountDisplayName}</h3>
			<div class="profile-bio">
				<span>bio texts</span>
			</div>
		</div>
		<!--e: user-text-->
		<!---->
		<!--e: user-link-icons-->
		<div class="profile-icons">
			<a href="https://atserver186.jp" class="icon-link" title="ATSERVER" target="_blank"
				><img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" /></a
			>
			<a href="https://atserver186.jp" class="icon-link" title="ATSERVER" target="_blank"
				><img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" /></a
			>
			<a href="https://atserver186.jp" class="icon-link" title="ATSERVER" target="_blank"
				><img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" /></a
			>
			<a href="https://atserver186.jp" class="icon-link" title="ATSERVER" target="_blank"
				><img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" /></a
			>
		</div>
		<!--e: user-link-icons-->
		<!---->
		<!--s: user-links-->
		<div class="profile-links">
			<a class="profile-link-card" href="https://atserver186.jp" target="_blank">
				<img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" />
				ATSERVER
				<br />
				<span>ホームページ</span>
			</a>
		</div>
		<!--e: user-links-->
		<!---->
		<!--s: service-ad-->
		<div
			style="display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:24px;"
		>
			<a href="https://link.atserver186.jp" target="_blank"
				><img
					src="https://pic.atserver186.jp/img/atserver/header_logo.webp"
					alt="ATSLink"
					style="width:70px;max-width:90vw;height:auto;margin-bottom:8px;"
				/></a
			><a
				href={data.serviceDomain}
				style="font-size:0.8rem;color:black;text-decoration:none;margin-bottom:4px;"
				target="_blank">Created by {data.serviceName}</a
			>
			<p style="font-size:0.8rem;margin:0;">{data.serviceName}. All Rights Reserved</p>
		</div>
		<!--e: service-ad-->
	</section>
</main>

<style>
	.main-content {
		display: flex;
		flex: 1;
		justify-content: center;
	}

	.profile-section {
		background-color: #ffffff;
		border-radius: 18px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
		padding: 2rem 1rem;
		max-width: 480px;
		width: 100%;
		margin-top: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.profile-avatar {
		width: 110px;
		height: 110px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid #e6e6e6;
		margin-bottom: 10px;
	}

	.profile-text {
		display: flex;
		flex-direction: column;
	}

	.profile-display-name {
		font-size: 1.2rem;
		font-weight: bold;
		margin-inline: auto;
	}

	.profile-icons {
		display: flex;
		gap: 16px;
		margin-bottom: 1rem;
		margin-top: 1rem;
	}
	.icon-link img {
		width: 28px;
		height: 28px;
		filter: grayscale(0.2);
		transition: filter 0.2s;
	}
	.icon-link:hover img {
		filter: grayscale(0) drop-shadow(0 0 2px #969696);
	}
	.profile-links {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 24px;
	}
	.profile-link-card {
		display: flex;
		align-items: center;
		background: #f7f7f7;
		border-radius: 12px;
		padding: 16px 20px;
		font-size: 1.1rem;
		color: #222;
		text-decoration: none;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		transition: background-color 0.2s;
		gap: 16px;
	}
	.profile-link-card img {
		width: 32px;
		height: 32px;
		margin-right: 10px;
	}
	.profile-link-card span {
		font-size: 0.95rem;
		color: #888;
		margin-left: 8px;
	}
	.profile-link-card:hover {
		background: #b6b6b8;
		box-shadow: 0 2px 8px rgba(108, 99, 255, 0.08);
	}

	@media (max-width: 768px) {
		.main-content {
			min-height: 100vh;
		}

		.profile-section {
			background-color: var(--main-bg-color);
			box-shadow: none;
		}
	}
</style>

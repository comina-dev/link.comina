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
		<div class="profile-title">
			<img
				src="{data.serviceIconUrlLong}"
				alt="{data.serviceName}"
				style="width:100px;max-width:90vw;height:auto;margin-bottom:8px;"
			/>
		</div>
		<img class="profile-avatar" src="{data.accountAvatarUrl}" alt="{data.accountDisplayName}のアイコン" />
		<div class="profile-username">{data.accountDisplayName}</div>
		<div class="profile-bio">
			bio
		</div>
		<div class="profile-icons">
			<a href="https://atserver186.jp" class="icon-link" title="ATSERVER" target="_blank"
				><img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" /></a
			>
		</div>
		<div class="profile-links">
			<a class="profile-link-card" href="https://atserver186.jp" target="_blank"
				><img src="https://cdn.atserver186.jp/img/material/ats-logo.webp" alt="ATSERVER" />ATSERVER<br
				/><span>ホームページ</span></a
			>
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
					href="{data.serviceDomain}"
					style="font-size:0.8rem;color:black;text-decoration:none;margin-bottom:4px;"
					target="_blank">Created by {data.serviceName}</a
				>
				<p style="font-size:0.8rem;margin:0;">{data.serviceName}. All Rights Reserved</p>
			</div>
		</div>
	</section>
</main>

<style>
	.main-content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 48px 0 0 0;
	}

	.profile-section {
		background: #fff;
		border-radius: 18px;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
		padding: 40px 32px 32px 32px;
		max-width: 480px;
		width: 100%;
		margin-top: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.profile-title {
		font-family: 'Segoe UI', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 12px;
		color: #444;
	}

	.profile-avatar {
		width: 110px;
		height: 110px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid #e6e6e6;
		margin-bottom: 10px;
	}
	.profile-username {
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 8px;
	}
	.profile-icons {
		display: flex;
		gap: 16px;
		margin-bottom: 18px;
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
		transition:
			background 0.2s,
			box-shadow 0.2s;
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
		background: #e6e6ff;
		box-shadow: 0 2px 8px rgba(108, 99, 255, 0.08);
	}
</style>

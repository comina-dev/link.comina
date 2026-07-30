import { getAllNews } from '$lib/import/news';
import type { Post } from '$lib/types';

export async function load() {
	const posts = await getAllNews();
	return { posts };
}

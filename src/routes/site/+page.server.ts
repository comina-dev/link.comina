import { getAllNews } from '$lib/import/news';

export async function load(){
    const news = await getAllNews();

    /* 新着5件のお知らせを取得 */
    const latestNews = news.slice(0,5);
    
    /* 新着5件のお知らせを出力 */
    return { latestNews };   
}

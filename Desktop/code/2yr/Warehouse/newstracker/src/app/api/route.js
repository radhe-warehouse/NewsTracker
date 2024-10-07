import { NextResponse } from 'next/server';
import googleNewsScraper from 'google-news-scraper';
// import fs from 'fs';

export async function POST(req) {
  const { input } = await req.json();
  console.log(input);

  async function scraper(query) {
    const articles = await googleNewsScraper({ searchTerm: query });
    return articles;
  }
 
      const result = await scraper(input);
      console.log(result);
      const processedResult = JSON.stringify(result);
 
      return NextResponse.json({ result: processedResult });
}
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

const CONTENT_DIR = path.join(__dirname, '../src/content');

async function fetchSitemap(url) {
    const response = await fetch(url);
    const text = await response.text();
    const urls = [...text.matchAll(/<loc>(https:\/\/sabrinabarros.com\/[^<]+)<\/loc>/g)].map(m => m[1]);
    return urls.filter(u => !u.endsWith('.jpg') && !u.endsWith('.png') && !u.endsWith('.webp'));
}

async function scrapePost(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const title = doc.querySelector('h1')?.textContent?.trim() || 'Sem título';
        const dateElement = doc.querySelector('time') || doc.querySelector('meta[property="article:published_time"]');
        const date = dateElement?.getAttribute('datetime') || dateElement?.getAttribute('content') || new Date().toISOString();

        // Comprehensive list of selectors for Sabrina's various Elementor and WP structures
        const selectors = [
            '.elementor-widget-theme-post-content',
            '.elementor-676 .elementor-widget-container',
            '.elementor-676 .e-con-inner',
            '.entry-content',
            '.elementor-location-single',
            '.elementor-page',
            'article',
            'main'
        ];

        let contentElement = null;
        for (const selector of selectors) {
            const el = doc.querySelector(selector);
            // Ensure the element actually contains some content text
            if (el && el.textContent.trim().length > 200) {
                contentElement = el;
                break;
            }
        }

        if (!contentElement) {
            console.log(`Skipping ${url}: Content not found or too short`);
            return null;
        }

        // Comprehensive clean up of UI/Theme elements
        const selectorsToRemove = [
            '.wp-block-rank-math-toc-block',
            '.elementor-button-wrapper',
            '.rek-social-share',
            '.elementor-post-navigation',
            '.elementor-widget-heading',
            '.elementor-widget-image', // Usually featured image or ads
            'header',
            'footer',
            '.wpr-sharing-buttons',
            '#rank-math-toc',
            '.rek-author-box',
            '.elementor-widget-button'
        ];
        selectorsToRemove.forEach(sel => {
            contentElement.querySelectorAll(sel).forEach(el => el.remove());
        });

        const markdownContent = turndownService.turndown(contentElement.innerHTML);
        const slug = url.replace('https://sabrinabarros.com/', '').replace(/\/$/, '').split('/').pop();

        return {
            title,
            date: date.split('T')[0],
            excerpt: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
            category: "Saúde", // Default, could be refined
            slug,
            content: markdownContent
        };
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
        return null;
    }
}

async function run() {
    console.log('Fetching sitemap...');
    const urls = await fetchSitemap('https://sabrinabarros.com/post-sitemap.xml');
    console.log(`Found ${urls.length} potential posts.`);

    if (!fs.existsSync(CONTENT_DIR)) {
        fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }

    for (const url of urls) {
        console.log(`Processing: ${url}`);
        const post = await scrapePost(url);
        if (post) {
            const fileName = `${post.slug}.mdx`;
            const filePath = path.join(CONTENT_DIR, fileName);

            const fileContent = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date}"
excerpt: "${post.excerpt.replace(/"/g, '\\"')}"
category: "${post.category}"
readTime: "5 min"
---

# ${post.title}

${post.content}
`;
            fs.writeFileSync(filePath, fileContent);
            console.log(`Saved: ${fileName}`);
        }
    }
    console.log('Migration finished!');
}

run();

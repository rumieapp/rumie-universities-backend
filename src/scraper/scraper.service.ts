import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  async scrapeWebsite(url: string): Promise<any[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { timeout: 60000 }); // Increase timeout to 60 seconds

      // Extract the required data
      const discussions = await page.evaluate(() => {
        const discussionElements = document.querySelectorAll('.discussion-box');
        const data = [];

        discussionElements.forEach((post) => {
          const title =
            post.querySelector('.discussion-box-head a')?.textContent || '';
          const likes =
            post.querySelector('.like-box .like span')?.textContent || '0';
          const dislikes =
            post.querySelector('.like-box .unlike span')?.textContent || '0';
          const replies =
            post
              .querySelector('.like-box li strong a')
              ?.textContent.replace(' replies', '') || '0';
          const views =
            post
              .querySelector('.like-box li:last-child')
              ?.textContent.replace(' Views', '') || '0';

          data.push({ title, likes, dislikes, replies, views });
        });

        return data;
      });

      await browser.close();
      return discussions;
    } catch (error) {
      console.error(`Failed to load ${url}: ${error.message}`);
      await browser.close();
      throw error;
    }
  }

  async scrapeUniversities(url: string): Promise<any[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { timeout: 60000 });
      const content = await page.content(); // Get the HTML content of the page
      await browser.close();

      const $ = cheerio.load(content); // Load the HTML into Cheerio
      const data = [];

      $('.inner-container .inner-section-left div a').each((index, element) => {
        const name = $(element).text().trim() || '';
        const link = $(element).attr('href') || '';
        data.push({ name, link });
      });

      return data;
    } catch (error) {
      console.error(`Failed to load ${url}: ${error.message}`);
      await browser.close();
      throw error;
    }
  }

  
  async scrapeUniversityDetails(url: string): Promise<any> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Block unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
        request.abort();
      } else {
        request.continue();
      }
    });

    try {
      await page.goto(url, { timeout: 60000 });
      const content = await page.content(); // Get the HTML content of the page

      const $ = cheerio.load(content); // Load the HTML into Cheerio
      const baseUrl = 'https://www.greekrank.com';

      const data = {
        totalFraternities: $('li:contains("Total Fraternities:")')
          .text()
          .trim()
          .split(':')[1]
          .trim(),
        totalSororities: $('li:contains("Total Sororities:")')
          .text()
          .trim()
          .split(':')[1]
          .trim(),
        totalDiscussion: $('li:contains("Total Discussion:")')
          .text()
          .trim()
          .split(':')[1]
          .trim(),
        totalSchoolReviews: $('li:contains("Total School Reviews:")')
          .text()
          .trim()
          .split(':')[1]
          .trim(),
        tabLinks: [],
      };

      // Extract tab links
      $('.main-uninavicons .nav ul li a').each((index, element) => {
        const title = $(element).find('span').next().text();
        if (title === 'Overview') return;
        const link = baseUrl + $(element).attr('href');
        data.tabLinks.push({ title, link });
      });

      // Find the discussion tab link
      const discussionTab = data.tabLinks.find((tab) =>
        tab.title.includes('Discussion')
      );

      if (discussionTab) {
        const discussionPage = await browser.newPage();

        // Block unnecessary resources on the new page
        await discussionPage.setRequestInterception(true);
        discussionPage.on('request', (request) => {
          const resourceType = request.resourceType();
          if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
            request.abort();
          } else {
            request.continue();
          }
        });

        await discussionPage.goto(discussionTab.link, { timeout: 60000 });
        const discussionContent = await discussionPage.content();
        const $$ = cheerio.load(discussionContent);

        // Extract discussion details
        const discussions = [];
        await Promise.all(
          $$('div.latest-discussion .discussion-box').map(async (index, element) => {
            const title = $$(element)
              .find('.discussion-box-head a')
              .text()
              .trim();
            const replies = $$(element)
              .find('.like-box li strong a')
              .text()
              .trim()
              .replace(' replies', '');
            const likes = $$(element).find('.like-box .like span').text().trim();
            const dislikes = $$(element)
              .find('.like-box .unlike span')
              .text()
              .trim();
            const views = $$(element)
              .find('.like-box li:last-child')
              .text()
              .trim()
              .replace(' Views', '');

            const discussion = { title, replies, likes, dislikes, views, comments: [] };

            // Navigate to the reply page if there are replies
            if (parseInt(replies) > 0) {
              const replyLink = baseUrl + $$(element).find('.like-box li strong a').attr('href');
              const replyPage = await browser.newPage();
              await replyPage.setRequestInterception(true);
              replyPage.on('request', (request) => {
                const resourceType = request.resourceType();
                if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
                  request.abort();
                } else {
                  request.continue();
                }
              });
              await replyPage.goto(replyLink, { timeout: 60000 });
              const replyContent = await replyPage.content();
              const $$$ = cheerio.load(replyContent);

              $$$('.discussion-box-reply, .discussion-box-reply-comment').each((idx, elem) => {
                const comment = $$$(elem).find('.discussion-box-content p').text().trim();
                const commenter = $$$(elem).find('.discussion-box-head.desktop-view .comment').text().trim();
                const commentDate = $$$(elem).find('.discussion-box-head.desktop-view .posted-date time').attr('datetime');

                discussion.comments.push({ comment, commenter, commentDate });
              });

              await replyPage.close();
            }

            discussions.push(discussion);
          }).get()
        );

        // Add discussions to the discussion tab
        discussionTab.discussions = discussions;

        await discussionPage.close();
      }

      await browser.close();
      return data;
    } catch (error) {
      console.error(`Failed to load ${url}: ${error.message}`);
      await browser.close();
      throw error;
    }
  }
  


}

import axios from "axios";
import * as cheerio from "cheerio"; 
import fs from "fs";

const BASE_URL = "https://books.toscrape.com/";

async function scrapeBooks() {
  const allBooks = [];
  for (let page = 1; page <= 3; page++) {
    const pageUrl =
      page === 1
        ? BASE_URL
        : `${BASE_URL}catalogue/page-${page}.html`;

    try {
      const pageRes = await axios.get(pageUrl);
      const $ = cheerio.load(pageRes.data);

      $(".product_pod h3 a").each((_, el) => {
        const relativeLink = $(el).attr("href");
        const bookUrl = new URL(relativeLink, pageUrl).href;
        allBooks.push(bookUrl);
      });
    } catch (err) {
      console.error(`Could not load page ${page}: ${err.message}`);
    }
  }

  const results = [];
  console.log(`Found ${allBooks.length} books. Starting deep scrape...`);
  for (let url of allBooks) {
    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);

      const title = $("h1").text().trim();
      const price = $(".price_color").text().trim();
      const ratingClass = $(".star-rating").attr("class") || "";
      const rating = ratingClass.replace("star-rating", "").trim();
      const breadcrumbs = $(".breadcrumb li a")
        .map((_, el) => $(el).text().trim())
        .get()
        .join(" > ");
      const description = $("#product_description").next("p").text().trim().replace(/"/g, '""') || "";
      const productInfo = {};
      $("table.table-striped tr").each((_, row) => {
        const key = $(row).find("th").text().trim();
        const value = $(row).find("td").text().trim();
        productInfo[key] = value;
      });

      results.push({
        title,
        price,
        rating,
        breadcrumbs,
        description,
        productInfo
      });

      console.log(`Scraped: ${title}`);
    } catch (err) {
      console.error(`Error scraping book at ${url}: ${err.message}`);
    }
  }

  let csv = "Book Name,Price,Rating,Breadcrumbs,Description,UPC,Product Type\n";

  for (let book of results) {
    csv += `"${book.title}","${book.price}","${book.rating}","${book.breadcrumbs}","${book.description}","${book.productInfo.UPC || ""}","${book.productInfo["Product Type"] || ""}"\n`;
  }

  fs.writeFileSync("books.csv", csv);
  console.log("Success! books.csv created successfully.");
}

scrapeBooks();
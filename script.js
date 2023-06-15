// Example of fetching news from NewsAPI.
const apiKey = '696f8ed8b8c94bb3b8e4de4234c6097d';

let selectedRegion = 'us'; // Default value.

const regionSelect = document.getElementById('region-select');

// Function to get news from the selected region.
async function getNews() {
  selectedRegion = regionSelect.value;

  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${selectedRegion}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const articles = data.articles;

    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = ''; // Clear the container before adding new news.

    articles.forEach(article => {
      const newsCard = document.createElement('div');
      newsCard.classList.add('news-card');

      const title = document.createElement('h2');
      title.textContent = article.title;

      const description = document.createElement('p');
      description.textContent = article.description;

      const source = document.createElement('span');
      source.textContent = article.source.name;

      // Added a click event to view the full article.
      title.addEventListener('click', () => {
        window.open(article.url, '_blank');
      });

      newsCard.appendChild(title);
      newsCard.appendChild(description);
      newsCard.appendChild(source);

      newsContainer.appendChild(newsCard);
    });
  } catch (error) {
    console.log('Error fetching news:', error);
  }
}

// Call the function to get news on page load and when region changes.
getNews();

regionSelect.addEventListener('change', getNews);

const API_KEY = "fe926c57336a4c8d9766f5d5b830a83a";
const url = "https://newsapi.org/v2/everything?q=";

 window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            if (res.status === 426) {
                throw new Error('Upgrade Required: Please switch to a supported protocol.');
            } else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
            bindData(data.articles);
        } else {
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("cards-container").innerHTML = `
            <p>Error fetching news: ${error.message}</p>
            <p>Please ensure you are using a supported protocol (HTTPS) and try again.</p>`;
    }
}

// function bindData(articles) {
//     const container = document.getElementById("cards-container");
//     container.innerHTML = ''; // Clear existing content
//     articles.forEach(article => {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//             <h2>${article.title}</h2>
//             <p>${article.description}</p>
//             <a href="${article.url}" target="_blank">Read more</a>
//         `;
//         container.appendChild(card);
//     });
// }

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


// Example usage
fetchNews('latest'); // Replace 'latest' with your desired query


// window.addEventListener("load", () => fetchNews("India"));

// function reload() {
//     window.location.reload();
// }

// async function fetchNews(query) {
//     try {
//         const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//         if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         if (data && Array.isArray(data.articles)) {
//             bindData(data.articles);
//         } else {
//             throw new Error("Invalid response structure");
//         }
//     } catch (error) {
//         console.error("Error fetching news:", error);
//         document.getElementById("cards-container").innerHTML = `<p>Error fetching news: ${error.message}</p>`;
//     }
// }

// async function fetchNews(query) {
//     try {
//         const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//         if (!res.ok) {
//             if (res.status === 426) {
//                 throw new Error('Upgrade Required: Please switch to a supported protocol.');
//             } else {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//         }
//         const data = await res.json();
//         if (data && Array.isArray(data.articles)) {
//             bindData(data.articles);
//         } else {
//             throw new Error("Invalid response structure");
//         }
//     } catch (error) {
//         console.error("Error fetching news:", error);
//         document.getElementById("cards-container").innerHTML = `<p>Error fetching news: ${error.message}</p>`;
//     }
// }


// function bindData(articles) {
//     const cardsContainer = document.getElementById("cards-container");
//     const newsCardTemplate = document.getElementById("template-news-card");

//     cardsContainer.innerHTML = "";

//     articles.forEach((article) => {
//         if (!article.urlToImage) return;
//         const cardClone = newsCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone, article);
//         cardsContainer.appendChild(cardClone);
//     });
// }

// function fillDataInCard(cardClone, article) {
//     const newsImg = cardClone.querySelector("#news-img");
//     const newsTitle = cardClone.querySelector("#news-title");
//     const newsSource = cardClone.querySelector("#news-source");
//     const newsDesc = cardClone.querySelector("#news-desc");

//     newsImg.src = article.urlToImage;
//     newsTitle.innerHTML = article.title;
//     newsDesc.innerHTML = article.description;

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Jakarta",
//     });

//     newsSource.innerHTML = `${article.source.name} · ${date}`;

//     cardClone.firstElementChild.addEventListener("click", () => {
//         window.open(article.url, "_blank");
//     });
// }

// let curSelectedNav = null;
// function onNavItemClick(id) {
//     fetchNews(id);
//     const navItem = document.getElementById(id);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = navItem;
//     curSelectedNav.classList.add("active");
// }

// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });

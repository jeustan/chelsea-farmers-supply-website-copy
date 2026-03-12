const loadSubstackRSS = async () => {

//     const buildCard = (post, opts) => {
//         const a = document.createElement('a');
//         a.className = 'substack-card';
//         a.target = '_blank';
//         a.rel = 'noopener';
//         a.href = post.link;

//         const wrap = document.createElement('div');
//         wrap.className = 'substack-post';

//         if (opts.showImages) {
//             const imgUrl = extractFirstImg(post.content);
//             if (imgUrl) {
//                 const img = document.createElement('img');
//                 img.className = 'substack-thumbnail';
//                 img.loading = 'lazy';
//                 img.sizes = '568px';
//                 img.alt = post.title || 'Substack post image';
//                 img.src = imgUrl;
//                 wrap.appendChild(img);
//             }
//         }

//         const body = document.createElement('div');

//         const h3 = document.createElement('h3');
//         h3.className = 'substack-title';
//         h3.textContent = post.title || 'Untitled';
//         body.appendChild(h3);

//         if (opts.showDates && post.pubDate) {
//             const pDate = document.createElement('p');
//             pDate.className = 'substack-date';
//             pDate.textContent = fmtDate(post.pubDate);
//             body.appendChild(pDate);
//         }

//         const pContent = document.createElement('div');
//         pContent.className = 'substack-content';
//         pContent.innerHTML = truncateContent(post.content);
//         body.appendChild(pContent);
    
//         wrap.appendChild(body);

//         // Make whole card link to substack post
//         // a.appendChild(wrap);
//         return wrap

// };


    fetch('/.netlify/functions/substack-feed')
    .then(r => r.text())
    .then(xml => {
        console.log('Fetched RSS feed:', xml);

        const parser = new DOMParser();
        const feed = parser.parseFromString(xml, "text/xml");
        const items = feed.querySelectorAll("item");
        const rssContainer = document.getElementById("rss-feed");
        rssContainer.innerHTML = ''; // Clear any existing content

        if (rssContainer) {
            items.forEach(item => {
                const title = item.querySelector("title") ? item.querySelector("title").textContent : "No title";
                const link = item.querySelector("link") ? item.querySelector("link").textContent : "#";
                const pubDate = item.querySelector("pubDate") ? new Date(item.querySelector("pubDate").textContent).toLocaleDateString() : "No date";
                
                const article = document.createElement("article");
                article.className = "rss-item";
                article.innerHTML = `
                    <h3><a href="${link}" target="_blank" rel="noopener">${title}</a></h3>
                    <p class="pub-date">${pubDate}</p>
                `;
                rssContainer.appendChild(article);
            });
        } else {
            console.warn('RSS container not found');
        }       
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        loadSubstackRSS(); 
    }, 50);
});
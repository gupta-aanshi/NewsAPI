const apiKey = "475af5a6250f4bda90771a28d2ee00c9";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button")

async function fetchRandomNews(){
    try{
     const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

     const response = await fetch(apiUrl);/*first it was showing error at await then it said that we can only use await if the function is async*/
     const data = await response.json();/*converted api into json format*/
     return data.articles;
     

     /*We are using back ticks to make this url dynamic*/
     /*We have taken the url till "country=us"*/
     /*We are using page size 10 as we only want to fetch 10 data items and after page size we are going to add api key*/
     /*now we are fetching data using await*/
     /*After fetching data we are now converting our response in JSon format*/


    }catch(error){
        console.error("Error fetching random news.",error);
        return [];
    }
}

searchButton.addEventListener("click",async () =>{
    const query = searchField.value.trim();
    if(query !==""){
        try{
             const articles = await fetchNewsQuery(query)
             displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        /*idhr url jo copy hoga voh hume question mark ke bad wale ek work tk ka lena hai,before the equal sign */
        /*instead of techcrunch we are writing query to make the query dynamic*/
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
   
        const response = await fetch(apiUrl);/*first it was showing error at await then it said that we can only use await if the function is async*/
        const data = await response.json();/*converted api into json format*/
        return data.articles;
        
   
        /*We are using back ticks to make this url dynamic*/
        /*We have take the url till "country=us"*/
        /*We are using page size 10 as we only want to fetch 10 data items and after page size we are going to add api key*/
        /*now we are fetching data using await*/
        /*After fetching data we are now converting our response in JSon format*/
   
   
       }catch(error){
           console.error("Error fetching random news.",error);
           return [];
       }
}


/*this function will actually generate our ads*/
function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) =>{
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")

        const img = document.createElement("img")
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2")
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "......":article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p")
        const truncatedDescription = article.description.length > 120 ? article.description.slice(0,120) + "......":article.description;
        description.textContent = truncatedDescription;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        /*for opening our blog cards and opening into a new window*/
        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank")
        })

        blogContainer.appendChild(blogCard)
        

        

    })
}

(async () => {
    try{
       const articles =  await fetchRandomNews();
       /*console.log(articles);*/
           
       /*Instead of this we will create a function for displaying news on the blog cards*/
       displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
    }
})();
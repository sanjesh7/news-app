const api_key="d45bf64f75e346c2b3fd609bbdb4f828";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{
    fetchurl("Todays worldwide ");
})

const reload=()=>{
    window.location.reload();
}

const fetchurl=async(query)=>{
  const res=await fetch(`${url}${query}&apiKey=${api_key}`);
  const data=await res.json();
   binddata(data.articles);
}

const binddata=(articles)=>{
    const cardcontainer=document.getElementById("cards-container");
    const newscardtemplate=document.getElementById("template-news-card");

    cardcontainer.innerHTML="";

     articles.forEach(article => {
        if(!article.urlToImage) return;
            const clone=newscardtemplate.content.cloneNode(true);
            filldata(article,clone);
            cardcontainer.appendChild(clone);
     });
    
}



const filldata=(article,cardClone)=>{
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

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

}

const onNavItemClick=(query)=>{
    fetchurl(query);
}

document.getElementById("search-button").addEventListener("click",()=>{
   
    const ele= document.getElementById("search-text").value;
     if(!ele) return;
     fetchurl(ele);
     
})
document.getElementById("search-text").addEventListener("click",()=>{
    document.getElementById("search-text").value="";
})

var val=0;
document.getElementById("change-color").addEventListener("click",()=>{
    document.querySelector("body").classList.toggle("dark");
    document.querySelector("nav").classList.toggle("dark");
    if(val==0){
    document.getElementById("change-color").src="images/sun.png";
    val=1;
    }
    else{
        document.getElementById("change-color").src="images/darkmode1.png";
        val=0;
    }
})



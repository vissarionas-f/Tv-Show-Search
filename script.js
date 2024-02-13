const form = document.querySelector("#search");
const shows = document.querySelector("#results");
const actors = document.querySelector("#results-actors");
const clearsearch = document.querySelector("#clear");
const h2 = document.querySelector("h2");


clearsearch.addEventListener("click", () => {
    shows.innerHTML = "";
    actors.innerHTML = "";
    h2.innerHTML = "";
    form.elements.query.value = "";
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    searchSeries();
});

// getting the API data
const searchSeries = async () => {
    try {
        const searchTerm = form.elements.query.value;
        if (searchTerm === "") {
             noquery(); 
        } else {
            const terms = { params: { q: searchTerm } };
            const res = await axios.get(`http://api.tvmaze.com/search/shows?q=`, terms);
            searchShows(res.data);
            const peo = await axios.get(`http://api.tvmaze.com/search/people?q=`, terms);
            searchPeople(peo.data);
            form.elements.query.value = "";
        }
    } catch {
        const err = document.createElement("h5");
        err.className = "text-center error-msg";
        err.innerText = "something happened, try again later...or don't";
        shows.appendChild(err);
    }
};

// functions
const noquery = () => {
    alert("please type a show or an actor");
    // h2.innerHTML = "please type a show or an actor";
    // shows.innerHTML = "";
    // actors.innerHTML = "";
    form.elements.query.value = "";
}

const searchShows = (tv) => {
    shows.innerHTML = ""; //clear results to add the new ones
    for (let i of tv) {
        if (i.show.image) {
            let img = i.show.image.medium;
            let title = i.show.name;
            let summary = i.show.summary;
            shows.appendChild(card(img, title, summary));
        }
    }
};

const searchPeople = (actor) => {
    actors.innerHTML = ""; //clear results to add the new ones
    h2.innerHTML = "";
    for (let i of actor) {
        if (i.person.image) {
            h2.innerHTML = "Actors"; //i put it here to be displayed if there are actors
            h2.className = "actor-h"
            let img = i.person.image.medium;
            let title = i.person.name;
            let summary = `${title} is from the ${i.person.country.name}<br> Born on ${i.person.birthday}`;
            actors.appendChild(card(img, title, summary));
        }
    }
}

const card = (imgs, titles, text) => { //building the card
    //making the first div
    let div = [];
    div[1] = document.createElement("div");
    div[1].className = "col-md-12 align-self-center";
    
    //creating 3 more divs, nested inside the other
    for (let i = 2; i < 5; i++) {
        div[i] = document.createElement("div");
        div[i - 1].appendChild(div[i]);
    }

    div[2].className = "card";
    div[2].id = "results-card";
    div[3].className = "row g-0";
    div[4].className = "col-lg-4 d-flex justify-content-center align-items-center";
    
    //card-img
    const img = document.createElement("img");
    img.className = "img-fluid";
    img.src = imgs;
    div[4].appendChild(img);

    //creating the last 2 divs for title and text
    div[5] = document.createElement("div");
    div[5].className = "col-lg-8";
    div[3].appendChild(div[5]);
    div[6] = document.createElement("div");
    div[6].className = "card-body";
    div[5].appendChild(div[6]);

    //title
    const h5 = document.createElement("h5");
    h5.className = "card-title text-center";
    h5.innerHTML = titles;
    div[6].appendChild(h5);

    //texts
    const p = document.createElement("p");
    p.className = "card-text";
    p.innerHTML = text;
    div[6].appendChild(p);

    return div[1];
}

// When the user scrolls down numberpx from the top of the document, show the button
mybutton = document.getElementById("scrollButton");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
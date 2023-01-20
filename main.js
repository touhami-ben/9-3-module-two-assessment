




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {


 // Add code you want to run on page load here
//  let filmArr;
const API_BASE = "https://resource-ghibli-api.onrender.com";
fetch(`${API_BASE}/films`)
.then((res) => res.json())
.then((res) => {
    console.log(res);

    const titles = document.querySelector("#titles")
    // console.log(titles)

    for (let i = 0; i < res.length; i++) {
        const option = document.createElement("option");
        option.value = res[i].title;
        option.id = res[i].id

        option.textContent = res[i].title;
        titles.append(option);

        titles.addEventListener("change", (e)=> {
            e.preventDefault();

            if(e.target.value === res[i].title) {
                const display = document.querySelector("div#display-info");
                display.innerHTML = "";

                const movieTitle = document.createElement("h3");

                movieTitle.textContent = `${res[i].title}`;

                const releaseDate = document.createElement("p");
                releaseDate.textContent = `${res[i].release_date}`;

                const description = document.createElement("p");
                description.textContent = `${res[i].description}`;

                display.append(movieTitle, releaseDate, description);
            }
        });
    }

    const form = document.querySelector("form");
    const review = document.querySelector("#review");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // console.log(event);

        if(titles.value === "") {
            alert("Please select a movie first");

        }else {
            let film = res.find((film) => {
                return film.title === titles.value;
                
            });
            // console.log(film)

            const ul = document.querySelector("ul");
            const li = document.createElement("li");
            li.textContent = "";
            li.innerHTML = `<strong>${film.title}: </strong> ${review.value}`;
            ul.append(li);
            form.reset();
        }
    });

    const resetReviews = document.querySelector("#reset-reviews");
    const ul = document.querySelector("ul");
    resetReviews.addEventListener("click", (event) => {
        ul.innerHTML = "";
    });

    const button = document.querySelector("#show-people");

    button.addEventListener("click", (e) => {
        e.preventDefault();

        const ol = document.querySelector("ol")
        ol.textContent = "";

        fetch(`${API_BASE}/people`)
        .then((res) => res.json())
        .then((people) => {
            // console.log(people)

            let movieId;
            for(let movie of res) {
                if(movie.title === titles.value){
                    movieId = movie.id
                }
            }

            console.log("movieId", movieId)
            for( let person of people) {
                for( let movie of person.films) {
                    // console.log(movie)
                    if(movie.includes(movieId)) {
                        const li = document.createElement("li")
                        li.textContent = person.name
                        ol.append(li)
                    }
                }
            }
            console.log(movieId)
        })
        .catch((error) => console.log(error));

    })
})
.catch((error) => console.log(error));
}




   

    
    


 


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

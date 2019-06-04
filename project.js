const movieName = document.getElementById("movieName");
const movieYear = document.getElementById("movieYear");
const movieRating = document.getElementById("movieRating");
const addButton = document.getElementById("addButton");
const info = document.getElementById("info");
const inputContainer = document.getElementById("inputContainer");
const tableContainer = document.getElementById("tableContainer");
const clearMovies = document.getElementById("clearMovies");

//* Add event listener to the submit button:
addButton.addEventListener("click", addMovie);

//* Add event listener to the enter button:
document.addEventListener("keypress", pressEnter);

//* Add event listener when page loads:
document.addEventListener("DOMContentLoaded", storageToUI);

//* add eventListener to container:
document.addEventListener("click", removeMovie);

//* Add event listener to the clear button:
clearMovies.addEventListener("click", clearStorage);

function addMovie(el) {
    if (
        movieName.value === "" ||
        movieYear.value === "" ||
        movieRating.value === "Choose rating..."
    ) {
        showAlert("dark", "Oh snap!! You should fill all required areas.");
    } else {
        //* Create movie object and add to UI:
        const movie = new Movie(movieName.value, movieYear.value, movieRating.value);
        UserInterface.addMovieToUI(movie);
        UserInterface.clearInput(movieName, movieYear, movieRating);

        //* Hide info message:
        info.className = "d-none";

        showAlert("warning", "Great!! You added a Movie.");
        LocalStorage.addMovieToStorage(movie);
    }

    el.preventDefault();
}

function showAlert(type, message) {
    //* create alert element:
    const new_alert = document.createElement("div");
    new_alert.className = `alert alert-${type}`;
    new_alert.setAttribute("role", "alert");
    new_alert.style.marginTop = "10px";
    new_alert.appendChild(document.createTextNode(message));

    if (type === "dark") {
        if (movieName.value === "") {
            movieName.style.borderWidth = "2px";
            movieName.style.borderColor = "#343a40";
        }
        if (movieYear.value === "") {
            movieYear.style.borderWidth = "2px";
            movieYear.style.borderColor = "#343a40";
        }
        if (movieRating.value === "Choose rating...") {
            movieRating.style.borderWidth = "2px";
            movieRating.style.borderColor = "#343a40";
        }
    }

    //* add alert element to the submit form
    inputContainer.appendChild(new_alert);

    //* after 2.0s remove alert element if success:
    setTimeout(function() {
        new_alert.remove();
        movieYear.removeAttribute("style");
        movieName.removeAttribute("style");
        movieRating.removeAttribute("style");
    }, 2000);
}

function storageToUI() {
    let movies;

    movies = LocalStorage.getMovieFromStorage();

    if (movies.length === 0) {
        // info.className = "d-block alert alert-info";
    } else {
        // info.className = "d-none";
        movies.forEach(el => {
            UserInterface.addMovieToUI(el);
        });
    }

    if (movies.length === 0) {
        info.className = "d-block alert alert-warning";
    } else {
        info.className = "d-none";
    }
}

function removeMovie(el) {
    if (el.target.id === "removeButton") {
        if (confirm("Do you want to remove this Movie?")) {
            UserInterface.removeMovieFromUI(el);
            movieTitle =
                el.target.parentElement.previousElementSibling.previousElementSibling
                    .previousElementSibling.textContent;
            LocalStorage.removeMovieFromStorage(
                LocalStorage.getMovieFromStorage(),
                movieTitle
            );
        }
    }
}

function clearStorage() {
    LocalStorage.clearMoviesFromStorage();
}

function pressEnter(el) {
    if (el.key === "Enter") {
        addMovie(el);
    }
}

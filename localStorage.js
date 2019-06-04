class LocalStorage {
    static addMovieToStorage(movie) {
        let movies;

        //* first check if storage is empty or not, then push new one:
        if (localStorage.getItem("movies") === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem("movies"));
        }

        movies.push(movie);

        //* add array to the local storage:
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    static getMovieFromStorage() {
        let movies;

        if (localStorage.getItem("movies") === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem("movies"));
        }
        return movies;
    }

    static clearMoviesFromStorage() {
        const table_items = document.getElementById("movieList");

        if (confirm("Do you want to clear all Movies?")) {
            localStorage.clear();

            while (table_items.hasChildNodes()) {
                table_items.removeChild(table_items.firstChild);
            }
            info.className = "d-block alert alert-warning";
        }
    }

    static removeMovieFromStorage(movies, movieTitle) {
        movies.forEach((movie, index) => {
            if (movie.name === movieTitle) {
                movies.splice(index, 1);
            }
        });

        localStorage.setItem("movies", JSON.stringify(movies));

        if (movies.length === 0) {
            info.className = "d-block alert alert-warning";
        } else {
            info.className = "d-none";
        }
    }
}

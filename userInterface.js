class UserInterface {
    static addMovieToUI(movie) {
        const movieList = document.getElementById("movieList");

        movieList.innerHTML += `
        <tr>
            
            <td>${movie.name}</td>
            <td>${movie.year}</td>
            <td>${movie.rating}</td>
            <td>
                <button id="removeButton" type="submit" class="btn btn-outline-dark" style="margin-top: -8px">
                    Remove Movie
                </button>
            </td>
    </tr>`;
    }

    static removeMovieFromUI(el) {
        if (el.target.id === "removeButton") {
            el.target.parentElement.parentElement.remove();
        }
    }

    static clearInput(movieName, movieYear, movieRating) {
        movieName.value = "";
        movieYear.value = "";
        movieRating.value = "Choose rating...";
    }
}

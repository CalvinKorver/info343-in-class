"use strict";

//base URL for the Spotfiy api
//see https://developer.spotify.com/web-api/search-item/
//The ? separates the URL path from the "query string"
//A query string is a set of name/value pairs. They are
//commonly used in APIs to specify parameters.
//We are passing two parameters here: type=track (search only for tracks)
//and q=... (string to search for, which we will get from the user)
var baseURL = "https://api.spotify.com/v1/search?type=track&q=";


var queryResults = document.querySelector(".query-results");
var searchForm = document.querySelector(".search-form");
var spinner = document.querySelector("header .mdl-spinner");

/* Finds elements inside the form, not in the whole page */
var searchInput = searchForm.querySelector("input");
var searchButton = searchForm.querySelector("button");

var previewAudio = new Audio();

/* ----------------------------------------------------------   */

function doAnimation(elem, aniName) {
    elem.classList.add("animated", aniName); /* Adds the "animated" style class and whatever animation we want to perform */
    elem.addEventListener("animationend", function() {
        elem.classList.remove(aniName); // Once the animation done, removes it
    });
}



function renderTrack(track) {
    /* -- Creating images   --*/
    var img = document.createElement("img");
    img.src = track.album.images[0].url; // Accesing images[] b/c multiple imgs
    img.alt = track.name; // Setting alt for screen readers
    img.title = img.alt;
    doAnimation(img, "fadeInDownBig");
   

    /*-- Working with audio -- */
    img.addEventListener("click", function() { 
        if (previewAudio.src !== track.preview_url) { // Clicking new track
            previewAudio.pause();
            previewAudio = new Audio(track.preview_url);
            previewAudio.play();
        } else { // if we've clicked on the exact same tracks
            if (previewAudio.paused) {
                previewAudio.play();
            } else {
                previewAudio.pause();
            }
        }

        doAnimation(img, "pulse");
    });

     queryResults.appendChild(img); // Append makes it show up on the page


}

function render(data) {
    console.log(data);
    queryResults.innerHTML = ""; //Clears out any content that used to be there

    if (data.error || 0 == data.tracks.items.length) {
        renderError(data.error); // Calls renderError function for console log
    } else {
        data.tracks.items.forEach(renderTrack); // Get to the item we want
    }
    
}

function renderError(err) {
    console.error(err);
    var message = document.createElement("p"); // creates paragraph tag
    message.classList.add("error-message");
    message.textContent = err.message; // shows up in text contentq
    queryResults.appendChild(message);
}


/* In-line event handler (inner function for "submit" event) */
searchForm.addEventListener("submit", function(evt) {
    /* Prevents the default event, which is to gather all the data and send it to a remote site */
    evt.preventDefault();
    var query = searchInput.value.trim(); //delets before, after spce
    
    /* Stop users from failing */
    if (query.length <= 0) {
        return false;
    }
    
    
    fetch(baseURL + query) // A get request to the server using AJAX
        .then(function(response) {
            return response.json(); /* The function json returns another "promise", which we return internally, then we can chain another .then function */
        })
        
        .then(render)
        .catch(renderError);
    
           
    // console.log("Got submit event");
    

    return false; // Required
});




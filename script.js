// Function to fetch a random quote from the Quotable API
function fetchRandomQuote() {
    // Construct the URL with parameters <--Need this for ILS software (outside this project)
    const url = "https://api.quotable.io/random?tags=technology";

    fetch(url)  
        .then(response => response.json()) /*Need to learn Javascript syntax */
        .then(data => {
            var quote = data.content;
            var author = data.author;

            // Update content the quote container with the fetched quote
            var quoteElement = document.querySelector('.quote-container blockquote');
            quoteElement.innerHTML = quote;

            // Update the content of the <cite> element with the author's name
            var authorElement = document.querySelector('.quote-container cite');
            authorElement.innerHTML = author;
        })

        .catch(error => {   /* Important */
            console.error('Error:', error);
        });
}

/* //This is the old code for my own educational purposes.

function fetchRandomQuote() {
    fetch("https://api.quotable.io/random?tags=technology")
        .then(response => response.json())
        .then(data => {
            var quote = data.content;
            var author = data.author;

            // Update the content of the quote container with the fetched quote
            var quoteElement = document.querySelector('.quote-container blockquote');
            quoteElement.innerHTML = quote;

            // Update the content of the <cite> element with the author's name
            var authorElement = document.querySelector('.quote-container cite');
            authorElement.innerHTML = author;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
*/

// Fetches a random quote when the page loads
window.addEventListener('load', fetchRandomQuote);

// Adds "click event listener" to the quote container - Add listener to defs
document.getElementById('quoteContainer').addEventListener('click', fetchRandomQuote);

// Adds event listener for "keydown event" on input field, NOTE TO SELF: keydown event = press a key, something happens
document.getElementById('input').addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') { // Check if the pressed key is Enter
        // Call the getBooks function
        getBooks(); // Call the getBooks function
    }
});

// Get books API and loading button script
function getBooks() {
    // Show the loading button
    document.getElementById('loadingButton').style.display = 'inline-block';
    
    // Clear previous search result 
    document.getElementById('output').innerHTML = "";
    
    // I can has concatenation? Get it? Cat?
    fetch("https://openlibrary.org/search.json?q=" + document.getElementById("input").value) 
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 20; i++) {
                var title = data.docs[i].title ? data.docs[i].title : "Title not available";
                var author = data.docs[i].author_name ? data.docs[i].author_name[0] : "Author not available";
                var isbn = data.docs[i].isbn ? data.docs[i].isbn[0] : "";
                
                document.getElementById("output").innerHTML += 
                /*"<h2>" + title + "</h2>" + // Without the link - to compare for my own educational purposes*/
                "<h2><a href='https://openlibrary.org/search?q=" + title.replace(/ /g, '+') + "' target='_blank'>" + title + "</a></h2>" +
                "<p>Author: " + author + "</p>" +
                (isbn ? "<a href='https://openlibrary.org/isbn/" + isbn + "' target='_blank'>" +
                        "<img src='https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg'></a><br>" : "");            
}
            // Hides loading button
            document.getElementById('loadingButton').style.display = 'none';
            
            // Clears the search box -- I kept putting this in the wrong place! But here it is in its proper home.
            document.getElementById('input').value = "";
            
        })
        .catch(error => {
            console.error('Error:', error);
            // Hide the loading button in case of an error
            document.getElementById('loadingButton').style.display = 'none';
        });
}

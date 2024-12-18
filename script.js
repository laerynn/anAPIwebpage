function fetchRandomQuote() {
    // The Quotable API URL
    const url = "https://api.quotable.io/random";

    fetch(url)  // Make a GET request to the API
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            const quote = data.content;  // Get the quote content
            const author = data.author;  // Get the author

            // Find the quote and author elements in the DOM
            const quoteElement = document.querySelector('.quote-container blockquote');
            const authorElement = document.querySelector('.quote-container cite');

            // Update the DOM with the new quote and author
            quoteElement.innerHTML = `"${quote}"`;
            authorElement.innerHTML = `&mdash; ${author}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);  // Log any errors
        });
}

// Fetch a random quote when the page loads
window.addEventListener('load', fetchRandomQuote);

// Add click event listener to the quote container to fetch a new quote on click
document.getElementById('quoteContainer').addEventListener('click', fetchRandomQuote);

/* 
// Function to fetch a random quote from ZenQuote API
function fetchRandomQuote() {
    // URL with parameters
    const url = "https://zenquote.io/api/random";

    // Fetching the quote data
    fetch(url)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Accessing the first quote from the JSON array
            const quote = data[0].q; // Quote text
            const author = data[0].a; // Author name

            // Find the quote container elements
            const quoteElement = document.querySelector('.quote-container blockquote');
            const authorElement = document.querySelector('.quote-container cite');

            // Update the quote text and author
            quoteElement.innerHTML = `"${quote}"`;
            authorElement.innerHTML = `&mdash; ${author}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
}

// Fetch a random quote when the page loads
window.addEventListener('load', fetchRandomQuote);

// Add click event listener to the quote container
document.getElementById('quoteContainer').addEventListener('click', fetchRandomQuote);


/* Old code for educational purposes
    fetch(url)
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

//This is the old code for my own educational purposes.

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

/*
// Fetch a random quote when the page loads
// old code: window.addEventListener('load', fetchRandomQuote);
window.addEventListener('load', function () {
    fetchRandomQuote(); // Fetch the initial quote when the page loads
    document.getElementById('newQuoteButton').style.display = 'inline-block'; // Show the button after page loads
});

// Add click event listener to the quote container
document.getElementById('quoteContainer').addEventListener('click', fetchRandomQuote);
*/



// Add event listener for keydown event on input field
document.getElementById('input').addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') { // Check if the pressed key is Enter
        // Call the getBooks function
        getBooks(); // Call the getBooks function
            // Clear the search box
     document.getElementById('input').value = "";
    }
});

// Get books API and loading button script
function getBooks() {
    // Show the loading button
    document.getElementById('loadingButton').style.display = 'inline-block';
    
    // Clear previous search result
    document.getElementById('output').innerHTML = "";

    fetch("https://openlibrary.org/search.json?q=" + document.getElementById("input").value)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 20; i++) {
                var title = data.docs[i].title ? data.docs[i].title : "Title not available";
                var author = data.docs[i].author_name ? data.docs[i].author_name[0] : "Author not available";
                var isbn = data.docs[i].isbn ? data.docs[i].isbn[0] : "";
                
                document.getElementById("output").innerHTML += 
                /*"<h2>" + title + "</h2>" + //Without the link - to compare for my own educational purposes*/
                "<h2><a href='https://openlibrary.org/search?q=" + title.replace(/ /g, '+') + "' target='_blank'>" + title + "</a></h2>" +
                "<p>Author: " + author + "</p>" +
                (isbn ? "<a href='https://openlibrary.org/isbn/" + isbn + "' target='_blank'>" +
                        "<img src='https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg'></a><br>" : "");            
}
            
            // Hide the loading button
            document.getElementById('loadingButton').style.display = 'none';

              // Clear the search box
              document.getElementById('input').value = ""; // Clear the input field
        })

        .catch(error => {
            console.error('Error:', error);
            // Hide the loading button in case of an error
            document.getElementById('loadingButton').style.display = 'none';
        });
}

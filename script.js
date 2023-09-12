const searchQuery = document.getElementById("search_query");
const booksToDisplay = 5;

async function GetBooks() {
    const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery.value}`;
    const response = await fetch(endpoint);
    const json = await response.json();

    const books = document.querySelector(".books");
    const numBooks = Math.min(booksToDisplay, json.totalItems);


    
    books.innerHTML = "";
   
    for (let i = 0; i < numBooks; i++) {
        const newBook = document.createElement("div");
        newBook.style.padding = "10px 10px 10px 10px";

        if (i % 2 == 0) {
            newBook.style.backgroundColor = 'rgb(240, 240, 255)';
        } else{
            newBook.style.backgroundColor = 'lightcyan';
        }

        const newTitle = document.createElement("h3");
        newTitle.classList.add("book_title");
        newTitle.innerHTML = json.items[i].volumeInfo.title;
        newBook.appendChild(newTitle);

        const authors = json.items[i].volumeInfo.authors.join(", ");
        if (authors) {
            const newAuthors = document.createElement("h4");
            newAuthors.style.color = "grey";
            newAuthors.innerHTML = "Authors: " + authors;
            newBook.appendChild(newAuthors);
        }
        

        if (json.items[i].volumeInfo.description) {
            const newDescription = document.createElement("p");
            newDescription.class = "article_description";
            newDescription.innerHTML = json.items[i].volumeInfo.description;
            newBook.appendChild(newDescription);
        }

        if (json.items[i].volumeInfo.infoLink) {
            const newLink = document.createElement("a");
            newLink.href = json.items[i].volumeInfo.infoLink;
            newLink.innerHTML = "<p>More info</p>";
            newBook.appendChild(newLink);
        }

        if (json.items[i].volumeInfo.imageLinks.thumbnail) {
            const newImage = document.createElement("img");
            newImage.src = json.items[i].volumeInfo.imageLinks.thumbnail;
            newBook.appendChild(newImage);
        }

        books.appendChild(newBook);
    }
}

document.getElementById("search_button").addEventListener("click", GetBooks);
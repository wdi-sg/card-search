function addDivToPage(divContent){
    // I intend to use this function to add squares containing some text to the document. IT doesn't seem to be working so well...
    var element = document.createElement('div');
    element.textContent = divContent;
    document.appendChild(element);
}

function handleDataLoaded(){
    // This function should take the data that the server sends to you, and show snippets of text inside boxes that are to be displayed in a grid.

    // Every second square should have its background slightly tinted gray to give a chessboard-like aesthetic.
    
}

function handleSearch(event){
    // This function is called when the user clicks the search button. It should make it so that only the squares containing text that match what the user typed in are displayed. Squares that do not contain text that match the user's input should be hidden.

    // If the user's input is an empty string, all the squares should be displayed!

    // Bonus: Highlight the parts of the text that match the user's input.
}

// This function is called when the button labeled "Get Data" is pressed. Its purpose is to fetch data from the server, which will arrive in JSON format. But somehow this function sometimes behaves oddly, especially when the connection to the server is unreliable or slow......
function getData(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('error', function(){console.log('Something went wrong')});
    xhr.addEventListener('load', handleDataLoaded);
    xhr.open('GET', '/db.json', false);
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function(){
    var searchInput = document.querySelectorAll('input')[1];
    searchInput.addEventListener('click', handleSearch);

    document.querySelector('button').addEventListener('click', getData);
})
function addDivToPage(divContent){
    // I intend to use this function to add squares containing some text to the document. IT doesn't seem to be working so well...
    var element = document.createElement('div');
    element.textContent = divContent;
    document.appendChild(element);
}

function handleDataLoaded(response){
    // This function should take the data that the server sends to you, and show snippets of text inside boxes that are to be displayed in a grid.
    var res = JSON.parse(this.responseText);
    console.log(res);
    var con = document.getElementsByClassName('container')[0];
    var count = 0;
    for(var key in res) {
        console.log(key);
        var stuff = document.createElement('div');
        stuff.classList.add('box');

        var heading = document.createElement('div');
        var quote = document.createElement('div');

        //to cut the words in the quote
        var arr = res[key].split('');
        arr = arr.slice(0,20);
        arr.push('...');

        heading.innerText = key.toString();
        quote.innerText = arr.join('');

        //to make the chessboard effect
        if(count%2 == 0) {
            stuff.style.backgroundColor = 'grey';
        }
        count++;

        stuff.appendChild(heading);
        stuff.appendChild(document.createElement('br'));
        stuff.appendChild(quote);
        con.appendChild(stuff);
    }
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
    xhr.open('GET', 'http://10.193.240.98/names/', true);
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function(){
    var searchInput = document.querySelectorAll('input')[1];
    searchInput.addEventListener('click', handleSearch);

    document.querySelector('button').addEventListener('click', getData);
})
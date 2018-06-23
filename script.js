

function addDivToPage(name, snippet){
    // I intend to use this function to add squares containing some text to the document. IT doesn't seem to be working so well...


    // create div elements, set innerHTML to parameter given and set class to "box"
    var element = document.createElement('div');
    element.innerHTML = name + "<br><br>" + snippet;
    element.className = "box";
    element.dataset.name = name;
    element.dataset.type = 0;
    element.addEventListener("click", function() {
        var nm = this.dataset.name;
        var tp = this.dataset.type;
        if (tp === "0") {
            this.innerHTML = nm + "<br><br>" + db[nm];
            this.dataset.type = 1;
        } else {
            this.innerHTML = nm + "<br><br>" + db[nm].slice(0,25) + "...";
            this.dataset.type = 0;
        }
    })


    // append the divs to the container div
    var container = document.getElementsByClassName("grid-container")[0];
    container.appendChild(element);
}

function handleDataLoaded(){


    // This function should take the data that the server sends to you, and show snippets of text inside boxes that are to be displayed in a grid.
    var container = document.getElementsByClassName("grid-container")[0];
    while (container.childElementCount > 0) {
        container.removeChild(container.firstChild);
    }


    // pass characters' names and their quotes as parameters to addDivToPage function
    var whiteColor = true;
    for (character in db) {
        var name = character;
        var snippet = db[character].slice(0, 25) + "...";
        addDivToPage(name, snippet);


        // Every second square should have its background slightly tinted gray to give a chessboard-like aesthetic.
        if (whiteColor === true) {
            container.lastChild.style.backgroundColor = "white";
            whiteColor = false;
        } else {
            container.lastChild.style.backgroundColor = "gray";
            container.lastChild.style.color = "white";
            whiteColor = true;
        }
    }
}

function handleSearch(event){


    // This function is called when the user clicks the search button. It should make it so that only the squares containing text that match what the user typed in are displayed. Squares that do not contain text that match the user's input should be hidden.
    // event.preventDefault();
    var search = document.getElementById("search");
    var box = document.getElementsByClassName("box");


    // Bonus: Highlight the parts of the text that match the user's input.
    // remove highlighted words
    if (document.getElementsByClassName("highlight").length > 0) {
        document.getElementsByClassName("highlight")[0].classList.remove("highlight");    
    }
    for (var i = 0; i < box.length; i++) {
        if (box[i].textContent.toLowerCase().includes(search.value)) {


            // picks out the snippet that contains the text
            var matched = box[i].innerHTML;
            var start = matched.toLowerCase().indexOf(search.value);
            var toChange = matched.slice(start, start + search.value.length);


            // replace the target string into a span with class highlight
            var newMatched = matched.replace(toChange, "<span class='highlight'>" + toChange + "</span>");
            box[i].innerHTML = newMatched;
        }
    }


    // If the user's input is an empty string, all the squares should be displayed!
    if (search.value === "") {
        for (var i = 0; i < box.length; i++) {
            box[i].style.visibility = "visible";
        }
    }
}


// This function is called when the button labeled "Get Data" is pressed. Its purpose is to fetch data from the server, which will arrive in JSON format. But somehow this function sometimes behaves oddly, especially when the connection to the server is unreliable or slow......
// function getData(){
//     var xhr = new XMLHttpRequest();
//     xhr.addEventListener('error', function() {
//         console.log('Something went wrong');
//     });
//     xhr.addEventListener('load', handleDataLoaded);
//     xhr.open('GET', "http://10.193.240.98/names/");
//     xhr.send();
// }

document.addEventListener('DOMContentLoaded', function(){
    var searchInput = document.getElementsByTagName('input')[1];
    searchInput.addEventListener('click', handleSearch);
    document.addEventListener('keypress', function(event) {
        if (event.code === "Enter") {
            handleSearch();
        }
    });


    // document.querySelector('button').addEventListener('click', getData);
    document.querySelector('button').addEventListener('click', handleDataLoaded);
})

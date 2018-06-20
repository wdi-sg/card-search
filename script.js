function addDivToPage(divContent){
  // create the div
  var element = document.createElement('div');

  // set the inner html
  element.innerHTML = divContent;

  // attach the event handler
  element.addEventListener('click', slideOpenTextBox);

  // get the parent and append child
  var container = document.querySelector('.container');
  container.appendChild(element);
};

function slideOpenTextBox() {
  // check if the card has the class of expanded box
  if (this.classList[0] === 'expanded-box') {
    // remove the class
    this.classList.remove('expanded-box');

    // get the key for the db (aka the person's name)
    var key = this.innerHTML.split('<br>')[0]

    // get their message and truncate it
    var words = db[key].slice(0,25) + "...";
    var message = key + "</br></br>" + words

    // set the innerhtml of the card to the message
    this.innerHTML = message
  } else {
    // add the class
    this.classList.add('expanded-box');

    // get the key for the db (aka the person's name)
    var key = this.innerHTML.split('<br>')[0]

    // get the truncated message including the person's name
    var currentMessage = this.innerHTML.split('...')[0]

    // get the remaining message
    var remainingMessage = db[key].slice(25);


    if (currentMessage.indexOf("<span class='highlight'>") !== -1 && currentMessage.indexOf('</span>') === -1) {
        // if the current message has a chopped off span
        this.innerHTML = currentMessage + "</span>" + remainingMessage;
    } else {
        this.innerHTML = currentMessage + remainingMessage;
    }
  }
};

function handleSearch(event){
  // get the input search value
  var inputSearch = document.querySelector('input').value

  // get all the cards
  var allTheCards = document.querySelectorAll('.container > div');

  // loop through the cards
  for (i = 0; i < allTheCards.length; i++) {
    // get the person's name
    var myText = allTheCards[i].innerHTML.split('<br>')[0]

    // get the full message
    var dbText = db[myText];

    // check if the full message has the input search value
    var hasText = dbText.includes(inputSearch);

    if (hasText === false) {
        // full message doesn't have the input search value
        allTheCards[i].style.display = "none";
    } else {
        // full message contains the input search value

        // get everything that is after the person's name
        var holderArray = allTheCards[i].innerHTML.split('<br>');
        var visibleText = holderArray[holderArray.length - 1];

        // get starting position of input search in the full message
        var startOfStringIndex = visibleText.indexOf(inputSearch);

        if (startOfStringIndex !== -1) {
            // if input search is found in the current visible text

            // get the substring + 5 characters before & after
            var subString = visibleText.substring(startOfStringIndex - 5, startOfStringIndex + inputSearch.length + 5);

            // get the remainder of the message
            var endOfString = visibleText.substring(startOfStringIndex + inputSearch.length + 5, visibleText.length - 1);

            // to check whether the substring is at the start of the full message
            if ( (startOfStringIndex - 5) > 0 ) {
              var startOfString = visibleText.substring(0, startOfStringIndex - 5);
            }

            if (startOfString) {
                // the substring is not at the start of the message
                allTheCards[i].innerHTML = myText + "<br><br>" + startOfString + "<span class='highlight'>" + subString + "</span>" + endOfString;
            } else {
                // the substring is at the start of the message
                allTheCards[i].innerHTML = myText + "<br><br>" + "<span class='highlight'>" + subString + "</span>" + endOfString;
            }

        }

    }
  }
};

function getData(){
  // empty out all the cards
  var container = document.querySelector('.container');
  container.innerHTML = "";

  // loop through the keys in the db and get the messages
  for (var keys in db) {
    var words = db[keys].slice(0,25) + "...";
    var message = keys + "</br></br>" + words
    addDivToPage(message);
  }
};

document.addEventListener('DOMContentLoaded', function(){
    var searchInput = document.querySelector('#form-search-button');
    searchInput.addEventListener('click', handleSearch);

    document.querySelector('#get-data').addEventListener('click', getData);
})

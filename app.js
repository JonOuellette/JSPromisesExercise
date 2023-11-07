let baseURL = "http://numbersapi.com";
let favNumber = 19;

//1.
$.getJSON(`${baseURL}/${favNumber}?json`, data => {console.log(data)});

// 2. 
let numList = [7, 11, 17, 19];

$.getJSON(`${baseURL}/${numList}?json`, 
    data => {for (let num in data ){
        $("body").append(`<p> ${data[num]} </p>`)}}
);

//3.
Promise.all(
    Array.from({length: 4}, () => {
        return $.getJSON(`${baseURL}/${favNumber}?json`);}))
    .then(facts => {facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});

//=================================================================//
//Part 2

//1.
let baseURL2 = "https://deckofcardsapi.com/api/deck";

$.getJSON(`${baseURL2}/new/draw/`)
    .then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

//2.
let firstCard;

$.getJSON(`${baseURL2}/new/draw`)
    .then(data => {firstCard = data.cards[0];
    let deckId = data.deck_id;
    return $.getJSON(`${baseURL2}/${deckId}/draw/`);})

    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)})
    })


//3. 
let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');

  $.getJSON(`${baseURL2}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL2}/${deckId}/draw/`).then(data => {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });

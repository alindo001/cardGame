
let deckId = ""

fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
let player1Score = Number(0)
let player2Score = Number(0)

document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url =`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`



  
fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  document.querySelector('#player1').src = data.cards[0].image
  document.querySelector('#player2').src = data.cards[1].image
  let player1Val = convertToNum(data.cards[0].value)
  let player2Val = convertToNum(data.cards[1].value)
  let remaining = Number(data.remaining)
  if(player1Val > player2Val){
    document.querySelector('h3').innerText = "Player 1 Wins!"
    player1Score +=2
    document.querySelector('.player1Score').innerText = player1Score
            
  }else if(player1Val < player2Val){
    document.querySelector('h3').innerText ="Player 2 Wins!"
    player2Score +=2
    document.querySelector('.player2Score').innerText = player2Score
  }else{
    document.querySelector('h3').innerText = "Time For War"
     
          let btn = document.createElement("button");
          btn.innerHTML = "Click For War";
          document.querySelector('.warButton').appendChild(btn)
          document.getElementById("dealButton").disabled = true
          document.querySelector(".warButton").addEventListener('click', war)
        }
  document.querySelector('h4').innerText = remaining
})
.catch(err => {
    console.log(`error ${err}`)
});

}



function convertToNum(val){
  if(val==="ACE"){
  return 14
}else if(val==='KING'){
return 13
}else if(val==="QUEEN"){
return 12
}else if(val==="JACK"){
  return 11
}else{
  return Number(val)
}

}


function war(){
  const url =`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('#war1').src = data.cards[0].image
    document.querySelector('#war2').src = data.cards[1].image
    document.querySelector('#war3').src = data.cards[2].image
    document.querySelector('#war4').src = data.cards[3].image
    document.querySelector('#war5').src = data.cards[4].image
    document.querySelector('#war6').src = data.cards[5].image
    let warPlayer1 = convertToNum(data.cards[0].value)
    let warPlayer2 = convertToNum(data.cards[1].value)})
}
firestore = firebase.firestore();

function openTab(e, tabId) {
  let tabInfo = document.getElementsByClassName("tabs-info");
  for (let i = 0; i < tabInfo.length; i++) {
    tabInfo[i].style.display = "none";
  }
  let tabBtns = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    // Replaces every single tab with none and one with "tab-btn active" when clicked on 
    tabBtns[i].className = tabBtns[i].className.replace(" active", "");
  }
  document.getElementById(tabId).style.display = "block";
  e.currentTarget.className += " active";
}

function getScores() {
  let scoreDetails = document.getElementById("score-details");
  scoreDetails.innerHTML = "";
  let scoreArr = [];
  firestore.collection('highscores').get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      scoreArr.push(parseFloat(doc.get('score')));
    });
    scoreArr.sort().reverse();
    scoreArr.forEach((scr, idx) => {
      let div = document.createElement('div');
      div.setAttribute('class', 'score-number');
      let numLabel = document.createElement('label');
      numLabel.innerHTML = (idx + 1);
      div.appendChild(numLabel);
      let scoreLabel = document.createElement('label');
      scoreLabel.innerHTML = scr;
      div.appendChild(scoreLabel);
      scoreDetails.appendChild(div);
    })    
  });
}
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
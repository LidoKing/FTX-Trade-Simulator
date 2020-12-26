// DOM variables
const price = document.getElementById('price');
const balance = document.getElementById('balance');
const usd = document.getElementById('usd');
const linkbull = document.getElementById('linkbull');
const target = document.getElementById('target');
const equivalent = document.getElementById('equivalent');
const tradeHistory = document.getElementById('tradeHistory');



//USING CORS IN LOCALHOST IS A PAIN IN THE ASS

// Variables declaration
const endpoint = 'https://ftx.com/api/lt/LINKBULL';
let num;
let history = [];


// Get price from api
async function getPrice() {
  let response = await fetch(endpoint);

  return response.json()
}

// Update price in HTML
async function update() {
  let response = await getPrice();
  let pps = response.result.pricePerShare;

  // Correct number to 5 decimal places
  price.innerHTML = `${pps.toFixed(5)}`;
  equivalent.innerHTML = (pps * getStorage('LINKBULL')).toFixed(2);

  if(pps > num) {
    price.style.color = "green";
  } else if(pps < num) {
    price.style.color = "red";
  } else {
    price.style.color
  }

  num = pps;
}

function checkStorage() {
  if(localStorage.getItem('USD') > 0 || localStorage.getItem('LINKBULL') > 0) {
    updateHTML();
  } else {
    localStorage.setItem('USD', 100);
    localStorage.setItem('LINKBULL', 0);
    updateHTML();
  }
}

function updateHTML() {
  usd.innerHTML = getStorage('USD');
  linkbull.innerHTML = getStorage('LINKBULL');
}

function getStorage(name) {
  return localStorage.getItem(name)
}

function setStorage(name, value) {
  return localStorage.setItem(name, value);
}

function updateHistory(price, action) {
  history = JSON.parse(getStorage('TradeHistory'));

  // When array length has reached 5, delete one first
  if(history.length > 4) {
    history.pop();
  }

  if(action === 'sell') {
    history.unshift(`Sold at: ${price}`);
  } else if(action === 'buy') {
    history.unshift(`Bought at: ${price}`);
  }

  setStorage('TradeHistory', JSON.stringify(history));

  // Clear content before update to prevent accumulation
  tradeHistory.innerHTML = "";

  let array = JSON.parse(getStorage('TradeHistory'));

  array.forEach(item => {
    let list = document.createElement("LI");
    list.innerHTML = item;
    tradeHistory.appendChild(list);
  });
}

window.onload = () => {
  update();
  setInterval(update, 2000);

  checkStorage();

  if(getStorage('TradeHistory') == null) {
    setStorage('TradeHistory', JSON.stringify(history));
  }

  let array = JSON.parse(getStorage('TradeHistory'));

  array.forEach(item => {
    tradeHistory.innerHTML += item + "<br>";
  });
}


// Buy & Sell

function buy() {
  if(getStorage('USD') > 0) {
    let amount = getStorage('USD') * (1 / num);
    setStorage('USD', 0);
    setStorage('LINKBULL', `${amount.toFixed(5)}`);
    updateHTML();

    updateHistory(`${num.toFixed(5)}`, 'buy');
    equivalent.innerHTML = `${(num * amount).toFixed(2)}`;
  } else {
    alert('Not enough balance.')
  }
}

function sell() {
  if(getStorage('LINKBULL') > 0) {
    let amount = getStorage('LINKBULL') * num;
    setStorage('USD', `${amount.toFixed(5)}`);
    setStorage('LINKBULL', 0);
    updateHTML();

    updateHistory(`${num.toFixed(5)}`, 'sell');
    equivalent.innerHTML = "0.00";
  } else {
    alert('Not enough balance.')
  }
}

function reset() {
  setStorage('USD', 40);
  setStorage('LINKBULL', 0);
  updateHTML();
  localStorage.removeItem('TradeHistory');
}


/*
// Target calculator
function getTarget() {
  let goal;

  if(getStorage('USD') > 0) {
    goal = getStorage('USD') * 1.02
  } else {
    goal = (getStorage('LINKBULL') * num) * 1.02
  }

  target.innerHTML = `Today's target: ${goal.toFixed(5)}`;
}

/*
// Back to basics test
window.onload = () => {
  if(localStorage.getItem('USD') > 0) {
    usd.innerHTML = localStorage.getItem('USD');
    linkbull.innerHTML = localStorage.getItem('LINKBULL');
  } else {
    localStorage.setItem('USD', 100);
    localStorage.setItem('LINKBULL', 0);
    usd.innerHTML = localStorage.getItem('USD');
    linkbull.innerHTML = localStorage.getItem('LINKBULL');
  }
}
 function change() {
   localStorage.setItem('USD', 100);
   usd.innerHTML = localStorage.getItem('USD');
   console.log(localStorage.getItem('USD'))
 }
*/

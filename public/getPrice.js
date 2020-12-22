//USING CORS IN LOCALHOST IS A PAIN IN THE ASS

const price = document.getElementById('price');

const endpoint = 'https://ftx.com/api/lt/LINKBULL';

// Unecessary for GET requests
/*
const options = {
  method: 'get',
  headers: {
    AccessControlAllowOrigin: *
  }
};
*/

// Get price from api
async function getPrice() {
  let response = await fetch(endpoint);

  return response.json()
}

// Update price in HTML
async function update() {
  let response = await getPrice();

  price.innerHTML = response.result.pricePerShare;
}

window.onload = () => {
  update();
  setInterval(update, 2000);
}

/*
fetch(endpoint)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('something went wrong!')
    }
  })
  .then(data => {
    console.log(data.result.pricePerShare);
  })
*/

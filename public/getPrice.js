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
async function getPrice() {
  let response = await fetch(endpoint);

  return response.json()
}

async function update() {
  let response = await getPrice();

  console.log(response.result.pricePerShare);
}

update();

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

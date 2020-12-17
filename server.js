// Create a request variable and assign a new XMLHttpRequest object to it
let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ftx.com/api/lt/LINKBULL', true);

request.onload = () => {
  // Begin accessing JSON data here
}

// Send request
request.send()


// Begin accessing JSON data here
// Convert JSON to JavaScript objects
let data = JSON.parse(this.response);

console.log(data.pricePerShare)

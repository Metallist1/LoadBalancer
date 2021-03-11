const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var https = require('https');

  let previousServer = 0;
  let arrayOfServers = ['loadbalancerino.azurewebsites.net','loadbalancer2.azurewebsites.net'];
io.on("connection", socket => {

  function selectServer() {
    if (previousServer >= arrayOfServers.length) previousServer = 0;
		return arrayOfServers[previousServer++];
	} 
  
    function createOption(data, type, path){
		if(type === 'GET'){
			return options = {
			  hostname: selectServer(),
			  port: 443,
			  path: path,
			  method: type,
				  headers: {
					'Content-Type': 'application/json'
				  }
			}
		}
		
		return options = {
		  hostname: selectServer(),
		  port: 443,
		  path: path,
		  method: type,
		  headers: {
			'Content-Type': 'application/json',
			'Content-Length': data.length
		  }
		}
	} 
   socket.on("isPrime", docId => {
	const option = createOption ('' , 'GET', '/api/primes/' + docId);
			console.log(option);
			  const req = https.request(option, res => {
			  console.log(`statusCode: ${res.statusCode}`)

			  res.on('data', d => {
				console.log(JSON.parse(d).response);
				socket.emit("isPrime", JSON.parse(d).response);
			  })
			})

			req.on('error', error => {
			  console.error(error)
			})

			//req.write(data)
			req.end()
    });
  socket.on("countPrime", doc => {
	  const data = JSON.stringify({
			from: Number(doc.before),
			to: Number(doc.after)
		});
  console.log(data);
  	const option = createOption ( data, 'POST', '/api/primes/');

			  const req = https.request(option, res => {
			  console.log(`statusCode: ${res.statusCode}`)

			  res.on('data', d => {
				console.log(JSON.parse(d).response);
				socket.emit("countPrime", JSON.parse(d).response);
			  })
			})

			req.on('error', error => {
			  console.error(error)
			})

			req.write(data)
			req.end()
  });
  

  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});
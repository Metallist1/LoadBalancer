const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

  let previousServer = 0;
  let arrayOfServers = ['Server1','Server 2'];
io.on("connection", socket => {

  function selectServer() {
    if (previousServer >= arrayOfServers.length) previousServer = 0;
		return arrayOfServers[previousServer++];
	} 
  
   socket.on("isPrime", docId => {
	   console.log(selectServer());
    socket.emit("isPrime", 'response');
  });
  
  socket.on("countPrime", doc => {
	  
	   console.log(selectServer());
    socket.emit("countPrime", 'response');
  });
  

  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});
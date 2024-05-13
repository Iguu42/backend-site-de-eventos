const cluster = require('cluster');
const http = require('http');
const async = require('async');
if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length;

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const totalRequests = 2; // Número total de requisições simultâneas por worker

  // Detalhes do endpoint
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/purchaseorder',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client_id': '123'
    }
  };

  // Função para enviar uma requisição
  const sendRequest = (timestamp, callback) => {
    const data = JSON.stringify({
      userId: 1,
      eventId: 1,
      ticketTypeId: 1,
      quantityTickets: 1,
      status: "approved",
      participantName: "Igor Félix",
      participantEmail: "igor@teste.com",
      timestamp: timestamp // Adiciona o timestamp à requisição
    });

    const req = http.request(options, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        callback(null, 'Success');
      });
    });

    req.on('error', e => {
      console.error(`Problem with request: ${e.message}`);
      callback(e, null);
    });

    // Escreve os dados para o corpo da requisição
    req.write(data);
    req.end();
  };

  // Array de funções para enviar as requisições
  const tasks = Array.from({ length: totalRequests }, () => (callback) => {
    const timestamp = Date.now(); // Obtém o timestamp atual
    sendRequest(timestamp, callback);
  });

  // Envia as requisições em paralelo
  async.parallel(tasks, (err, results) => {
    if (err) {
      console.error('Error sending requests:', err);
    } else {
      console.log('All requests sent successfully');
    }

    process.exit(); // Encerra o worker após completar as requisições
  });
}

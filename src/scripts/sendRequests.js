import * as http from 'http';

const totalRequests = 10;  // Número total de requisições simultâneas

// Detalhes do endpoint
const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/purchaseorder',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'client_id': '123'
  }
};

// Dados para enviar
const data = JSON.stringify({
  userId: 1,
  eventId: 1,
  ticketTypeId: 1,
  quantityTickets: 1,
  status: "approved",
  participantName: "Igor Félix",
  participantEmail: "igor@teste.com"
});

// Função para enviar uma requisição
const sendRequest = () => {
  const req = http.request(options, res => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', chunk => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', e => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Escreve os dados para o corpo da requisição
  req.write(data);
  req.end();
};

// Envia várias requisições simultaneamente
for (let i = 0; i < totalRequests; i++) {
  sendRequest();
}

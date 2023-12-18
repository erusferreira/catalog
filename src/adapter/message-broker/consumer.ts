import { Kafka } from 'kafkajs';
const fs = require('fs');

import { KAFKA_TOPIC, KAFKA_BROKER_ADDRESS, KAFKA_BROKER_CLIENTID } from '@adapter/config/config';

// Configurações do Kafka
const kafka = new Kafka({
  clientId: KAFKA_BROKER_CLIENTID,
  brokers: [KAFKA_BROKER_ADDRESS]
});

// Configurações do Consumidor
const consumer = kafka.consumer({ groupId: 'catalog-consumer-group' });

// Tópico Kafka
const kafkaTopic = KAFKA_TOPIC;

// Pasta de destino para os arquivos JSON
const outputFolder = './output';

// Cria a pasta de saída se não existir
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const run = async () => {
  // Conecta ao Kafka
  await consumer.connect();

  // Subscreve ao tópico
  await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true });

  // Escuta as mensagens
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
       // A mensagem já é uma string
       const jsonString = message.value;

       console.log('##############')
       console.log(jsonString?.toString())
       console.log('##############')

      //  try {
      //    // Processa a mensagem
      //    const jsonData = JSON.parse(jsonString);
 
      //    // Gera o nome do arquivo baseado em algum critério (pode ser um timestamp, por exemplo)
      //    const fileName = `${outputFolder}/output_${Date.now()}.json`;
 
      //    // Salva o arquivo JSON na pasta de saída
      //    fs.writeFileSync(fileName, JSON.stringify(jsonData, null, 2));
 
      //    console.log(`Arquivo ${fileName} gerado com sucesso!`);
      //  } catch (error) {
      //    console.error('Erro ao analisar JSON:', error.message);
      //  }
    },
  });
};

// Executa o consumidor
run().catch((e) => console.error(`Erro: ${e.message}`, e));

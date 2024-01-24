import { Kafka } from 'kafkajs';
const fs = require('fs');

import { KAFKA_TOPIC, KAFKA_BROKER_ADDRESS, KAFKA_BROKER_CLIENTID } from '@adapter/config/config';

const kafka = new Kafka({
  clientId: KAFKA_BROKER_CLIENTID,
  brokers: [KAFKA_BROKER_ADDRESS]
});

const consumer = kafka.consumer({ groupId: 'catalog-consumer-group' });
const kafkaTopic = KAFKA_TOPIC;
const outputFolder = './output';

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
       const jsonString = message.value;
       console.log(jsonString?.toString())
    },
  });
};

run().catch((e) => console.error(`Erro: ${e.message}`, e));

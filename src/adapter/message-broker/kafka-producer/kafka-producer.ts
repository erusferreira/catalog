import { Kafka, Partitioners, Producer } from "kafkajs";

import { logger } from '../../utils/logger';
import { MessageBrokerInterface } from "@adapter/message-broker/kafka-producer/message-broker.interface";
import { KAFKA_TOPIC } from '@adapter/config/config';
import { KAFKA_BROKER_ADDRESS, KAFKA_BROKER_CLIENTID } from '@adapter/config/config';

export class KafkaProducer implements MessageBrokerInterface {

  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  public async connect(): Promise<void> {
      await this.producer.connect()
        .then(() => logger.info(`Kafka connection successful`))
        .catch((error: Error) => {
          logger.fatal(`Kafka connection error => ${error.message}`);
          throw Error(`Kafka connection error: ${error.message}`);
        });
  }

  public async disconnect(): Promise<void> {
    await this.producer.disconnect()
      .then(() => logger.info(`Kafka disconnection successful`))
      .catch((error: Error) => {
        logger.fatal(`Kafka disconnection error => ${error.message}`);
        throw Error(`Kafka disconnection error: ${error.message}`);
      });
  }

  public async sendMessage(message: string): Promise<void> {
    await this.connect();
    const dataFormatted = {
      date: new Date().toISOString(),
      message
    }
    await this.producer.send({
        topic: KAFKA_TOPIC,
        messages: [{
          value: JSON.stringify(dataFormatted)
        }],
      })
      .then(() =>  console.log(`Message sent to topic ${KAFKA_TOPIC}: ${JSON.stringify(dataFormatted)}`))
      .catch((error: Error) => {
        logger.fatal(`Not possible to send message ${JSON.stringify(dataFormatted)} to topic ${KAFKA_TOPIC}: ${error.message}`);
        throw Error(`Not possible to send message ${JSON.stringify(dataFormatted)} to topic ${KAFKA_TOPIC}: ${error.message}`);
      })
      .finally(() => this.disconnect())
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: KAFKA_BROKER_CLIENTID,
      brokers: [KAFKA_BROKER_ADDRESS]
    });
    return kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  }
}

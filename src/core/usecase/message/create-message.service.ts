import { injectable, inject, container } from 'tsyringe';

import { MessageBrokerInterface } from '@adapter/message-broker/kafka-producer/message-broker.interface';
import { KafkaProducer } from '@adapter/message-broker/kafka-producer/kafka-producer';

@injectable()
export class CreateMessageService {
  
  constructor(
    @inject('MessageBrokerInterface') private KafkaProducer: MessageBrokerInterface
    ) {}
    
    public async execute(message: string) {
      const kafkaProducer = container.resolve(KafkaProducer);
      const sentMessage = await kafkaProducer.sendMessage(message);
    }
  }
  
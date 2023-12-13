export interface MessageBrokerInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendMessage(message: unknown): Promise<unknown>
}
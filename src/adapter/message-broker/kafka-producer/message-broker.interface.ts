import { CatalogUpdateNotificationInterface } from '@adapter/types/catalog-update-notification.interface';
export interface MessageBrokerInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendNotification(catalogUpdateNotification: CatalogUpdateNotificationInterface): Promise<unknown>
}
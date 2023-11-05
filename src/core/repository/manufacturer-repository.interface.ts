import { Manufacturer } from "../entity/manufacturer";
import { ManufacturerRequestInterface } from '../../adapter/types/manufacturer-request.interface';

export interface ManufacturerRepositoryInterface {
  listAll(): Promise<Manufacturer[]>;
  findById(id: string): Promise<Manufacturer | null>;
  create(entity: ManufacturerRequestInterface): Promise<Manufacturer>;
  update(entity: ManufacturerRequestInterface): Promise<Manufacturer>;
  delete(id: string): Promise<void>
}


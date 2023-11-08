import { Manufacturer } from "@core/entity/manufacturer";

export interface ProductRequestInterface {
    name: string;
    description: string;
    ean_code: string;
    unit_measurement: string;
    is_active: boolean;
    manufaturer: Manufacturer;
}

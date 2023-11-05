import { logger } from '../utils/logger';

import { Product, ProductModel } from '../../core/entity/product';
import { Manufacturer, ManufacturerModel } from '../../core/entity/manufacturer';
import { Merchant, MerchantModel } from '../../core/entity/merchant';
import { Catalog, CatalogModel } from '../../core/entity/catalog';
import { Category, CategoryModel } from '../../core/entity/category';
import { Item, ItemModel } from '../../core/entity/item';

export async function fixtures() {
  const product = await ProductModel.findOne({}).exec();
  if (product) {
    return;
  }

  const mockMerchant: Merchant = new MerchantModel({
    name: 'Chumbo Bar',
    cnpj: '11.004.381/0001-01',
    is_active: true
  });

  const mockCatalog: Catalog = new CatalogModel({
    name: 'Cardápio 1',
    description: 'Cardápio de final de semana',
    merchant: mockMerchant,
    is_active: true
  });

  const mockCategory: Category = new CategoryModel({
    name: 'Bebidas',
    description: 'Soft Drinks (bebidas não alcoólicas)',
    is_active: true,
    catalog_id: mockCatalog
  });
  
  const mockManufacturer: Manufacturer = new ManufacturerModel({
    name: 'Coca-Cola FEMSA Brasil',
    cnpj: '49.190.159/0001-05',
    is_active: true
  });
  
  const mockProduct: Product = new ProductModel({
    name: 'Coca Cola 600ml',
    description: 'Refrigerante Coca Cola Garrafa 600ml',
    ean_code: '49000052688',
    unit_measurement: 'ml',
    is_active: true,
    manufaturer_id: mockManufacturer
  });

  const mockItem: Item = new ItemModel({
    name: 'Coca Cola 600ml Garrafa com Brinde',
    description: 'Garrafa contendo 600ml de Coca Cola, acompanha um brinde surpresa',
    price: 14.9,
    image: 'https://meufestval.vtexassets.com/arquivos/ids/189280-1600-auto',
    create_at: Date,
    update_at: Date,
    is_active: true,
    category_id: mockCategory,
    product_id: mockProduct
  });
  
  try {
    await mockMerchant.save();
    await mockCatalog.save();
    await mockCategory.save();
    await mockManufacturer.save();
    await mockProduct.save();
    await mockItem.save();
  } catch (exc: any) {
    logger.error(`Error fixtures => ${exc.message}`);
  }
  
}
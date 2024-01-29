import bcrypt from 'bcrypt';

import { logger } from '@adapter/utils/logger';
import { Product, ProductModel } from '@core/entity/product';
import { Manufacturer, ManufacturerModel } from '@core/entity/manufacturer';
import { Merchant, MerchantModel } from '@core/entity/merchant';
import { Catalog, CatalogModel } from '@core/entity/catalog';
import { Category, CategoryModel } from '@core/entity/category';
import { Item, ItemModel } from '@core/entity/item';
import { User, UserModel } from '@core/entity/user';
import { RoleType } from '@adapter/enums';

export async function fixtures() {
  const product = await ProductModel.findOne({}).exec();
  if (product) {
    return;
  }

  const mockUser: User = new UserModel({
    name: 'John Doe',
    email: 'email@email.com',
    cpf: '918.483.790-05',
    password: bcrypt.hashSync('Admin@123', 10),
    is_active: true,
    roles: RoleType.User
  });

  const mockMerchant: Merchant = new MerchantModel({
    name: 'Chumbo Bar',
    cnpj: '11.004.381/0001-01',
    owner: mockUser,
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
    catalog: mockCatalog
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
    manufaturer: mockManufacturer
  });

  const mockItem: Item = new ItemModel({
    name: 'Coca Cola 600ml Garrafa com Brinde',
    description: 'Garrafa contendo 600ml de Coca Cola, acompanha um brinde surpresa',
    price: 14.9,
    image: 'https://meufestval.vtexassets.com/arquivos/ids/189280-1600-auto',
    is_active: true,
    category: mockCategory,
    product: mockProduct
  });
  
  try {
    await mockUser.save();
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
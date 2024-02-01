import bcrypt from 'bcrypt';

import { logger } from '../../adapter/utils/logger';
import { Product, ProductModel } from '../../core/entity/product';
import { Manufacturer, ManufacturerModel } from '../../core/entity/manufacturer';
import { Merchant, MerchantModel } from '../../core/entity/merchant';
import { Catalog, CatalogModel } from '../../core/entity/catalog';
import { Category, CategoryModel } from '../../core/entity/category';
import { Item, ItemModel } from '../../core/entity/item';
import { User, UserModel } from '../../core/entity/user';
import { RoleType } from '../../adapter/enums';

export async function fixtures() {
  const user = await UserModel.findOne({}).exec();
  if (user) {
    return;
  }

  // USERS
  const mockUser: User = new UserModel({
    name: 'John Doe',
    email: 'email@email.com',
    cpf: '918.483.790-05',
    password: bcrypt.hashSync('Admin@123', 10),
    is_active: true,
    roles: RoleType.User
  });

  // MERCHANTS
  const mockMerchant: Merchant = new MerchantModel({
    name: 'Chumbo Bar',
    cnpj: '11.004.381/0001-01',
    owner: mockUser,
    is_active: true
  });

  // CATALOGS
  const mockCatalog: Catalog = new CatalogModel({
    name: 'Cardápio 1',
    description: 'Cardápio de final de semana',
    merchant: mockMerchant,
    is_active: true
  });

  // CATEGORIES
  const mockDrinkCategory: Category = new CategoryModel({
    name: 'Bebidas',
    description: 'Soft Drinks (bebidas não alcoólicas)',
    is_active: true,
    catalog: mockCatalog
  });
  const mockFoodCategory: Category = new CategoryModel({
    name: 'Comidas',
    description: 'Comidas variadas',
    is_active: true,
    catalog: mockCatalog
  });
  
  // MANUFACTURERS
  const mockManufacturer1: Manufacturer = new ManufacturerModel({
    name: 'Coca-Cola FEMSA Brasil',
    cnpj: '49.190.159/0001-05',
    is_active: true
  });

  const mockManufacturer2: Manufacturer = new ManufacturerModel({
    name: 'AMBEV S/A  2222',
    cnpj: '07.526.557/0001-00',
    is_active: true
  });
  
  // PRODUCTS
  const mockDrinkProduct1: Product = new ProductModel({
    name: 'Coca Cola 600ml',
    description: 'Refrigerante Coca Cola Garrafa 600ml',
    ean_code: '49000052688',
    unit_measurement: 'ml',
    is_active: true,
    manufaturer: mockManufacturer1
  });
  const mockDrinkProduct2: Product = new ProductModel({
    name: 'Guaraná 600ml',
    description: 'Refrigerante Guaraná Garrafa 600ml',
    ean_code: '7891991002646',
    unit_measurement: 'ml',
    is_active: true,
    manufaturer: mockManufacturer2
  });
  const mockFoodProduct1: Product = new ProductModel({
    name: 'Temaki',
    description: 'Temaki',
    ean_code: null,
    unit_measurement: 'g',
    is_active: true,
    manufaturer: null
  });

  // ITEMS
  const mockDrinkItem1: Item = new ItemModel({
    name: 'Coca Cola 600ml Garrafa com Brinde',
    description: 'Garrafa contendo 600ml de Coca Cola, acompanha um brinde surpresa',
    price: 14.9,
    image: 'https://meufestval.vtexassets.com/arquivos/ids/189280-1600-auto',
    is_active: true,
    category: mockDrinkCategory,
    product: mockDrinkProduct1
  });
  const mockDrinkItem2: Item = new ItemModel({
    name: 'Guaraná Antarctica 600ml Garrafa com Brinde',
    description: 'Garrafa contendo 600ml de Guaraná Antarctica, acompanha um brinde surpresa',
    price: 12.9,
    image: 'https://meufestval.vtexassets.com/arquivos/ids/189280-1600-auto',
    is_active: true,
    category: mockDrinkCategory,
    product: mockDrinkProduct2
  });
  const mockFoodItem1: Item = new ItemModel({
    name: 'Temaki',
    description: 'Temaki grande',
    price: 14.9,
    image: 'https://meufestval.vtexassets.com/arquivos/ids/189280-1600-auto',
    is_active: true,
    category: mockFoodCategory,
    product: mockFoodProduct1
  });
  
  try {
    await mockUser.save();
    await mockMerchant.save();
    await mockCatalog.save();
    await mockDrinkCategory.save();
    await mockFoodCategory.save();
    await mockManufacturer1.save();
    await mockManufacturer2.save();
    await mockDrinkProduct1.save();
    await mockDrinkProduct2.save(); 
    await mockFoodProduct1.save();
    await mockDrinkItem1.save();
    await mockDrinkItem2.save();
    await mockFoodItem1.save();
  } catch (exc: any) {
    logger.error(`Error fixtures => ${exc.message}`);
  }
  
}
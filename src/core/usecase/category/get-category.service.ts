import { injectable, inject, container } from "tsyringe";

import { CategoryRepositoryInterface } from "../../../core/repository/category-repository.interface";
import { CategoryRepository } from "../../../adapter/repository/category.repository";
import { Category } from "../../../core/entity/category";

@injectable()
export class GetCategoryService {

  constructor(
    @inject('CategoryRepositoryInterface') private categoryRepository: CategoryRepositoryInterface
  ) {}

  public async execute(catalogId: string): Promise<Category | null> {
    const cRepository = container.resolve(CategoryRepository);
    const category = await cRepository.findById(catalogId);
    if (category) {
      return category;
    } else {
      throw new Error(`Could not find a category containing the id: ${category}`)
    }
  }
}

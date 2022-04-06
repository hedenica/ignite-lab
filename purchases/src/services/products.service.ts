import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });

    const productsWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productsWithSameSlug) {
      throw new Error('There is already a product with this slug');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}

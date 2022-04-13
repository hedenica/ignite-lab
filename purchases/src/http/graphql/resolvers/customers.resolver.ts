import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/http/auth/current-user';

import { CustomersService } from 'src/services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Customer } from '../models/customer';
import { AuthUser } from '../../auth/current-user';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersServices: CustomersService,
    private purchasesServices: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersServices.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesServices.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolverReference(reference: { authUserId: string }) {
    return this.customersServices.getCustomerByAuthUserId(reference.authUserId);
  }
}

export class CreateOfferInput {
  public productId: number;
  public price: number;
  public quantity: number;
}

export class UpdateOfferInput {
  public productId: number;
  public price: number;
  public quantity: number;
}

export class CreateOffersAttributeInput {
  public productId: number;
  public attributeId: number;
}

export class UpdateOffersAttributeInput {
  public attributeId: number;
}

import cartFragment from "../fragments/cart";

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart(
    $cartId: ID!,
    $lines: [CartLineInput!]!,
    $country: CountryCode
  ) @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;



export const createCartMutation = /* GraphQL */ `
  mutation createCart($country: CountryCode)
  @inContext(country: $country) {
    cartCreate {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;



export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems(
    $cartId: ID!,
    $lines: [CartLineUpdateInput!]!,
    $country: CountryCode
  ) @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;


export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart(
    $cartId: ID!,
    $lineIds: [ID!]!,
    $country: CountryCode
  ) @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;


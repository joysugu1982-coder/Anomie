import { collectionFragment } from "../fragments/collection";
import { productFragment } from "../fragments/product";

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $country: CountryCode
  ) @inContext(country: $country) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 100, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            tags

            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }

            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

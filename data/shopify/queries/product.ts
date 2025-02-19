export const getProductByHandle = /* GraphQL */ `
    query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      requiresSellingPlan
      sellingPlanGroups(first:1) {
        edges {
          node {
            name
            options {
              name
              values
            }
            sellingPlans(first: 1) {
              edges {
                node {
                  id
                  name
                  description
                  recurringDeliveries
                  options {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            altText
            originalSrc
            width
            height
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 7) {
        edges {
          node {
            id
            title
            sellingPlanAllocations(first: 1) {
              edges {
                node {
                  sellingPlan {
                    id
                    name
                    options {
                      name
                      value
                    }
                  }
                }
              }
            }
            selectedOptions {
              name
              value
            }
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
      metafield(namespace: "custom", key: "store") {
        value
        type
      }
    }
  }
`;

export const getProductByIdQuery = /* GraphQL */ `
    query getProductById($id: ID!) {
    product(id: $id) {
      id
      title
      images(first: 5) {
        edges {
          node {
            altText
            originalSrc
            width
            height
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 3) {
        edges {
          node {
            id
            title
            selectedOptions {
              name
              value
            }
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
      metafield(namespace: "custom", key: "store") {
        value
        type
      }
    }
  }
`;
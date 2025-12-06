export const getMarketsQuery = `
  query Markets {
    markets(first: 20) {
      edges {
        node {
          id
          name
          currencySettings {
            defaultCurrency {
              currencyCode
            }
          }
          countries {
            countryCode
            name
          }
        }
      }
    }
  }
`;

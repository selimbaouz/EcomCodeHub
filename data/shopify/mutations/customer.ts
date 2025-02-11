export const createCustomer = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }
`;

export const sendCustomerInvite = `
mutation customerSendInvite($input: CustomerSendInviteInput!) {
  customerSendInvite(input: $input) {
    customerInvite {
      to
      from
      message
    }
    userErrors {
      field
      message
    }
  }
}`
export const checkoutCreate = `
    mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {
        checkoutCreate(input: { lineItems: $lineItems }) 
        {
            checkout {
                webUrl
            }  
            userErrors {
                field
                message
            }
        }  
    }
    
`

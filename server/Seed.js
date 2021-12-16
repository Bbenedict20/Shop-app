const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// const test = async () => {
//     const product = await stripe.products.create({ name: 'Shred-stick' });
//     console.log(product)
// }
const test = async () => {
    const price = await stripe.prices.create({
        product: 'prod_KjFoDtYuDg1IUl',
        unit_amount: 400,
        currency: 'usd'
    })
    console.log(price);
}
//'price_1K3nKg2eZvKYlo2CCq1mNcW5'

test();

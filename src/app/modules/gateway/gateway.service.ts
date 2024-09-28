import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51Ls9jVGslqmvXzFIfLkJo8WVNwT0ToCyiB5v6qyrCADp9WcKBGWEi8XcJrkwl3vSknEw98189NLwHJverPRP3Hds00Gmer4TVQ',
  {},
);

const createGateway = async (price: number) => {
  const amount = Math.round(price * 100);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return paymentIntent.client_secret;
};

export const gatewayService = {
  createGateway,
};

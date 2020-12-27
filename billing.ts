import Stripe from 'stripe';
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Data Ask Data Tell Purchase";

  // Load our secret key from the  environment variables
  const stripe = new Stripe(process.env.stripeSecretKey, {
    apiVersion: '2020-08-27',
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "cad",
  });

  return { status: true };
});

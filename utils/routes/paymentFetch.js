
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const createCustomer = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const customer = await stripe.customers.list({ email: email });

      if (customer.data.length === 0) {
      const newCustomer = await stripe.customers.create({ name: name, email: email });

      res.status(200).json({ customer: newCustomer, isNewCustomer: true });
    } else {
      res.status(200).json({ customer: customer.data[0], isNewCustomer: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const addCard = async (req, res, next) => {
  try {
    const { customerId, cardName, cardNumber, cardExpMonth, cardExpYear, cardCVC } = req.body;

    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC
      }
    });

    const card = await stripe.customers.createSource(customerId, { source: cardToken.id });

    res.status(200).json({ card: card });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const createPay = async (req, res, next) => {
  try {
    const { customerId, items } = req.body;
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: item.price_data.product_data,
          unit_amount: item.price_data.unit_amount,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success?sessionId={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).json({ redirectUrl: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const catchDate = async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const purchaseData = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(purchaseData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
    createCustomer,
    addCard,
    createPay,
    catchDate
}


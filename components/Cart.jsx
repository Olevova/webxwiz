import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useCartContext } from "@/context/cardContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/router";

export default function Cart() {
  const { items, delCardItem } = useCartContext();
  console.log(items, "cart");
  const stripePromis = loadStripe(process.env);
  const router = useRouter();
  const { user } = useAuthContext();
  const checkout = async () => {
    try {
      const payItems = items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quant,
        };
      });
      const { data } = await axios.post(
        "http://localhost:3030/create-Customer",
        {
          name: user.name,
          email: user.email,
          items: payItems,
        }
      );

      const { data: paymentData } = await axios.post(
        "http://localhost:3030/payment",
        {
          customerId: data.customer.id,
          items: payItems,
        }
      );
      const redirectUrl = paymentData.redirectUrl;
      window.location.href = redirectUrl;

      // router.push(paymentData.redirectUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-600 w-60 h-auto rounded-md">
      <div>
        <h3 className="flex justify-center text-lg py-3">Cart Items</h3>
      </div>
      {items?.length === 0 ? (
        <span className="flex justify-center py-3">Cart is empty</span>
      ) : (
        items.map((item) => {
          return (
            <div
              key={item._id}
              className="grid grid-cols-1 gap-2 justify-items-center border-white border-2 py-2"
            >
              <Image src={item.photo} width="50" height="50" />
              <h4>{item.title}</h4>
              <div>
                <span>
                  {item.quant} X {item.price} $
                </span>
                <div className="flex justify-center items-center">
                  <AiOutlineClose
                    onClick={() => delCardItem(item)}
                    className="bg-black "
                  />
                  Delete Product
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="py-2 px-2 text-black flex justify-between">
        <span className="bg-white items-center rounded-sm py-1 px-1">
          Total price: {items.reduce((a, b) => a + b.price * b.quant, 0)} $
        </span>
        <button onClick={checkout} className="bg-white text-black py-1 px-1">
          Checkout
        </button>
      </div>
    </div>
  );
}

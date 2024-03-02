"use client";
import React from "react";
import { useCart } from "./CartContext";
import { Product } from "@/lib/types";

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const handleDecrement = (productId: string) => {
    decrementQuantity(productId);

    const product = cart.find((item: Product) => item.id === productId);
    if (product && product.quantity == 0) {
      removeFromCart(productId);
    }
  };

  const checkout = async () => {
    await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cart }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.url) {
          window.location.href = response.url;
          // console.log(response.url);
        }
      });
  };

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <h2 className="mb-4 text-center text-lg font-semibold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li
              key={product.id}
              className="mb-2 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-400">
                  ${product.price.toFixed(2)} x {product.quantity}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDecrement(product.id)}
                  className="w-8 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  -
                </button>
                <button
                  onClick={() => incrementQuantity(product.id)}
                  className="w-8 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
          </div>

          <button
            onClick={checkout}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

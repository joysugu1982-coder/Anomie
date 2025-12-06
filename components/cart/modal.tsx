"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import OpenCart from "./open-cart";
import CloseCart from "./close-cart";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ desktopTextOnly = false, quantity }: {
  desktopTextOnly?: boolean;
  quantity?: number;
})
 {
  const { cart, updateCartItem } = useCart();


  const { isOpen, openCart, closeCart } = useCart();


  const quantityRef = useRef(cart?.totalQuantity);
  const hasOpenedOnce = useRef(false);

  useEffect(() => {
    if (!cart) createCartAndSetCookie();
  }, [cart]);


  return (
    <>
      {desktopTextOnly ? (
  <button onClick={openCart} className="text-sm font-medium relative">
    CART
    {cart?.totalQuantity ? (
      <span className="ml-1 text-xs bg-blue-600 text-white rounded-full px-1.5">
        {cart.totalQuantity}
      </span>
    ) : null}
  </button>
) : (
  <button aria-label="Open cart" onClick={openCart}>
    <OpenCart quantity={cart?.totalQuantity} textOnly={desktopTextOnly} />
  </button>
)}





      

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 px-3 py-4 pt-20 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between w-full">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart} className="h-10 w-10 flex items-center justify-center">
                  <CloseCart />
                </button>
              </div>

              {/* EMPTY CART */}
              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full h-full text-center">
                  <ShoppingCartIcon className="h-16 mb-4" />
                  <p className="text-2xl font-bold">Your Cart is Empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  {/* ITEMS */}
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams =
                        {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(
                        ({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value;
                          }
                        }
                      );

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li key={i} className="w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <DeleteItemButton
                              item={item}
                              optimisticUpdate={updateCartItem}
                            />
                          </div>

                          <div className="flex flex-row">
                            <div className="relative h-16 w-16 rounded-md border overflow-hidden">
                              <Image
                                width={64}
                                height={64}
                                src={item.merchandise.product.featuredImage.url}
                                alt={item.merchandise.product.title}
                                className="object-cover"
                              />
                            </div>

                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 ml-2 flex flex-row space-x-4"
                            >
                              <div className="flex flex-col">
                                <span>{item.merchandise.product.title}</span>
                                {item.merchandise.title !== DEFAULT_OPTION && (
                                  <p className="text-sm text-neutral-500">
                                    {item.merchandise.title}
                                  </p>
                                )}
                              </div>
                            </Link>
                          </div>

                          <div className="flex h-16 flex-col justify-between">
                            <Price
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                              className="text-right text-sm"
                            />
                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border px-2">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                                optimisticUpdate={updateCartItem}
                              />
                              <p className="w-6 text-center">{item.quantity}</p>
                              <EditItemQuantityButton
                                item={item}
                                type="plus"
                                optimisticUpdate={updateCartItem}
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* TOTALS */}
                  <div className="py-4 text-sm text-neutral-500">
                    <div className="flex justify-between border-b pb-1 mb-3">
                      <p>Taxes</p>
                      <Price
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        className="text-black dark:text-white"
                      />
                    </div>

                    <div className="flex justify-between border-b pb-1 mb-3">
                      <p>Shipping</p>
                      <p>Calculated at checkout</p>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                      <p>Total</p>
                      <Price
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                        className="text-black dark:text-white"
                      />
                    </div>
                  </div>

                  <form action={redirectToCheckout}>
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-white"
      disabled={pending}
      type="submit"
    >
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
    </button>
  );
}

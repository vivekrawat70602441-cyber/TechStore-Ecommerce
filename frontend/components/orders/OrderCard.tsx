"use client";

import Image from "next/image";
import type { Order } from "@/types/OrderTypes";

interface Props {
   order: Order;
}

export default function OrderCard({
    order,
}: Props) {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

           <div className="flex items-center justify-between">

              <h2 className="font-bold">
                   Order #{order._id.slice(-6)}
              </h2>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                 {order.status}
              </span>

           </div>

           <div className="mt-5 space-y-3">
              
              {order.products.map((item) => (
                 
                 <div 
                   key={item.product._id}
                   className="flex items-center gap-4"
                 >

                            <Image
                               src={item.product.image || "/products/placeholder.jpg"}
                     alt={item.product.name}
                               width={64}
                               height={64}
                     className="h-16 w-16 rounded-lg object-cover"
                   />

                  <div>
                      <h3 className="font-medium">
                          {item.product.name}
                      </h3>

                      <p>
                         Qty: {item.quantity}
                      </p>

                      <p>
                          ₹{item.price.toLocaleString("en-IN")}
                      </p>

                  </div>

            </div>

              ))}

           </div>

           <div className="mt-5 border-t pt-4">
             
              <div className="flex justify-between">

                 <span>Total</span>

                 <span>

                       ₹{order.totalPrice.toLocaleString("en-IN")}

                 </span>

              </div>

           </div>

        </div>
    );
}
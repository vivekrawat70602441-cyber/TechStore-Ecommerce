"use client";

import Image from "next/image";
import type { Order } from "@/types/OrderTypes";

interface Props {
   order: Order;
}

export default function OrderCard({ order }: Props) {

   const history = [...(order.statusHistory ?? [])].sort(
      (a, b) =>
         new Date(a.timestamp).getTime() -
         new Date(b.timestamp).getTime()
   );

   return (

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

         <div className="flex items-center justify-between">

            <h2 className="font-bold dark:text-white">
               Order #{order._id.slice(-6)}
            </h2>

            <p className="mt-1">
               {new Date(order.createdAt).toLocaleDateString(
                  "en-IN"
               )}
            </p>

         </div>

         <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
            {order.status}
         </span>

         <div className="mt-5 space-y-3">

            {order.products.map((item, index) => (

               <div
                  key={`${item.product._id}-${index}`}
                  className="flex items-center gap-4"
               >

                  <Image
                     src={
                        item.product.image ||
                        item.product.images?.[0] ||
                        "/products/placeholder.jpg"
                     }
                     alt={item.product.name}
                     width={64}
                     height={64}
                     className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                     <h3 className="font-medium dark:text-white">
                        {item.product.name}
                     </h3>

                     <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                     </p>

                     <p className="text-sm dark:text-gray-300">
                        ₹{item.price.toLocaleString("en-IN")}
                     </p>

                  </div>

               </div>

            ))}

         </div>

         <div className="mt-5 border-t border-gray-200 pt-4 dark:border-slate-700">

            <div className="flex justify-between">

               <span className="dark:text-gray-300">Total</span>

               <span className="font-bold dark:text-white">
                  ₹{order.totalPrice.toLocaleString("en-IN")}
               </span>

            </div>

         </div>

         {/* Order Tracking Timeline */}
         <div className="mt-6 border-t border-gray-200 pt-5 dark:border-slate-700">
            <h3 className="mb-4 text-lg font-semibold">
               Order Tracking
            </h3>

            {history.length > 0 ? (
               <div className="space-y-0">
                  {history.map((event, index) => {
                     const isLatest = index === history.length - 1;
                     const isCancelled = event.status === "Cancelled";

                     return (
                        <div key={`${event.status}-${event.timestamp}-${index}`}
                           className="relative flex gap-3 pb-5 last:pb-0">
                           {/* Timeline line and dot */}
                           <div className="flex w-5 shrink-0 flex-col items-center">

                              <span
                                 className={`z-10 mt-1 h-3 w-3 rounded-full ${isLatest
                                    ? isCancelled
                                       ? "bg-red-500"
                                       : "bg-blue-600"
                                    : "bg-green-500"
                                    }`}
                              />

                              {index !== history.length - 1 && (
                                 <span className="absolute bottom-0 left-2.25 top-4  w-0.5 bg-gray-200 dark:bg-slate-700" />
                              )}
                           </div>

                           {/* Tracking event details */}
                           <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                 <p className="font-medium dark:text-white">{event.status}</p>

                                 {isLatest && (
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                       Latest
                                    </span>
                                 )}
                              </div>

                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                 {event.message}
                              </p>

                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                 {new Date(event.timestamp).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                 })}
                              </p>
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tracking history is not available for this order yet.
               </p>
            )}

         </div>
      </div>
   );
}

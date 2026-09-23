export const calculatePricing = (subtotal) => {
    const shipping =
       subtotal === 0
              ? 0
              : 499;

    const tax = Number((subtotal * 0.18).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    return {
        subtotal,
        shipping,
        tax,
        total,
    };
};
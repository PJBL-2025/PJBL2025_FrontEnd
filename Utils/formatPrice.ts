// utils/formatPrice.ts
export const formatPrice = (price: number): string => {
    return `Rp ${price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })}`;
  };  
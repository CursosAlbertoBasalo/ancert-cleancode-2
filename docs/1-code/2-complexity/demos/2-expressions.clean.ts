// * Write simple expressions

function calculateTotalPrice(
  quantity: number,
  price: number,
  taxRate: number,
  isVip: boolean,
  freeShipping: boolean,
): number {
  const vipDiscount = 0.1;
  const unitShipCost = 10;
  const effectivePrice = isVip ? (1 - vipDiscount) * price : price;
  const shippingCost = freeShipping ? 0 : unitShipCost;
  const subtotal = quantity * effectivePrice + shippingCost;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;
  return total;
}

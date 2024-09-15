// utils/formatCurrency.js

/**
 * Formats a number as Indonesian Rupiah (IDR).
 *
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted currency string.
 */
export function formatCurrencyIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // Adjust if needed
  }).format(amount);
}

export function formatCurrencyUS(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "US",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // Adjust if needed
  }).format(amount);
}

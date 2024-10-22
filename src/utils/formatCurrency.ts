const FORMAT_CURRENCY = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
export function formatCurrency(number: number) {
    return FORMAT_CURRENCY.format(number);
}
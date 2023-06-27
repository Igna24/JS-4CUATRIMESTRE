// Función para formatear el precio en el formato deseado
export function formatPrice(price) {
  if (price === 0) {
    return 'Free';
  } else {
    return `$${price.toFixed(2)}`;
  }
}
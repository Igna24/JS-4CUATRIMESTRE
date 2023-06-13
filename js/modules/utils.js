function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}

function formatLocation(location) {
  if (location && location.place && location.city && location.state) {
    return `${location.place} • ${location.city}, ${location.state}`;
  } else {
    return 'Location information not available';
  }
}

function formatPrice(price) {
  if (price === 0) {
    return 'Free';
  } else {
    return `$${price.toFixed(2)}`;
  }
}

export { formatDate, formatLocation, formatPrice };
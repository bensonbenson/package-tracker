// Carrier list for Select component in AddPackage
export const carriers = [
  {
    value: 'Amazon',
    label: 'Amazon',
  },
  {
    value: 'DHL',
    label: 'DHL',
  },
  {
    value: 'Fedex',
    label: 'Fedex',
  },
  {
    value: 'LaserShip',
    label: 'LaserShip',
  },
  {
    value: 'UPS',
    label: 'UPS',
  },
  {
    value: 'USPS',
    label: 'USPS',
  },
];

// Generate tracking URLs
export const generateCarrierTrackingUrl = (packageItem) => {
  const carrier = packageItem.carrier;
  const trackingNum = packageItem.trackingNum;

  switch (carrier) {
    case 'USPS':
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNum}`;
    case 'UPS':
      return `https://www.ups.com/track?tracknum=${trackingNum}`;
    case 'Fedex':
      return `https://fedex.com/apps/fedextrack/index.html?tracknumbers=${trackingNum}`;
    case 'Amazon':
      return `https://www.amazon.com/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&orderID=${trackingNum}`;
    case 'DHL':
      return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNum}`;
    case 'LaserShip':
      return `https://t.lasership.com/Track/${trackingNum}`;
    default:
      return `http://doge2048.com/`;
  }
};

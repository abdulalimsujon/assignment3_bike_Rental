function calculateRentalCost(
  startTime: string | number | Date,
  returnTime: string | number | Date,
  pricePerHour: number,
): number {
  if (!startTime || !returnTime) {
    throw new Error(
      'startTime and returnTime must be valid date strings, numbers, or Date objects',
    );
  }

  const startDate = new Date(startTime);
  const returnDate = new Date(returnTime);

  if (isNaN(startDate.getTime()) || isNaN(returnDate.getTime())) {
    throw new Error('Invalid date');
  }

  const diffMs = startDate.getTime() - returnDate.getTime();

  const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
  const totalCost = diffHours * pricePerHour;

  const roundedTotalCost =
    totalCost % 1 > 0.5 ? Math.ceil(totalCost) : Math.floor(totalCost);
  return roundedTotalCost;
}

export default calculateRentalCost;

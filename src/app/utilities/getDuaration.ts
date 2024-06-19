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

  const diffMs = returnDate.getTime() - startDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours

  const totalCost = diffHours * pricePerHour;

  return totalCost;
}

export default calculateRentalCost;

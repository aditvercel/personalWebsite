// formattedValue.js

// Function to convert to full Indonesian date format (e.g., Rabu, 02 Oktober 2024)
export function convertToIndonesianDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("id-ID", options);
}

// Function to convert to Indonesian month and year format (e.g., Oktober 2024)
export function convertToIndonesianDateMonthAndYear(isoDateString) {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("id-ID", options);
}

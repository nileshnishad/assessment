// formatDate.js
export function formatDate(dateInput) {
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
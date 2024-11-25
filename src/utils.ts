import axios, { CancelTokenSource } from "axios";

const geocodeApiKey = "AIzaSyBYZ1Up9YS1UP8DfSpOXAzecX-kVxWgdyA";

let cancelTokenSource: CancelTokenSource | null = null;

export async function getPostalCode(address: string): Promise<string> {
  // Cancel the previous request if it exists
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Operation canceled due to a new request.");
  }

  // Create a new cancel token source for the new request
  cancelTokenSource = axios.CancelToken.source();

  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${geocodeApiKey}&address=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url, {
      cancelToken: cancelTokenSource.token,
    });
    const data = response.data;

    if (data.results.length === 0) {
      return "No address found";
    }

    const formattedAddress = data.results[0].formatted_address;

    let postalCode: string | null = null;

    for (const component of data.results[0].address_components) {
      if (component.types.includes("postal_code")) {
        postalCode = component.long_name;
        break;
      }
    }

    if (postalCode) {
      // Remove space from postal code
      postalCode = postalCode.replace(/\s/g, "");
      return `${postalCode}`;
    } else {
      return "";
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
      return "";
    } else {
      console.error("Error fetching postal code:", error);
      return "";
    }
  } finally {
    // Reset the cancelTokenSource after the request is finished
    cancelTokenSource = null;
  }
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

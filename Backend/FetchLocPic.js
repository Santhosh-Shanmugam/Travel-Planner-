import axios from 'axios';

async function getPlaceDetails(data) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
      params: {
        input: data.textQuery, // or use place_id if you have it
        key: 'AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc', // API key should be a string
        fields: "name,formatted_address,photos" // Include photos in the response
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}

export default getPlaceDetails;

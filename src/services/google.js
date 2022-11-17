import Geocode from "react-geocode";

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_GEOCODE_API_KEY);
Geocode.setLanguage("pt-BR");
Geocode.setRegion("br");

export const getLatLng = async (address) => {
  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  return { latitude: lat, longitude: lng };
}
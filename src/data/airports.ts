import type { Airport } from "@/types";

export const AIRPORTS: Airport[] = [
  { code: "DEL", name: "Indira Gandhi International", city: "New Delhi", lat: 28.5562, lng: 77.1000, tier: 1, revenue: 284000000 },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", lat: 19.0896, lng: 72.8656, tier: 1, revenue: 256000000 },
  { code: "BLR", name: "Kempegowda International", city: "Bengaluru", lat: 13.1986, lng: 77.7066, tier: 1, revenue: 198000000 },
  { code: "HYD", name: "Rajiv Gandhi International", city: "Hyderabad", lat: 17.2403, lng: 78.4294, tier: 1, revenue: 167000000 },
  { code: "MAA", name: "Chennai International", city: "Chennai", lat: 12.9941, lng: 80.1709, tier: 1, revenue: 145000000 },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International", city: "Kolkata", lat: 22.6520, lng: 88.4463, tier: 1, revenue: 134000000 },
  { code: "GOI", name: "Manohar International", city: "Goa", lat: 15.3808, lng: 73.8314, tier: 2, revenue: 89000000 },
  { code: "COK", name: "Cochin International", city: "Kochi", lat: 10.1520, lng: 76.4019, tier: 2, revenue: 78000000 },
  { code: "PNQ", name: "Pune Airport", city: "Pune", lat: 18.5822, lng: 73.9197, tier: 2, revenue: 72000000 },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International", city: "Ahmedabad", lat: 23.0773, lng: 72.6347, tier: 2, revenue: 68000000 },
  { code: "JAI", name: "Jaipur International", city: "Jaipur", lat: 26.8242, lng: 75.8122, tier: 2, revenue: 56000000 },
  { code: "LKO", name: "Chaudhary Charan Singh International", city: "Lucknow", lat: 26.7606, lng: 80.8893, tier: 2, revenue: 48000000 },
  { code: "GAU", name: "Lokpriya Gopinath Bordoloi International", city: "Guwahati", lat: 26.1061, lng: 91.5859, tier: 2, revenue: 42000000 },
  { code: "SXR", name: "Sheikh ul-Alam International", city: "Srinagar", lat: 33.9871, lng: 74.7742, tier: 3, revenue: 34000000 },
  { code: "IXC", name: "Chandigarh International", city: "Chandigarh", lat: 30.6735, lng: 76.7885, tier: 3, revenue: 31000000 },
  { code: "PAT", name: "Jay Prakash Narayan International", city: "Patna", lat: 25.5913, lng: 85.0880, tier: 3, revenue: 28000000 },
  { code: "BBI", name: "Biju Patnaik International", city: "Bhubaneswar", lat: 20.2444, lng: 85.8178, tier: 3, revenue: 26000000 },
  { code: "IXR", name: "Birsa Munda Airport", city: "Ranchi", lat: 23.3143, lng: 85.3217, tier: 3, revenue: 22000000 },
  { code: "VTZ", name: "Visakhapatnam Airport", city: "Visakhapatnam", lat: 17.7216, lng: 83.2245, tier: 3, revenue: 19000000 },
  { code: "TRV", name: "Trivandrum International", city: "Thiruvananthapuram", lat: 8.4821, lng: 76.9199, tier: 2, revenue: 45000000 },
  { code: "IXB", name: "Bagdogra Airport", city: "Siliguri", lat: 26.6812, lng: 88.3286, tier: 3, revenue: 18000000 },
  { code: "NAG", name: "Dr. Babasaheb Ambedkar International", city: "Nagpur", lat: 21.0922, lng: 79.0472, tier: 3, revenue: 21000000 },
  { code: "IXE", name: "Mangalore International", city: "Mangalore", lat: 12.9613, lng: 74.8901, tier: 3, revenue: 17000000 },
  { code: "RPR", name: "Swami Vivekananda Airport", city: "Raipur", lat: 21.1804, lng: 81.7387, tier: 3, revenue: 16000000 },
  { code: "IDR", name: "Devi Ahilya Bai Holkar Airport", city: "Indore", lat: 22.7218, lng: 75.8011, tier: 3, revenue: 20000000 },
  { code: "VNS", name: "Lal Bahadur Shastri International", city: "Varanasi", lat: 25.4524, lng: 82.8593, tier: 3, revenue: 15000000 },
  { code: "UDR", name: "Maharana Pratap Airport", city: "Udaipur", lat: 24.6177, lng: 73.8961, tier: 3, revenue: 14000000 },
  { code: "DED", name: "Jolly Grant Airport", city: "Dehradun", lat: 30.1897, lng: 78.1802, tier: 3, revenue: 13000000 },
];

export const POPULAR_ROUTES = [
  { origin: "DEL", destination: "BOM", label: "DEL → BOM" },
  { origin: "DEL", destination: "BLR", label: "DEL → BLR" },
  { origin: "BOM", destination: "HYD", label: "BOM → HYD" },
  { origin: "DEL", destination: "HYD", label: "DEL → HYD" },
  { origin: "BOM", destination: "BLR", label: "BOM → BLR" },
  { origin: "DEL", destination: "MAA", label: "DEL → MAA" },
  { origin: "DEL", destination: "CCU", label: "DEL → CCU" },
  { origin: "BOM", destination: "GOI", label: "BOM → GOI" },
  { origin: "DEL", destination: "GOI", label: "DEL → GOI" },
  { origin: "BLR", destination: "HYD", label: "BLR → HYD" },
  { origin: "CCU", destination: "DEL", label: "CCU → DEL" },
  { origin: "BLR", destination: "MAA", label: "BLR → MAA" },
  { origin: "DEL", destination: "AMD", label: "DEL → AMD" },
  { origin: "BOM", destination: "DEL", label: "BOM → DEL" },
  { origin: "DEL", destination: "JAI", label: "DEL → JAI" },
  { origin: "BOM", destination: "PNQ", label: "BOM → PNQ" },
  { origin: "BLR", destination: "COK", label: "BLR → COK" },
  { origin: "DEL", destination: "LKO", label: "DEL → LKO" },
  { origin: "HYD", destination: "BLR", label: "HYD → BLR" },
  { origin: "MAA", destination: "BLR", label: "MAA → BLR" },
];

export function getAirportByCode(code: string): Airport | undefined {
  return AIRPORTS.find((a) => a.code === code);
}

export function getRouteLabel(origin: string, destination: string): string {
  return `${origin} → ${destination}`;
}

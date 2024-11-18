export interface Property {
  ml_num: string;
  addr: string;
  GnowiseCapRate: string | null; // Cap rate can be string or null
  GnowiseValue: string | null; // Value can be string or null
  zip: string;
  apt_num: string | null; // Apartment number can be null
  municipality: string;
  park_spcs: string;
  type_own1_out: string;
  style: string;
  yr_built: string | null; // Year built can be null
  a_c: string;
  sqft: string;
  st_num: string;
  st: string;
  st_sfx: string;
  st_dir: string | null; // Street direction can be null
  community: string;
  municipality_district: string;
  lp_dol: string; // Listing price is stored as a string
  taxes: string; // Taxes stored as a string
  roomsArea: string;
  num_kit: string;
  lotsz_code: string | null; // Lot size code can be null
  front_ft: string | null; // Frontage in feet can be null
  depth: string | null; // Depth can be null
  is_Condo: boolean; // Boolean for condo status
  pool: string | null; // Pool can be null
  br_plus: number | null; // Number of bedrooms plus can be null
  br: number; // Number of bedrooms
  bath_tot: number; // Total number of bathrooms
  bsmt1_out: string; // Basement details
  county: string;
  Latitude: number; // Latitude as number
  Longitude: number; // Longitude as number
  community_code: string;
  lotArea: string | null; // Lot area can be null
  timestamp_sql: string; // Timestamp as string
  locker: string | null; // Locker can be null
  availability: string;
  ad_text: string;
  Source: string;
  PropertyType: string;
  Amenities: string; // Amenities as string
  gar_spaces: string | null; // Garage spaces can be null
  PropertySubType: string;
  irreg: string | null; // Irregular lot indicator can be null
  yr: number; // Year as number
  zoning: string | null; // Zoning can be null
  maint: string | null; // Maintenance fees can be null
  dom: number; // Days on market as number

  // New fields
  SellingPrice: string | null; // Selling price can be null or string
  PriceDifferencePerc: number | null | string; // Price difference percentage can be null or a number
  Value1Yr: string | null; // 1-year projected value as string or null
  Value2yr: string | null; // 2-year projected value as string or null
  PriceHigh: string | null; // Highest predicted price
  PriceLow: string | null; // Lowest predicted price
  RiskofDecline: number | null | string; // Risk of property value decline
  GnowiseLease: number | null; // Lease value from Gnowise
  Growth1YrPerc: number | null | string; // Growth percentage over 1 year
  Growth2YrPerc: number | null | string; // Growth percentage over 2 years
  LastSoldDate: string | null; // Last sold date can be null
  LastSoldPrice: string | null; // Last sold price can be null
  Forecast: string | null; // Forecast data stored as a JSON string
  TopFeaturesResult: string | null; // Analysis result of top features
  ReportData: string | null; // Data used in valuation reports
  SoldRecords: string | null; // Previous sales records
  UpdatedDate: string | null; // Date when valuation was last updated
  ValuationSource: string | null; // Source of valuation data
  FloodScore: number | null; // Flood score as a number
  FireScore: number | null; // Fire score as a number
  HeatScore: number | null; // Heat score as a number
  WindScore: number | null; // Wind score as a number
  images: string[]; // Array of image URLs
}

export interface ForecastEntry {
  Date: string; // Date in string format
  ForecastValue: number | string; // Forecast value as a number
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// {"C9055851":{"Address":"5 braemar ave","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.40754","Latitude":"43.6997","PostalCode":"M5P 2L1","SoldDate":"2024-07-25","SoldPrice":"3580000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"4"},"C9242916":{"Address":"69 duplex ave","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.39856","Latitude":"43.7","PostalCode":"M5P 2A5","SoldDate":"2024-08-07","SoldPrice":"1695000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"2"},"C9261496":{"Address":"9 maxwell ave","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.40085","Latitude":"43.70452","PostalCode":"M5P 2B4","SoldDate":"2024-10-19","SoldPrice":"1900000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"3"},"C9302175":{"Address":"161 chaplin cres","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.40741","Latitude":"43.69898","PostalCode":"M5P 1B1","SoldDate":"2024-09-05","SoldPrice":"1899000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"2"},"C9302897":{"Address":"20 elderwood dr","AptUnit":"NA","Bedrooms":"3","Den":"2","Longitude":"-79.41806","Latitude":"43.69648","PostalCode":"M5P 1W5","SoldDate":"2024-10-31","SoldPrice":"6100000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"4"},"C9373127":{"Address":"71 lascelles blvd","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.40162","Latitude":"43.70122","PostalCode":"M5P 2E3","SoldDate":"2024-10-23","SoldPrice":"2455000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"4"},"C9374003":{"Address":"59 eastbourne ave","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.40293","Latitude":"43.7012","PostalCode":"M5P 2G1","SoldDate":"2024-10-15","SoldPrice":"2272000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"2"},"C9419803":{"Address":"161 chaplin cres","AptUnit":"NA","Bedrooms":"3","Den":"0","Longitude":"-79.40741","Latitude":"43.69898","PostalCode":"M5P 1B1","SoldDate":"2024-10-31","SoldPrice":"1725000.0","ListPrice":null,"Sqft":null,"Style":"2-Storey","Type1":"Detached","Washrooms":"2"}

export interface Comparable {
  ml_num: string;
  Address: string;
  AptUnit: string;
  Bedrooms: string;
  Den: string;
  Longitude: number;
  Latitude: number;
  PostalCode: string;
  SoldDate: string;
  SoldPrice: string;
  ListPrice: string;
  Sqft: string;
  Style: string;
  Type1: string;
  Washrooms: string;
}

export interface ValuationReport {
  appr_attributes: {
    property_type: string;
    "rooms area": number;
    "lot area": number;
  };
  gnowise_value: number;
  risk_of_decline: number;
  value_high: number;
  value_low: number;
  gnowise_lease: number;
  lease_low: number;
  lease_high: number;
  property_attributes: {
    AC: string;
    Address: string;
    Age: string;
    AptUnit: string;
    Basement1: string;
    Bedrooms: number;
    Den: number;
    FSA: string;
    Kitchens: number;
    LotArea: number;
    ParkingSpaces: number;
    Municipality: string;
    Pool: string;
    PostalCode: string;
    Province: string;
    RoomsArea: number;
    Sqft: string;
    Style: string;
    Type1: string;
    Washrooms: number;
  };
  dom_high: number;
  dom_low: number;
  gnowise_cap_rate: number;
  hpi: {
    M5P_All_median_price: number;
    M5P_Apartment_median_price: number;
    M5P_Detached_median_price: number;
    M5P_Other_median_price: number;
    M5P_Row_median_price: number;
    M5P_Semi_median_price: number;
  };
  liquidity_score: number;
  one_year_growth_rate: number;
  price_in_one_year: number;
  price_in_two_years: number;
  two_year_growth_rate: number;
  valuation_source: string;
}

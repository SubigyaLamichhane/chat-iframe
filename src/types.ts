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
}

export interface ForecastEntry {
  Date: string; // Date in string format
  ForecastValue: number | string; // Forecast value as a number
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

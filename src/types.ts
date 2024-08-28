export interface Property {
  ml_num: string;
  addr: string;
  zip: string;
  apt_num: string | null;
  municipality: string;
  park_spcs: string;
  type_own1_out: string;
  style: string;
  yr_built: string;
  a_c: string;
  sqft: string;
  st_num: string;
  st: string;
  st_sfx: string;
  st_dir: string | null;
  community: string;
  municipality_district: string;
  lp_dol: string;
  taxes: string;
  roomsArea: string;
  num_kit: string;
  lotsz_code: string | null;
  front_ft: string | null;
  depth: string | null;
  is_Condo: boolean;
  pool: string | null;
  br_plus: number | null;
  br: number;
  bath_tot: number;
  bsmt1_out: string;
  county: string;
  Latitude: number;
  Longitude: number;
  community_code: string;
  lotArea: string | null;
  timestamp_sql: string;
  locker: string;
  availability: string;
  ad_text: string;
  Source: string;
  PropertyType: string;
  Amenities: string;
  gar_spaces: string | null;
  PropertySubType: string;
  irreg: string | null;
  yr: number;
  zoning: string | null;
  maint: string;
  dom: number;
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

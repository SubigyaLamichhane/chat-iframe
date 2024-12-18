import React from "react";
import ChatComponent from "./ChatComponent";
import axios from "axios";

const initialQuestions = [
  "Show me the top investment properties in Toronto today.",
  "Show me the top investment properties in Canada today.",
  "With a $2,000,000 budget, show me the best investment options and combinations available today.",
  "Show me Ontario properties with a risk of decline under 20%, a 1-year growth rate over 10%, and a cap rate above 4% available today.",
  "With a $5M budget, what detached house combinations minimize risk of decline while maximizing one-year ROI, two-year ROI, and cap rate? Provide two scenarios with total costs and projected one-year and two-year ROI for each scenario.",
];

let messages: {
  message: string;
  from: "us" | "them";
  properties?: any;
  propertyDataFromQuery?: any;
  propertiesRaw?: any;
  coordinates?: {
    latitude: number;
    longitude: number;
  } | null;
}[] = [
  // {
  //   message: "Show me properties in Toronto today.",
  //   from: "us",
  // },
  // {
  //   from: "them",
  //   properties: [
  //     {
  //       ml_num: "C8448818",
  //       addr: "101 Forest Heights Blvd",
  //       zip: "M2L 2K7",
  //       apt_num: null,
  //       municipality: "Toronto",
  //       park_spcs: 14,
  //       type_own1_out: "Detached",
  //       style: "2-Storey",
  //       yr_built: null,
  //       a_c: "Central Air",
  //       sqft: "5000+",
  //       st_num: "101",
  //       st: "Forest Heights",
  //       st_sfx: "Blvd",
  //       st_dir: null,
  //       community: "St. Andrew-Windfields",
  //       municipality_district: "Toronto C12",
  //       lp_dol: 12800000,
  //       taxes: "51865.60",
  //       roomsArea: 5010.48,
  //       num_kit: "2",
  //       lotsz_code: "Feet",
  //       front_ft: 100.05999755859375,
  //       depth: 285.95001220703125,
  //       is_Condo: false,
  //       pool: "None",
  //       br_plus: null,
  //       br: 7,
  //       bath_tot: 8,
  //       bsmt1_out: "W/O",
  //       county: "Ontario",
  //       Latitude: 43.760308,
  //       Longitude: -79.376819,
  //       community_code: "01.C12.0640",
  //       lotArea: 28612.16,
  //       timestamp_sql: "2024-06-17 13:11:22",
  //       locker: null,
  //       availability: "90 DAYS/TBA",
  //       ad_text:
  //         "Welcome to the magnificent, luxurious and unparallel unique home nestled in heart of Bayview/Yorkmills  on 100x286 feet lot. Once a lifetime opportunity, don't miss out. Double height foyer with Calcutta gold marble flooring,an 8'round skylight. Coffered ceiling prim bedroom with a tea for two balcony O/L  private garden, double sided fireplace, sitting area and an elegant heated floor En suit. Over 12,000 above grade living space. A masterpiece of the builde",
  //       Source: "TREB",
  //       PropertyType: "Residential",
  //       Amenities: "/////",
  //       gar_spaces: 4,
  //       PropertySubType: "",
  //       irreg: null,
  //       yr: 2024,
  //       zoning: "RESIDENTIAL",
  //       maint: null,
  //       dom: 0,
  //       SellingPrice: "12800000",
  //       GnowiseValue: "12944000",
  //       RiskofDecline: 57,
  //       Value1Yr: "12704536",
  //       Value2yr: "12290328",
  //       PriceDifferencePerc: 1,
  //       Growth1YrPerc: -1,
  //       Growth2YrPerc: -5,
  //       Neighborhood: null,
  //       PriceHigh: "14238000",
  //       PriceLow: "11650000",
  //       LastSoldDate: null,
  //       LastSoldPrice: null,
  //       TopFeaturesResult: null,
  //       ReportData: null,
  //       Forecast:
  //         '[{"Date":"2022-08-31T00:00:00","ForecastValue":10414000.0},{"Date":"2022-09-30T00:00:00","ForecastValue":10590000.0},{"Date":"2022-10-31T00:00:00","ForecastValue":10703000.0},{"Date":"2022-11-30T00:00:00","ForecastValue":10778000.0},{"Date":"2022-12-31T00:00:00","ForecastValue":10789000.0},{"Date":"2023-01-31T00:00:00","ForecastValue":10885000.0},{"Date":"2023-02-28T00:00:00","ForecastValue":11034000.0},{"Date":"2023-03-31T00:00:00","ForecastValue":11153000.0},{"Date":"2023-04-30T00:00:00","ForecastValue":11170000.0},{"Date":"2023-05-31T00:00:00","ForecastValue":11149000.0},{"Date":"2023-06-30T00:00:00","ForecastValue":11206000.0},{"Date":"2023-07-31T00:00:00","ForecastValue":11373000.0},{"Date":"2023-08-31T00:00:00","ForecastValue":11497000.0},{"Date":"2023-09-30T00:00:00","ForecastValue":11606000.0},{"Date":"2023-10-31T00:00:00","ForecastValue":11706000.0},{"Date":"2023-11-30T00:00:00","ForecastValue":11859000.0},{"Date":"2023-12-31T00:00:00","ForecastValue":12041000.0},{"Date":"2024-01-31T00:00:00","ForecastValue":12228000.0},{"Date":"2024-02-29T00:00:00","ForecastValue":12372000.0},{"Date":"2024-05-31T00:00:00","ForecastValue":12487000.0},{"Date":"2024-06-30T00:00:00","ForecastValue":12674000.0},{"Date":"2024-07-31T00:00:00","ForecastValue":12837000.0},{"Date":"2024-08-31T00:00:00","ForecastValue":12944000.0},{"Date":"2024-09-30T00:00:00","ForecastValue":13036000.0},{"Date":"2024-10-31T00:00:00","ForecastValue":13097000.0},{"Date":"2024-11-30T00:00:00","ForecastValue":13172000.0},{"Date":"2024-12-31T00:00:00","ForecastValue":13277000.0},{"Date":"2025-01-31T00:00:00","ForecastValue":13401000.0},{"Date":"2025-02-28T00:00:00","ForecastValue":13564000.0},{"Date":"2025-03-31T00:00:00","ForecastValue":13654000.0},{"Date":"2025-04-30T00:00:00","ForecastValue":13725000.0},{"Date":"2025-05-31T00:00:00","ForecastValue":13811000.0},{"Date":"2025-06-30T00:00:00","ForecastValue":13966000.0},{"Date":"2025-07-31T00:00:00","ForecastValue":14109000.0},{"Date":"2025-08-31T00:00:00","ForecastValue":14203000.0},{"Date":"2025-09-30T00:00:00","ForecastValue":14197000.0},{"Date":"2025-10-31T00:00:00","ForecastValue":14217000.0},{"Date":"2025-11-30T00:00:00","ForecastValue":14230000.0},{"Date":"2025-12-31T00:00:00","ForecastValue":14253000.0},{"Date":"2026-01-31T00:00:00","ForecastValue":14234000.0},{"Date":"2026-02-28T00:00:00","ForecastValue":14217000.0},{"Date":"2026-03-31T00:00:00","ForecastValue":14144000.0},{"Date":"2026-04-30T00:00:00","ForecastValue":14123000.0},null,null,null,null,null,null]',
  //       SoldRecords: null,
  //       UpdatedDate: "2024-08-27 02:06:38.477213+00:00",
  //       CreatedDate: "2024-07-10 00:20:29.846425+00:00",
  //       GnowiseCapRate: 0.00847713226205192,
  //       GnowiseLease: 12700,
  //       ValuationSource: "A",
  //       images: ["C8448818-1.jpg"],
  //     },
  //     {
  //       ml_num: "C9283442",
  //       addr: "11 Doon Rd",
  //       zip: "M2L 1M1",
  //       apt_num: null,
  //       municipality: "Toronto",
  //       park_spcs: 10,
  //       type_own1_out: "Detached",
  //       style: "2-Storey",
  //       yr_built: null,
  //       a_c: "Central Air",
  //       sqft: "5000+",
  //       st_num: "11",
  //       st: "Doon",
  //       st_sfx: "Rd",
  //       st_dir: null,
  //       community: "Bridle Path-Sunnybrook-York Mills",
  //       municipality_district: "Toronto C12",
  //       lp_dol: 11900000,
  //       taxes: "37711.00",
  //       roomsArea: 5110.9,
  //       num_kit: "1",
  //       lotsz_code: "Feet",
  //       front_ft: 100,
  //       depth: 145,
  //       is_Condo: false,
  //       pool: "Inground",
  //       br_plus: 3,
  //       br: 5,
  //       bath_tot: 9,
  //       bsmt1_out: "Fin W/O",
  //       county: "Ontario",
  //       Latitude: null,
  //       Longitude: null,
  //       community_code: "01.C12.0680",
  //       lotArea: 14500,
  //       timestamp_sql: "2024-08-29 16:32:02",
  //       locker: null,
  //       availability: "TBA",
  //       ad_text:
  //         "Set Behind Private Gates And Tall Mature Landscaping, In Prestigious York Mills Neighborhood, This Immaculate Estate Features Fully Updated, Voluminous Interiors And A Private  Backyard Oasis Hosts The Most Impressive Outdoor Entertaining Area Including A Large  Betz Pool, Jacuzzi, , Fire Pit Lounge  , Outdoor Kitchen  , Changing Room And A Stone Patio. Complete With Forward-thinking Amenities And The Ultimate In Luxurious Comforts, The Residence Boasts A Soa",
  //       Source: "TREB",
  //       PropertyType: "Residential",
  //       Amenities: "/////",
  //       gar_spaces: 3,
  //       PropertySubType: "",
  //       irreg: null,
  //       yr: 2024,
  //       zoning: null,
  //       maint: null,
  //       dom: 6,
  //       SellingPrice: "11900000",
  //       GnowiseValue: "12152000",
  //       RiskofDecline: 57,
  //       Value1Yr: "11927188",
  //       Value2yr: "11538324",
  //       PriceDifferencePerc: 2,
  //       Growth1YrPerc: -1,
  //       Growth2YrPerc: -5,
  //       Neighborhood: null,
  //       PriceHigh: "13367000",
  //       PriceLow: "10937000",
  //       LastSoldDate: null,
  //       LastSoldPrice: null,
  //       TopFeaturesResult: null,
  //       ReportData: null,
  //       Forecast:
  //         '[{"Date":"2022-09-30T00:00:00","ForecastValue":9869000.0},{"Date":"2022-10-31T00:00:00","ForecastValue":9977000.0},{"Date":"2022-11-30T00:00:00","ForecastValue":10046000.0},{"Date":"2022-12-31T00:00:00","ForecastValue":10056000.0},{"Date":"2023-01-31T00:00:00","ForecastValue":10144000.0},{"Date":"2023-02-28T00:00:00","ForecastValue":10286000.0},{"Date":"2023-03-31T00:00:00","ForecastValue":10396000.0},{"Date":"2023-04-30T00:00:00","ForecastValue":10412000.0},{"Date":"2023-05-31T00:00:00","ForecastValue":10392000.0},{"Date":"2023-06-30T00:00:00","ForecastValue":10443000.0},{"Date":"2023-07-31T00:00:00","ForecastValue":10601000.0},{"Date":"2023-08-31T00:00:00","ForecastValue":10717000.0},{"Date":"2023-09-30T00:00:00","ForecastValue":10817000.0},{"Date":"2023-10-31T00:00:00","ForecastValue":10911000.0},{"Date":"2023-11-30T00:00:00","ForecastValue":11053000.0},{"Date":"2023-12-31T00:00:00","ForecastValue":11224000.0},{"Date":"2024-01-31T00:00:00","ForecastValue":11397000.0},{"Date":"2024-02-29T00:00:00","ForecastValue":11531000.0},{"Date":"2024-05-31T00:00:00","ForecastValue":11639000.0},{"Date":"2024-06-30T00:00:00","ForecastValue":11814000.0},{"Date":"2024-07-31T00:00:00","ForecastValue":11965000.0},{"Date":"2024-08-31T00:00:00","ForecastValue":12065000.0},{"Date":"2024-09-30T00:00:00","ForecastValue":12152000.0},{"Date":"2024-10-31T00:00:00","ForecastValue":12207000.0},{"Date":"2024-11-30T00:00:00","ForecastValue":12276000.0},{"Date":"2024-12-31T00:00:00","ForecastValue":12376000.0},{"Date":"2025-01-31T00:00:00","ForecastValue":12490000.0},{"Date":"2025-02-28T00:00:00","ForecastValue":12642000.0},{"Date":"2025-03-31T00:00:00","ForecastValue":12728000.0},{"Date":"2025-04-30T00:00:00","ForecastValue":12793000.0},{"Date":"2025-05-31T00:00:00","ForecastValue":12874000.0},{"Date":"2025-06-30T00:00:00","ForecastValue":13017000.0},{"Date":"2025-07-31T00:00:00","ForecastValue":13149000.0},{"Date":"2025-08-31T00:00:00","ForecastValue":13239000.0},{"Date":"2025-09-30T00:00:00","ForecastValue":13232000.0},{"Date":"2025-10-31T00:00:00","ForecastValue":13253000.0},{"Date":"2025-11-30T00:00:00","ForecastValue":13265000.0},{"Date":"2025-12-31T00:00:00","ForecastValue":13285000.0},{"Date":"2026-01-31T00:00:00","ForecastValue":13269000.0},{"Date":"2026-02-28T00:00:00","ForecastValue":13251000.0},{"Date":"2026-03-31T00:00:00","ForecastValue":13184000.0},{"Date":"2026-04-30T00:00:00","ForecastValue":13163000.0},null,null,null,null,null,null,null]',
  //       SoldRecords: null,
  //       UpdatedDate: "2024-09-03 21:41:58.621465+00:00",
  //       CreatedDate: "2024-09-03 21:41:58.621465+00:00",
  //       GnowiseCapRate: 0.00824753127057275,
  //       GnowiseLease: 11600,
  //       ValuationSource: "A",
  //       images: ["C9283442-1.jpg"],
  //     },
  //     {
  //       ml_num: "C9251073",
  //       addr: "23 Bayview Rdge",
  //       zip: "M2L 1E3",
  //       apt_num: null,
  //       municipality: "Toronto",
  //       park_spcs: 18,
  //       type_own1_out: "Detached",
  //       style: "2-Storey",
  //       yr_built: null,
  //       a_c: "Central Air",
  //       sqft: "5000+",
  //       st_num: "23",
  //       st: "Bayview",
  //       st_sfx: "Rdge",
  //       st_dir: null,
  //       community: "Bridle Path-Sunnybrook-York Mills",
  //       municipality_district: "Toronto C12",
  //       lp_dol: 11000000,
  //       taxes: "34719.54",
  //       roomsArea: 428.28,
  //       num_kit: "1",
  //       lotsz_code: "Feet",
  //       front_ft: 110.37999725341797,
  //       depth: 506.0400085449219,
  //       is_Condo: false,
  //       pool: "None",
  //       br_plus: 2,
  //       br: 7,
  //       bath_tot: 11,
  //       bsmt1_out: "Fin W/O",
  //       county: "Ontario",
  //       Latitude: 43.645415,
  //       Longitude: -79.482527,
  //       community_code: "01.C12.0680",
  //       lotArea: 55856.7,
  //       timestamp_sql: "2024-08-13 16:42:28",
  //       locker: null,
  //       availability: "TBA",
  //       ad_text:
  //         "In a world where value is often measured in numbers, there's a place where true worth goes beyond figures. We invite you to explore this exceptional property, newly redesigned and ready to become Toronto's top estate. Located on the prestigious Millionaires' Row at Bridle Path Bayview Ridge, this 1.25-acre property features rolling hills and serene landscapes, showcasing unparalleled luxury.Imagine stepping onto this stunning property, where every corner exud",
  //       Source: "TREB",
  //       PropertyType: "Residential",
  //       Amenities: "/////",
  //       gar_spaces: 4,
  //       PropertySubType: "",
  //       irreg: "See Attached Survey, Approx. 1.25Ac",
  //       yr: 2023,
  //       zoning: null,
  //       maint: null,
  //       dom: 8,
  //       SellingPrice: "11000000",
  //       GnowiseValue: "11676000",
  //       RiskofDecline: 57,
  //       Value1Yr: "11459994",
  //       Value2yr: "11086362",
  //       PriceDifferencePerc: 6,
  //       Growth1YrPerc: -1,
  //       Growth2YrPerc: -5,
  //       Neighborhood: null,
  //       PriceHigh: "12844000",
  //       PriceLow: "10508000",
  //       LastSoldDate: null,
  //       LastSoldPrice: null,
  //       TopFeaturesResult: null,
  //       ReportData: null,
  //       Forecast:
  //         '[{"Date":"2022-09-30T00:00:00","ForecastValue":9482000.0},{"Date":"2022-10-31T00:00:00","ForecastValue":9586000.0},{"Date":"2022-11-30T00:00:00","ForecastValue":9653000.0},{"Date":"2022-12-31T00:00:00","ForecastValue":9662000.0},{"Date":"2023-01-31T00:00:00","ForecastValue":9747000.0},{"Date":"2023-02-28T00:00:00","ForecastValue":9883000.0},{"Date":"2023-03-31T00:00:00","ForecastValue":9989000.0},{"Date":"2023-04-30T00:00:00","ForecastValue":10004000.0},{"Date":"2023-05-31T00:00:00","ForecastValue":9985000.0},{"Date":"2023-06-30T00:00:00","ForecastValue":10034000.0},{"Date":"2023-07-31T00:00:00","ForecastValue":10185000.0},{"Date":"2023-08-31T00:00:00","ForecastValue":10297000.0},{"Date":"2023-09-30T00:00:00","ForecastValue":10393000.0},{"Date":"2023-10-31T00:00:00","ForecastValue":10484000.0},{"Date":"2023-11-30T00:00:00","ForecastValue":10620000.0},{"Date":"2023-12-31T00:00:00","ForecastValue":10784000.0},{"Date":"2024-01-31T00:00:00","ForecastValue":10951000.0},{"Date":"2024-02-29T00:00:00","ForecastValue":11079000.0},{"Date":"2024-05-31T00:00:00","ForecastValue":11183000.0},{"Date":"2024-06-30T00:00:00","ForecastValue":11351000.0},{"Date":"2024-07-31T00:00:00","ForecastValue":11497000.0},{"Date":"2024-08-31T00:00:00","ForecastValue":11593000.0},{"Date":"2024-09-30T00:00:00","ForecastValue":11676000.0},{"Date":"2024-10-31T00:00:00","ForecastValue":11729000.0},{"Date":"2024-11-30T00:00:00","ForecastValue":11795000.0},{"Date":"2024-12-31T00:00:00","ForecastValue":11891000.0},{"Date":"2025-01-31T00:00:00","ForecastValue":12001000.0},{"Date":"2025-02-28T00:00:00","ForecastValue":12146000.0},{"Date":"2025-03-31T00:00:00","ForecastValue":12230000.0},{"Date":"2025-04-30T00:00:00","ForecastValue":12292000.0},{"Date":"2025-05-31T00:00:00","ForecastValue":12369000.0},{"Date":"2025-06-30T00:00:00","ForecastValue":12507000.0},{"Date":"2025-07-31T00:00:00","ForecastValue":12634000.0},{"Date":"2025-08-31T00:00:00","ForecastValue":12721000.0},{"Date":"2025-09-30T00:00:00","ForecastValue":12713000.0},{"Date":"2025-10-31T00:00:00","ForecastValue":12734000.0},{"Date":"2025-11-30T00:00:00","ForecastValue":12745000.0},{"Date":"2025-12-31T00:00:00","ForecastValue":12764000.0},{"Date":"2026-01-31T00:00:00","ForecastValue":12749000.0},{"Date":"2026-02-28T00:00:00","ForecastValue":12732000.0},{"Date":"2026-03-31T00:00:00","ForecastValue":12668000.0},{"Date":"2026-04-30T00:00:00","ForecastValue":12647000.0},null,null,null,null,null,null,null]',
  //       SoldRecords: null,
  //       UpdatedDate: "2024-09-04 19:10:42.718485+00:00",
  //       CreatedDate: "2024-08-20 14:32:19.625479+00:00",
  //       GnowiseCapRate: 0.0102857142857143,
  //       GnowiseLease: 13900,
  //       ValuationSource: "A",
  //       images: ["C9251073-1.jpg"],
  //     },
  //   ],
  //   message: "If you need further assistance please let me know.",
  // },
];

const PropertyValuationChatbot = () => {
  const apiURL = "https://intelligenthomevaluation.com/database";
  // const apiURL = "http://localhost:5000/database";

  return (
    <ChatComponent
      messages={messages}
      apiURL={apiURL}
      initialQuestions={initialQuestions}
      addressRecommendationDisabled
    />
  );
};

export default PropertyValuationChatbot;

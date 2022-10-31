/// <reference types="cypress" />

const url = "http://localhost:8000/f22-fires-wild/api/fire/";
const FOD_IDs = [
  400380344, 400329801, 400300259, 400302416, 400315562, 400307606,
];
const fields = [
  "FOD_ID",
  "FPA_ID",
  "SOURCE_SYSTEM_TYPE",
  "SOURCE_SYSTEM",
  "NWCG_REPORTING_AGENCY",
  "NWCG_REPORTING_UNIT_ID",
  "NWCG_REPORTING_UNIT_NAME",
  "SOURCE_REPORTING_UNIT",
  "SOURCE_REPORTING_UNIT_NAME",
  "LOCAL_FIRE_REPORT_ID",
  "LOCAL_INCIDENT_ID",
  "FIRE_CODE",
  "FIRE_NAME",
  "ICS_209_PLUS_INCIDENT_JOIN_ID",
  "ICS_209_PLUS_COMPLEX_JOIN_ID",
  "MTBS_ID",
  "MTBS_FIRE_NAME",
  "COMPLEX_NAME",
  "FIRE_YEAR",
  "DISCOVERY_DATE",
  "DISCOVERY_DOY",
  "DISCOVERY_TIME",
  "NWCG_CAUSE_CLASSIFICATION",
  "NWCG_GENERAL_CAUSE",
  "NWCG_CAUSE_AGE_CATEGORY",
  "CONT_DATE",
  "CONT_DOY",
  "CONT_TIME",
  "FIRE_SIZE",
  "FIRE_SIZE_CLASS",
  "LATITUDE",
  "LONGITUDE",
  "OWNER_DESCR",
  "STATE",
  "COUNTY",
  "FIPS_CODE",
  "FIPS_NAME",
  "Annual_etr",
  "Annual_precipitation",
  "Annual_tempreture",
  "Aridity_index",
  "DF_PFS",
  "AF_PFS",
  "HDF_PFS",
  "DSF_PFS",
  "EBF_PFS",
  "EALR_PFS",
  "EBLR_PFS",
  "EPLR_PFS",
  "HBF_PFS",
  "LLEF_PFS",
  "LIF_PFS",
  "LMI_PFS",
  "MHVF_PFS",
  "PM25F_PFS",
  "HSEF",
  "P100_PFS",
  "P200_PFS",
  "LPF_PFS",
  "NPL_PFS",
  "RMP_PFS",
  "TSDF_PFS",
  "TPF",
  "TF_PFS",
  "UF_PFS",
  "WF_PFS",
  "M_WTR",
  "M_WKFC",
  "M_CLT",
  "M_ENY",
  "M_TRN",
  "M_HSG",
  "M_PLN",
  "M_HLTH",
  "SM_C",
  "SM_PFS",
  "EPLRLI",
  "EALRLI",
  "EBLRLI",
  "PM25LI",
  "EBLI",
  "DPMLI",
  "TPLI",
  "LPMHVLI",
  "HBLI",
  "RMPLI",
  "SFLI",
  "HWLI",
  "WDLI",
  "DLI",
  "ALI",
  "HDLI",
  "LLELI",
  "LILHSE",
  "PLHSE",
  "LMILHSE",
  "ULHSE",
  "EPL_ET",
  "EAL_ET",
  "EBL_ET",
  "EB_ET",
  "PM25_ET",
  "DS_ET",
  "TP_ET",
  "LPP_ET",
  "HB_ET",
  "RMP_ET",
  "NPL_ET",
  "TSDF_ET",
  "WD_ET",
  "DB_ET",
  "A_ET",
  "HD_ET",
  "LLE_ET",
  "UN_ET",
  "LISO_ET",
  "POV_ET",
  "LMI_ET",
  "IA_LMI_ET",
  "IA_UN_ET",
  "IA_POV_ET",
  "TC",
  "CC",
  "IAULHSE",
  "IAPLHSE",
  "IALMILHSE",
  "IALMIL_87",
  "IAPLHS_88",
  "IAULHS_89",
  "LHE",
  "IALHE",
  "IAHSEF",
  "CA",
  "NCA",
  "CA_LT20",
  "M_CLT_EOMI",
  "M_ENY_EOMI",
  "M_TRN_EOMI",
  "M_HSG_EOMI",
  "M_PLN_EOMI",
  "M_WTR_EOMI",
  "M_HLTH_102",
  "M_WKFC_103",
  "FPL200S",
  "M_WKFC_105",
  "M_EBSI",
  "UI_EXP",
  "THRHLD",
  "Unnamed_0",
  "CheatGrass",
  "ExoticAnnualGrass",
  "Medusahead",
  "PoaSecunda",
  "pr_Normal",
  "tmmn_Normal",
  "tmmx_Normal",
  "rmin_Normal",
  "rmax_Normal",
  "sph_Normal",
  "srad_Normal",
  "fm100_Normal",
  "fm1000_Normal",
  "bi_Normal",
  "vpd_Normal",
  "erc_Normal",
  "pr",
  "tmmn",
  "tmmx",
  "rmin",
  "rmax",
  "sph",
  "vs",
  "th",
  "srad",
  "etr",
  "fm100",
  "fm1000",
  "bi",
  "vpd",
  "erc",
  "pr_5D_mean",
  "tmmn_5D_mean",
  "tmmx_5D_mean",
  "rmin_5D_mean",
  "rmax_5D_mean",
  "sph_5D_mean",
  "vs_5D_mean",
  "th_5D_mean",
  "srad_5D_mean",
  "etr_5D_mean",
  "fm100_5D_mean",
  "fm1000_5D_mean",
  "bi_5D_mean",
  "vpd_5D_mean",
  "erc_5D_mean",
  "pr_5D_min",
  "pr_5D_max",
  "tmmn_5D_max",
  "tmmx_5D_max",
  "rmin_5D_min",
  "rmax_5D_min",
  "sph_5D_min",
  "vs_5D_max",
  "th_5D_max",
  "srad_5D_max",
  "etr_5D_max",
  "fm100_5D_min",
  "fm1000_5D_min",
  "bi_5D_max",
  "vpd_5D_max",
  "erc_5D_max",
  "tmmn_Percentile",
  "tmmx_Percentile",
  "sph_Percentile",
  "vs_Percentile",
  "fm100_Percentile",
  "bi_Percentile",
  "vpd_Percentile",
  "erc_Percentile",
  "Ecoregion_US_L4CODE",
  "Ecoregion_US_L3CODE",
  "Ecoregion_NA_L3CODE",
  "Ecoregion_NA_L2CODE",
  "Ecoregion_NA_L1CODE",
  "Aspect_1km",
  "Aspect",
  "Elevation_1km",
  "Elevation",
  "Slope_1km",
  "Slope",
  "EVC_1km",
  "EVC",
  "EVH_1km",
  "EVH",
  "EVT_1km",
  "EVT",
  "Evacuation",
  "FRG_1km",
  "FRG",
  "No_FireStation_10km",
  "No_FireStation_50km",
  "No_FireStation_100km",
  "No_FireStation_200km",
  "GACCAbbrev",
  "GACC_PL",
  "GACC_New_fire",
  "GACC_New_LF",
  "GACC_Uncont_LF",
  "GACC_Type_1_IMTs",
  "GACC_Type_2_IMTs",
  "GACC_NIMO_Teams",
  "GACC_Area_Command_Teams",
  "GACC_Fire_Use_Teams",
  "Mang_Type",
  "Mang_Name",
  "Des_Tp",
  "GAP_Sts",
  "GAP_Prity",
  "GDP",
  "GHM",
  "MOD_NDVI_12m",
  "MOD_EVI_12m",
  "NDVI1day",
  "NDVI_min",
  "NDVI_max",
  "NDVI_mean",
  "Land_Cover_1km",
  "Land_Cover",
  "NPL",
  "Popo_1km",
  "Population",
  "NAME",
  "road_county_dis",
  "road_interstate_dis",
  "road_common_name_dis",
  "road_other_dis",
  "road_state_dis",
  "road_US_dis",
  "SDI",
  "TRACT",
  "RPL_THEMES",
  "RPL_THEME1",
  "EPL_POV",
  "EPL_UNEMP",
  "EPL_PCI",
  "EPL_NOHSDP",
  "RPL_THEME2",
  "EPL_AGE65",
  "EPL_AGE17",
  "EPL_DISABL",
  "EPL_SNGPNT",
  "RPL_THEME3",
  "EPL_MINRTY",
  "EPL_LIMENG",
  "RPL_THEME4",
  "EPL_MUNIT",
  "EPL_MOBILE",
  "EPL_CROWD",
  "EPL_NOVEH",
  "EPL_GROUPQ",
  "TPI_1km",
  "TPI",
  "TRI_1km",
  "TRI",
];

describe("API test suite for the /fire/{FOD_ID} endpoint", () => {
  it("Should return all fields for fire by FOD_ID", () => {
    FOD_IDs.forEach((FOD_ID) => {
      cy.request({
        method: "GET",
        url,
        qs: {
          FOD_ID,
        },
      }).then((response) => {
        let returnedList = response.body;
        expect(returnedList).to.be.an("array").of.length(1);
        expect(returnedList[0].FOD_ID).to.eq(FOD_ID);
        fields.forEach((field) => {
          expect(returnedList[0]).to.haveOwnProperty(field);
        });
      });
    });
  });
});

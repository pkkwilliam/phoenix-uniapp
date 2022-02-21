const DEVELOP_SERVICE_URL = "http://localhost:3081";
const UAT_SERVICE_URL = "https://phoenix-uat-api.bitcode.mo";
const PROD_SERVICE_URL = "https://phoenix-api.bitcode-lab.com";
// let HOST = PROD ? PROD_SERVICE_URL : DEVELOP_SERVICE_URL;

export function getServiceUrl() {
  console.log("env:", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    return UAT_SERVICE_URL;
  } else {
    return PROD_SERVICE_URL;
  }
}

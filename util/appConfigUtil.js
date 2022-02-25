const DEVELOP_SERVICE_URL = "http://localhost:3081";
const UAT_SERVICE_URL = "https://phoenix-uat-api.bitcode.mo";
const PROD_SERVICE_URL = "https://phoenix-api.bitcode-lab.com";
// let HOST = PROD ? PROD_SERVICE_URL : DEVELOP_SERVICE_URL;

export function getServiceUrl() {
  console.log("env:", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    return DEVELOP_SERVICE_URL;
  } else {
    return PROD_SERVICE_URL;
  }
}

export function executeAppConfig(appConfigServiceRequest) {
  plus.runtime.getProperty(plus.runtime.appid, async function (widgetInfo) {
    console.log("check update");
    console.log(widgetInfo);
    const { version, versionCode } = widgetInfo;
    const { requireHotUpdate, hotUpdateUrl } = await appConfigServiceRequest(
      version
    );
    if (!requireHotUpdate || !hotUpdateUrl) {
      console.log("update not required");
      return;
    }
    uni.downloadFile({
      url: hotUpdateUrl,
      success: (downloadResult) => {
        const { statusCode, tempFilePath } = downloadResult;
        if (statusCode === 200) {
          plus.runtime.install(
            tempFilePath,
            { force: true },
            function () {
              console.log("install update success...");
              plus.runtime.restart();
            },
            function (e) {
              console.error("install update fail...");
            }
          );
        }
      },
      fail: (error) => console.log("failed to download update file", error),
    });
  });
}

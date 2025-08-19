import bazarBhaiApi from "../config/axios";

export async function getLandingPageData() {
   const res = await bazarBhaiApi.get("/landing-page")
   return res?.data
}


export const fetchSigunguInfo = async (sido: string) => {
  console.log(sido);
  try {
    const apiKey = '894B966E-8DEA-3C4A-8616-49B9627E0FAD';
    const apiUrl =
      'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIGG_INFO&key=' +
      apiKey +
      `&format=json&attrFilter=full_nm:like:${sido}&geometry=false`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.response.result.featureCollection;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

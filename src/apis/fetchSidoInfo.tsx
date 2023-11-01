export const fetchSidoInfo = async () => {
  try {
    const apiKey = '894B966E-8DEA-3C4A-8616-49B9627E0FAD';
    const apiUrl =
      'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIDO_INFO&key=' +
      apiKey +
      '&format=json&geomFilter=BOX(124,33,132,43)&geometry=false';

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.response.result.featureCollection;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

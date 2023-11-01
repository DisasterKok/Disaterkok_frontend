export const fetchEupmyeondongInfo = async (fullName: string) => {
  console.log(fullName);
  try {
    const apiKey = '894B966E-8DEA-3C4A-8616-49B9627E0FAD';
    const apiUrl =
      'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=' +
      apiKey +
      `&geometry=false&attrFilter=full_nm:like:${fullName}&size=100`;

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

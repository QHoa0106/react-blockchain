const BASE_URL = "http://localhost:5000";
export const fetchData = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const transformData = (data: any[]) => {
  return data.map((item) => ({
    name: item.ticker,
    price: item.price,
    price_change: item.change_percentage,
    volume_24h: item.volume,
    TVL: item.change_amount,
  }));
};
export const fetchMetadata = async () => {
  return await fetchData("metadata");
};

export const fetchLastUpdated = async () => {
  return await fetchData("last_updated");
};

export const fetchTopGainers = async () => {
  const data = await fetchData("top_gainers");
  return transformData(data);
};

export const fetchTopLosers = async () => {
  const data = await fetchData("top_losers");
  return transformData(data);
};

export const fetchMostActivelyTraded = async () => {
  const data = await fetchData("most_actively_traded");
  return transformData(data);
};

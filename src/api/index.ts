import axiosFetcher from "api/axiosFetcher";

class DataFetcher {
  static async get(url: string) {
    const res = await axiosFetcher.get(url);
    return res.data;
  }

  static async post(url: string, body?: Record<string, any>) {
    const res = await axiosFetcher.post(url, body);
    return res.data;
  }

  static async delete(url: string) {
    const res = await axiosFetcher.delete(url);
    return res.data;
  }

  static async patch(url: string, body?: Record<string, any>) {
    const res = await axiosFetcher.patch(url, body);
    return res.data;
  }
}

export default DataFetcher;

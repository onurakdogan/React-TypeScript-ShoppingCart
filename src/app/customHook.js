import axios from 'axios';
const useCustomHook =  async (url) => {
    const config = {
      method: "get",
      url: url,
    };
    const response = await axios(config);
    return response.data;
};
export default useCustomHook;
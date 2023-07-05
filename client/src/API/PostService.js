import { baseInstance } from "./instance";

export default class PostService {
  static async getAllClientProfiles() {
    const { data } = await baseInstance.get("/client/profiles");
    return data;
  }
  static async getAllSubscriptions(old) {
    const { data } = await baseInstance.get("/subscription/getAll", {
      params: {
        old,
      },
    });
    return data;
  }
  static async getOneSubscriptions(id) {
    const { data } = await baseInstance.get("/subscription/getOne", {
      params: {
        id,
      },
    });
    return data;
  }
}

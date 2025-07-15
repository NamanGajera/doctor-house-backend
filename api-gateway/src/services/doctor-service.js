const axios = require("axios");
const FormData = require("form-data");
const { serverConfig } = require("../config");

class DoctorService {
  async getAllDoctor(headers, query) {
    console.log("Query data -->", query);
    try {
      const response = await axios.get(`${serverConfig.DOCTOR_BASE_URL}`, {
        headers: headers,
        params: query,
      });
      return response.data;
    } catch (error) {
      console.log("Error ----------------", error);
      throw error.response.data;
    }
  }
  async getDoctor(id, headers) {
    try {
      const response = await axios.get(
        `${serverConfig.DOCTOR_BASE_URL}/${id}`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  async toggleLike(doctorId, headers) {
    console.log("Header ==>>> ", headers);
    try {
      const response = await axios.post(
        `${serverConfig.DOCTOR_BASE_URL}/like/${doctorId}`,
        {},
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  async getAllLikedDoctor(headers) {
    try {
      const response = await axios.get(
        `${serverConfig.DOCTOR_BASE_URL}/liked`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  async updateDoctor(headers, data, files, id) {
    try {
      const form = new FormData();

      // Append fields
      for (const key in data) {
        form.append(key, data[key]);
      }

      // Append files if present
      if (files?.profilePic?.[0]) {
        form.append("profilePic", files.profilePic[0].buffer, {
          filename: files.profilePic[0].originalname,
          contentType: files.profilePic[0].mimetype,
        });
      }
      const response = await axios.post(
        `${serverConfig.DOCTOR_BASE_URL}/update/${id}`,
        form,
        {
          headers: {
            ...headers,
            ...form.getHeaders(),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(
        "DoctorService updateDoctor error:",
        error.response?.data || error
      );
      throw error.response?.data || error;
    }
  }
}

module.exports = new DoctorService();

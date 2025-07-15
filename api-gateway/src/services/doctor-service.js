const axios = require("axios");
const { serverConfig } = require("../config");

class DoctorService {
    async getAllDoctor(headers, query) {
        console.log("Query data -->", query);
        try {
            const response = await axios.get(
                `${serverConfig.DOCTOR_BASE_URL}`, {
                headers: headers,
                params: query
            }
            );
            return response.data;
        } catch (error) {
            console.log("Error ----------------", error);
            throw error.response.data;
        }
    }
    async getDoctor(id, headers) {
        try {
            const response = await axios.get(
                `${serverConfig.DOCTOR_BASE_URL}/${id}`, {
                headers: headers
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
                `${serverConfig.DOCTOR_BASE_URL}/like/${doctorId}`, {}, {
                headers: headers
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
                `${serverConfig.DOCTOR_BASE_URL}/liked`, {
                headers: headers
            }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

}

module.exports = new DoctorService();

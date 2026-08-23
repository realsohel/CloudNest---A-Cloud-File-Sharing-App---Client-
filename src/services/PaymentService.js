import api from "../api";

export const createOrder = async (token, plan) => {
    try {

        const response = await api.post(
            "/payments/create-order",
            plan,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error Creating Order:",
            error.response?.data || error.message
        );

        throw error;
    }
};


export const verifyPayment = async (token, data) => {
    try {

        const response = await api.post(
            "/payments/verify-payment",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error Verifying Payment:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const getUserTransactions = async (token) => {
    try {

        const response = await api.get(
            "/transactions/get-transactions",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error Verifying Payment:",
            error.response?.data || error.message
        );

        throw error;
    }
};


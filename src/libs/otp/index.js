const axios = require("axios")

exports.sendOTP = async (msisdn, otp) => {
    try {
        const getOTPUrl = `http://192.168.25.112:8080/novoconnectorOTPMIA/otp/mia?msisdn=${msisdn}&msgText=${otp}`

        let responseData
        const params = {
            "msisdn": msisdn,
            "msgText": `Dear user, OTP to verify your mobile number for mgram Interaction App is ${otp}. It
            will expire in 10 minutes. Please regenerate the OTP after expiry`
        }
        await axios({
            method: "GET",
            url: getOTPUrl,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: params
        })
            .then((response) => {
                console.log("response", response)
                console.log("response data", response.data)
                responseData = response.data

            })
            .catch((error) => {
                console.log('error', error.response.status)


            })

        return {
            responseData
        }
    } catch (error) {
        throw error
    }
}
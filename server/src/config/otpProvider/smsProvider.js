const axios = require('axios');
require('dotenv').config();

async function sendOtp(phoneNumber, otp) {

    const REQUEST_END_POINT = process.env.SMS_PROVIDER
    const API_KEY = process.env.SMS_PROVIDER_API_KEY
    const SENDER_ID = process.env.SMS_SENDER_ID
    const body = {
        "sender_id": SENDER_ID,
        "receiver": phoneNumber,
        "message": `প্রিয় গ্রাহক, BazarBhai.com এ প্রবেশের জন্য আপনার OTP হল ${otp}। এটি ৫ মিনিট পর্যন্ত প্রোযোজ্য।`,
        "remove_duplicate": true
    }

    const response = await axios.post(REQUEST_END_POINT, body, {
        headers: {
            Authorization: API_KEY
        }
    })
    return response

}


module.exports = sendOtp;
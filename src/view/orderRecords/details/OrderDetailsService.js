import api from "../../../utils/helpers/api";

export const getOrderDetail = (langCode, orderId) => {
    return api({
        method: 'GET',
        url: '/api/v1/order/detail',
        params: {
            lang_code: langCode,
            order_id: orderId
        }
    })
};
import { RETURN_ZONE, PRODUCT_UNIT } from "../constant.js"
import Order from "../model/Order.js"

export const genarateOrderID = async () => {
    try {
        while (true) {
            const orderId = Math.floor(10000000 + Math.random() * 90000000).toString()
            const isExist = await Order.exists({
                orderId
            })
            if (!isExist) {
                return orderId
            }
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

/**
 * calculate shipment fee
 * @param {Distance} distance 
 * @param {Number} quantity
 * @param {Price} price 
 * @param {String} unit // PRODUCT_UNIT: 'kg' || 'm3' || 'ton'
 * @param {{value: number, base: boolean}[]} tax // value >= 0, base is true means tax will be increated from base price, the preceding tax element is used first
 * @param {Number[]} surcharge // surcharge >= 0, the preceding tax element is used first
 * @returns total price
 */
export const calculateShipmentFee = (distance, quantity, price, unit, tax = [], surcharge = []) => {
    let totalPrice = 0
    if (unit === PRODUCT_UNIT.KG)
        totalPrice = calculateShipmentFeeUtl(distance, quantity, price.uKG)
    else if (unit === PRODUCT_UNIT.TON)
        totalPrice =  calculateShipmentFeeUtl(distance, quantity, price.uTON)
    else if (unit === PRODUCT_UNIT.M3)
        totalPrice =  calculateShipmentFeeUtl(distance, quantity, price.uM3)
    let basePrice = totalPrice
    if (tax.length > 0) {
        tax.forEach((ele) => {
            if (ele.value >= 0) {
                if(ele.base)
                    totalPrice += basePrice * ele.value
                else
                    totalPrice *= 1 + ele.value
            }
        })
    }
    if (surcharge.length > 0) {
        surcharge.forEach((value) => {
            if (value >= 0) {
                totalPrice += value
            }
        })
    }
    return Math.ceil(totalPrice / 1000) * 1000
}

const calculateShipmentFeeUtl = (distance, weight, price) => {
    let totalPrice = 0
    const priceIdx = Object.keys(RETURN_ZONE).indexOf(distance.zonecode)

    let idx = 0
    let value = price[idx]
    while (weight > 0 && idx < price.length) {
        if (value.next) {
            totalPrice += value.prices[priceIdx]
            weight -= value.sidestep
        }
        else {
            totalPrice += value.prices[priceIdx]
            weight -= value.sidestep
            idx += 1
            value = price[idx]
        }
    }
    return totalPrice
}
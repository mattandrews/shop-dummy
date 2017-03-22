'use strict';
const availableItems = require('./products.json');

const getItemByCode = function (code) {
    return availableItems.products.find(p => p.code === code);
};

const availablePricingRules = {
    'bogof': {
        name: 'Buy One Get One Free',
        toBeDeducted: function (basket, code) {
            let applicableItems = basket.filter(item => item.code === code);
            if (!applicableItems) {
                return 0;
            }
            let numApplicableItems = Math.floor(applicableItems.length / 2);
            return numApplicableItems * getItemByCode(code).price;
        }
    }
};

const Checkout = function (pricing_rules) {
    
    let basket = [];

    const scan = function (item) {
        let validItem = getItemByCode(item.code);
        if (validItem) {
            basket.push(item);
        }
    };

    const total = function () {
        let subtotal = 0;
        basket.forEach(function(item) {
            subtotal += item.price;
        });

        pricing_rules.forEach(function (rule) {
            subtotal -= rule.rule.toBeDeducted(basket, rule.code);
        });

        return subtotal;
    };

    return {
        basket: basket,
        scan: scan,
        total: total
    }
};

module.exports = {
    Checkout: Checkout,
    getItemByCode: getItemByCode,
    availablePricingRules: availablePricingRules
};

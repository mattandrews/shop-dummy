'use strict';
const chai = require('chai');
let expect = chai.expect;

const availableProducts = require('../products.json');
const Checkout = require('../checkout');

const FR1 = Checkout.getItemByCode('FR1');
const SR1 = Checkout.getItemByCode('SR1');
const CF1 = Checkout.getItemByCode('CF1');

const testBaskets = [
    {
        items: [FR1, SR1, FR1, FR1, CF1],
        expectedTotal: 22.45
    },
    {
        items: [FR1, FR1],
        expectedTotal: 3.11
    },
    //{
    //    items: [SR1, SR1, FR1, SR1],
    //    expectedTotal: 16.61
    //}
];

describe('supermarket checkout', function () {

    testBaskets.forEach(function (basket) {
        it('Should return correct prices', function (done) {
            let co = new Checkout.Checkout([
                {
                    rule: Checkout.availablePricingRules.bogof,
                    code: 'FR1'
                }
            ]);
            basket.items.forEach(function (item) {
                co.scan(item);
            });
            const total = co.total();
            expect(total).to.equal(basket.expectedTotal);
            done();
        })
    });

    
});

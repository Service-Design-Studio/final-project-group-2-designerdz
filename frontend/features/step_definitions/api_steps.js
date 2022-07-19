const pactum = require('pactum');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const request = pactum.request; //for API responses

let spec = pactum.spec();

Before(() => { spec = pactum.spec(); });


Given('I make a GET request to {string}', function (url) {
  spec.get(url);
});

Then ("I will make a request to {string}", async function(url) {
  spec.get(url);
});

When('I receive a response within 0.5 seconds', async function () {
  await spec.toss();
});

Then('response should have a status {int}', async function (code) {
  spec.response().should.have.status(code);
});
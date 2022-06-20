const pactum = require('pactum');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const request = pactum.request; //for API responses

request.setBaseUrl('https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"');


let spec = pactum.spec();

Before(() => { spec = pactum.spec(); });

Given('I make a GET request to {string}', function (url) {
  spec.get(url);
});

When('I receive a response', async function () {
  await spec.toss();
});

Then('response should have a status {int}', async function (code) {
  spec.response().should.have.status(code);
});
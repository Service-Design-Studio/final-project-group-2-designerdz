const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

Given("something", function () {
  this.response = "hello";
});

When("the greeter says hello", function () {
  this.whatIHeard = replyMe(this.response);
});

Then("I should have heard {string}", function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse);
});

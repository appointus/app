describe("Todo API", () => {
  const rightClientId = "6092cd9b0c9b915ce5aa22e8";
  const wrongClientId = "";
  const rightDate = "2021-10-16";
  const wrongDate = "2020-20-16";
  const rightTime = "10:10";
  const wrongTime = "10.10";

  const http = "http://localhost:3000";
  it("wrong date", () => {
    cy.request({
      method: "POST",
      url: `${http}/appointments`,
      body: {
        date: wrongDate,
        time: rightTime,
        client: rightClientId,
      },
      failOnStatusCode: false,
    })
      .its("body")
      .should("be.equal", "validation error: date");
  });
  it("wrong time", () => {
    cy.request({
      method: "POST",
      url: `${http}/appointments`,
      body: {
        date: rightDate,
        time: wrongTime,
        client: rightClientId,
      },
      failOnStatusCode: false,
    })
      .its("body")
      .should("be.equal", "validation error: time");
  });
  it("wrong client", () => {
    cy.request({
      method: "POST",
      url: `${http}/appointments`,
      body: {
        date: rightDate,
        time: rightTime,
        client: wrongClientId,
      },
      failOnStatusCode: false,
    })
      .its("body")
      .should("be.equal", "validation error: client");
  });
  it("all good", () => {
    cy.request({
      method: "POST",
      url: `${http}/appointments`,
      body: {
        date: rightDate,
        time: rightTime,
        client: rightClientId,
      },
    }).as("goodResponse");
    cy.get("@goodResponse").its("status").should("be.equal", 200);
    cy.get("@goodResponse")
      .its("body")
      .its("date")
      .should("be.equal", rightDate);
    cy.get("@goodResponse")
      .its("body")
      .its("time")
      .should("be.equal", rightTime);
    cy.get("@goodResponse")
      .its("body")
      .its("client")
      .should("be.equal", rightClientId);
  });
});

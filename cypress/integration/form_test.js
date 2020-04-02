describe("Test our Pizza order form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/pizza");
  })
  it("Add text to inputs and submit form", function() {
    cy.get('input[name="name"]')
      .type("David")
      .should("have.value", "David");
    cy.get('#size')
      .select("large")
      .should("have.value", "large");
    cy.get('[type="checkbox"]')
      .check()
      .should('be.checked');
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");
    cy.get("textarea")
      .type("go down to the basement on the corner block")
      .should("have.value", "go down to the basement on the corner block")
      cy.get("button").click();
  })
})
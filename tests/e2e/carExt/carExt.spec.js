describe('Car Exterior Parts', function() {
  it('should go to carInterior page', function() {
    browser.get(browser.baseUrl +'carExterior');
    element(by.css(".arrow")).click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/carInterior");
  });
});
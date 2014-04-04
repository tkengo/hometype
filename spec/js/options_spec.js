describe("HometypeOption", function() {
  it("should be singleton object", function() {
    var option1 = HometypeOptions.getInstance();
    var option2 = HometypeOptions.getInstance();
    expect(option1).toEqual(option2);
  });
});

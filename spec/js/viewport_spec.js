describe('Viewport', function() {
  var viewport;

  beforeEach(function() {
    viewport = new HometypeScreen();
  });

  it('should get document size', function() {
    var box = viewport.getDocumentSize();
    expect(box.width).toBe(400);
    expect(box.height).toBe(3462);
  });
});

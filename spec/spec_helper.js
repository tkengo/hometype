beforeEach(function() {
  jasmine.getFixtures().fixturesPath = 'base/spec/fixtures'
  jasmine.addMatchers(customMatchers);
});

context = describe;

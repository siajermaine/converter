const fs = require('fs'); //file system module
document.body.innerHTML = fs.readFileSync("./index.html"); 
const {cmToIn, inToCm, mToFt, feetToMeter, ftInToMeter, toNumber, ftInToFeet, kmToMi, miToKm, tbspToCup
, tbspToTsp, cupToTbsp, cupToTsp, tspToTbsp, tspToCup, meterToFt2, meterToIn2, feetToFt2, feetToIn2} = require('./converter');

// cm => in calc - passed
test('2.54 cm is equivalent to 1 inch', () => {
    expect(cmToIn(2.54)).toBe(1); 
  });

// in => cm calc - passed 
test('1 inch is equivalent to 2.54 cm', () => {
  expect(inToCm(1)).toBe(2.54);
});

// meter => feet calc - passed
test('.3048 meter is equivalent to 1 foot', () => {
  expect(mToFt(.3048)).toBe(1);
});

// feet => meter - passed
test('1 foot is equivalent to 0.3048 meters', () => {
  expect(feetToMeter(1)).toBe(0.3048);
});

//feet => feet only - passed
test('1.5 feet contains 1 foot and x inches', () => {
  expect(feetToFt2(1.5)).toBe(1);
});

//feet => inch only - passed
test('1.5 feet contains x feet and 6 inches', () => {
  expect(feetToIn2(1.5)).toBe(6);
});

//meter => ft only - passed
test('.5334 meter contains 1 foot and x inches', () => {
  expect(meterToFt2(.5334)).toBe(1);
});

//meter => inch only - passed
test('.5334 meter contains x feet and 9 inches', () => {
  expect(meterToIn2(.5334)).toBe(9);
});

//toNumber turns whitespace to 0 - passed
test('whitespace string gets converted to 0', () => {
  expect(toNumber("  ")).toBe(0);
});

//toNumber turns empty string to 0 - passed
test('empty string gets converted to 0', () => {
  expect(toNumber("")).toBe(0);
});

//toNumber turns string numbers to number numbers - passed 
test('a number string gets converted to number', () => {
  expect(toNumber("9")).toBe(9);
});

// ft in [1,9] => meter => .5334 meter - passed
test('1 feet and 9 inches is equal to .5334 meters', () => {
  expect(ftInToMeter([1,9])).toStrictEqual(.5334);
});

//ft in [1, 6] => 1.5 feet - passed
test('1 feet and 6 inches is equal to 1.5 feet', () => {
  expect(ftInToFeet([1,6])).toStrictEqual(1.5);
});

//km => mi - passed
test('1 km is equal to 0.621371192237334 mile', () => {
  expect(kmToMi(1)).toBe(1*100000/(2.54*63360));
});

//mi => km - passed
test('0.621371192237334 mi is equal to 1 km', () => {
  expect(miToKm(0.621371192237334)).toBe(1);
});

//tbsp => cup - passed
test('16 tbsp is equal to 1 cup', () => {
  expect(tbspToCup(16)).toBe(1);
});

//tbsp => tsp - passed
test('1 tbsp is equal to 3 tsps', () => {
  expect(tbspToTsp(1)).toBe(3);
});

//cup => tbsp - passed
test('1 cup is equal to 16 tbsp', () => {
  expect(cupToTbsp(1)).toBe(16);
});

//cup => tsp - passed 
test('1 cup is equal to 48 tsp', () => {
  expect(cupToTsp(1)).toBe(48);
});

//tsp => tbsp - passed
test('3 tsp is equal to 1 tbsp', () => {
  expect(tspToTbsp(3)).toBe(1);
});

//tsp => cup - passed
test('48 tsp is equal to 1 cup', () => {
  expect(tspToCup(48)).toBe(1);
});

//to number processes non-mixed fractions involving one division - passed
test('1/2 is equal to .5', () => {
  expect(toNumber('1/2')).toBe(.5);
});


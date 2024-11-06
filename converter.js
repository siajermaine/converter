function round(n){
    return (Math.round(n*100)/100).toFixed(2);
}

function toNumber(s){ //used in conversion functions
    s = String(s);
    if (s == false){
        return 0;
    }

    else if (s.includes("/")){ //handle fraction
        const arr = s.split("/");
        const result = arr[0]/arr[1];
        return result;
    }

    if (typeof(s) == 'string'){ //convert
        return parseFloat(s);
    }
}

// calculation functions
function cmToIn(cm){ //in cm, out inches
    return inches = cm / 2.54;
}

function inToCm(inches){
    return cm = inches * 2.54;
}

function mToFt(m){ 
    return ft = m / .3048;
}

function feetToMeter(feet){
    return meter = feet * 0.3048;
}

function feetToFt2(feet){
    const ft = Math.floor(feet);
    return ft;
}

function feetToIn2(feet){                  
    const ft = Math.floor(feet);
    const inch = (feet - ft) * 12;
    return inch;
}

function meterToFt2(meter){
    const cm = meter * 100;
    const inch = cm / 2.54;
    const ftOnly = Math.floor(inch / 12);
    return ftOnly;
}

function meterToIn2(meter){
    const cm = meter * 100;
    const inch = cm / 2.54;
    const ftOnly = Math.floor(inch / 12);
    const inchOnly = inch - (ftOnly * 12);
    return inchOnly;
}

function ftInToMeter(ftIn){
    let ft = ftIn[0];
    let inch = ftIn[1];

    ft = toNumber(ft);
    inch = toNumber(inch);
    //convert to inches only, then cm, then m
    const inchOnly = (ft * 12) + inch;
    const cm = inchOnly * 2.54;
    return m = cm / 100;
}

function ftInToFeet(ftIn){
    //take array, convert to feet
    const feetOnly = toNumber(ftIn[0]);
    const inchOnly = toNumber(ftIn[1]);
    const feet = feetOnly + (inchOnly / 12);
    return feet;
}

function kmToMi(km){ // 1 mi = 63360 inches
    //km => cm => inches
    const cm = km * 100000;
    const inches = cm/2.54;
    const mi = inches / 63360;
    return mi;
}

function miToKm(mi){
    const inches = mi * 63360;
    const cm = inches * 2.54;
    const km = cm / 100000;
    return km;
}

function tbspToCup(tbsp){
    return toNumber(tbsp)/16;
}

function tbspToTsp(tbsp){
    return toNumber(tbsp) * 3;
}

function cupToTbsp(cup){
    return toNumber(cup) * 16;
}

function cupToTsp(cup){
    return toNumber(cup) * 48;
}

function tspToTbsp(tsp){
    return toNumber(tsp)/3;
}

function tspToCup(tsp){
    return toNumber(tsp)/48;
}

//convenience 
function getVal(someID){
    return document.getElementById(someID).value;
}

function setVal(someID, val){
    document.getElementById(someID).value = val;
}

//IDs of inputs 
const inpArr = ['cmInp', 'inchInp', 'meterInp', 'feetInp', 'feetInp2', 'inchInp2', 'kmInp', 'miInp', 'tbspInp', 'cupInp', 'tspInp']; //1d

//event listeners
for (let i = 0; i<inpArr.length; i++){
    document.getElementById(inpArr[i]).addEventListener("change", fromAny); // so arrows work
    document.getElementById(inpArr[i]).addEventListener("keyup", fromAny);      
}

//processing paths 
const cmInPath = {input: "cmInp", function: cmToIn, output: "inchInp"}
const inCmPath = {input: "inchInp", function: inToCm, output: "cmInp"}
const kmMiPath = {input: "kmInp", function: kmToMi, output: "miInp"}
const miKmPath = {input: "miInp", function: miToKm, output: "kmInp"}
const mFtPath = {input: "meterInp", function: mToFt, output: "feetInp"} //meters to feet 
const mFt2Path = {input: "meterInp",function: meterToFt2, output: "feetInp2"} //meters to {feet only}
const mIn2Path = {input: "meterInp", function: meterToIn2, output: "inchInp2"} // meters to {inch only}
const ftMPath = {input: "feetInp", function: feetToMeter, output: "meterInp"} // feet to meters 
const ftFt2Path = {input: "feetInp", function: feetToFt2, output: "feetInp2"} //feet to {feet only}
const ftIn2Path = {input: "feetInp", function: feetToIn2, output: "inchInp2"} //feet to {inch only}
const tbspCupPath = {input: "tbspInp", function: tbspToCup, output: "cupInp"}
const tbspTspPath = {input: "tbspInp", function: tbspToTsp, output: "tspInp"}
const cupTbspPath = {input: "cupInp", function: cupToTbsp, output: "tbspInp"}
const cupTspPath = {input: "cupInp", function: cupToTsp, output: "tspInp"}
const tspCupPath = {input: "tspInp", function: tspToCup, output: "cupInp"}
const tspTbspPath = {input: "tspInp", function: tspToTbsp, output: "tbspInp"}

function processPath(path){
    if (getVal(path.input) == false){ //falsy values - blank output
        setVal(path.output, "");
    }
    else{
        setVal( path.output, round(path.function(getVal(path.input))) );
    }
}

function ftInToOther(){
    const ft = getVal("feetInp2");
    const inch = getVal("inchInp2");
    if (ft == false && inch == false){ //falsy input
        setVal("meterInp", ""); 
        setVal("feetInp", ""); 
    }
    else{
        setVal("meterInp", round( ftInToMeter([ft, inch])) ); //set meters
        setVal("feetInp", round( ftInToFeet([ft, inch])) ); // set feet
    }
}

function fromAny(){ 
    switch(this.id){
        case "cmInp": processPath(cmInPath); // cm & inches 
        break;
        case "inchInp": processPath(inCmPath);
        break;
        case "kmInp": processPath(kmMiPath); // km & mi 
        break;
        case "miInp": processPath(miKmPath);
        break;
        case "meterInp": processPath(mFtPath); // meters & feet & in 
        processPath(mFt2Path);
        processPath(mIn2Path);
        break;
        case "feetInp": processPath(ftMPath);
        processPath(ftFt2Path);
        processPath(ftIn2Path);
        break;
        case "feetInp2": ftInToOther();
        break;
        case "inchInp2": ftInToOther();
        break;
        case "tbspInp": processPath(tbspCupPath);
        processPath(tbspTspPath);
        break;
        case "cupInp": processPath(cupTbspPath);
        processPath(cupTspPath);
        break;
        case "tspInp": processPath(tspCupPath);
        processPath(tspTbspPath);
    }
 }

// module.exports = {cmToIn, inToCm, mToFt, feetToMeter, ftInToMeter, toNumber, ftInToFeet, kmToMi, 
//     miToKm, tbspToCup, tbspToTsp, cupToTbsp, cupToTsp, tspToTbsp, tspToCup, meterToFt2, meterToIn2, feetToFt2, feetToIn2}; 

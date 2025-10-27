/*
*    PawlClock v0.02
*    Icon drawn on https://www.pixilart.com/draw (must be white for color fill, transparent bg).
*    Converted with https://www.espruino.com/Image+Converter (1 bit bw, transparency?).
*    18 days battery.
*/

{ // Fast Loading ( Brackets to define the app scope ).
  
  // *******************
  // Includes.
  // * Load the files by ide(run), not by coping with the file manager, otherwise the required modules where not loaded on the bangle storage.
  const locale = require('locale');
  const storage = require('Storage');
  const heatshrink = require("heatshrink");
  const widget_utils = require("widget_utils");

  // *******************
  // Globals.
  let appName = 'PawlClock_v0.01';
  const w = g.getWidth(); // 176 Pixels.
  const h = g.getHeight(); // 176 Pixels.

  // *******************
  // Custom font.


Graphics.prototype.setFontLato = function() {
  // Actual height 53 (56 - 4)
  // 1 BPP
  return this.setFontCustom(
    E.toString(require('heatshrink').decompress(atob('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'))),
    46,
    atob("DRomJSUlJyQmJiUmDg=="),
    67|65536
  );
}
  
  // *******************
  // Load settings.
  let settings = Object.assign({
    bgColor:      0xffff, // Default white.
    debug:         false, // Default false.
    barIntervall: 600000, // Default 10min.
    memIntervall:  60000, // Default 1min.
    stepIntervall: 60000, // Default 1min.
    battIntervall: 60000, // Default 1min.
    offScreenUpd:   true, // Default true.
    tempOffset:        0  // Default 0.
  }, storage.readJSON("pawl-clock.json", true) || {});
  let offScreenUpd = (settings.debug) ? true : settings.offScreenUpd;
  let tempOffset = settings.tempOffset;
  // Intervall settings.
  let barIntervall = settings.barIntervall;
  let memIntervall = settings.memIntervall;
  let stepIntervall = settings.stepIntervall;
  let battIntervall = settings.battIntervall;
  let debug = settings.debug;

  // *******************
  // Colors definitios.
  let drawingColor = 0x0000;
  if ( // If the bg color is a dark color, draw in white.
    settings.bgColor==0x0010 || // DarkBlue.
    settings.bgColor==0x001f || // Blue.
    settings.bgColor==0xf800 || // Red.
    settings.bgColor==0x0000    // Black.
  ) {
    drawingColor = 0xffff;
  }
  let cleanColor = (debug) ? 0xf800 : settings.bgColor;

  // *******************
  // Next minute mainLoop schedule.
  let mainTimeoutID;
  let mainLoopTimer = function() {
    if (debug) console.log('mainLoopTimer');
    if (mainTimeoutID) clearTimeout(mainTimeoutID);
    mainTimeoutID = setTimeout(function() {
      mainTimeoutID = undefined;
      mainLoop();
    }, 60000 - (Date.now() % 60000));
  };

  // *******************
  // Run only on the first app execution.
  let makeIt = function() {
    if (debug) console.log('makeIt');
    // Set widgets.
    Bangle.loadWidgets(); // Load widgets.
    widget_utils.hide(); // Hide widgets. (FastLoading way).
    setTimeout(Bangle.drawWidgets,0); // Draw widgets. (FastLoading way).
    // Draw all on the first run.
    drawTheme(); 
    drawBpm();
    setSteps();
    drawBLE();
    drawLock();
    drawGPS();
    setBatt();
    drawBatt();
    setMemory();
    drawMemory();
    setBarometer();
    // Draw time and date and init the update loop.
    mainLoop();
  };

  // *******************
  // Main draw.
  let mainLoop = function() {
    if (debug) console.log('mainLoop');
    // Set next minute update timer.
    mainLoopTimer();
    // Draw stuffs.
    drawClock();
    drawDate();
  };

  // *******************
  // Static graphical stuffs. 
  let drawTheme = function() {
    if (debug) console.log('drawTheme');
    g.reset();
    g.clear();
    // Draw background.
    g.setColor(settings.bgColor).fillRect( 0, 0, w, h);
    g.setColor(0x0000);
    // Draw up-left corner.
    g.fillRect(0, 0, 4, 0);
    g.fillRect(0, 1, 2, 1);
    g.fillRect(0, 2, 1, 2);
    g.fillRect(0, 3, 0, 4);
    // Draw up-right corner.
    g.fillRect(w - 1, 0, w - 5, 0);
    g.fillRect(w - 1, 1, w - 3, 1);
    g.fillRect(w - 1, 2, w - 2, 2);
    g.fillRect(w - 1, 3, w - 1, 4);
    // Draw down-left corner.
    g.fillRect(0, h - 1, 4, h - 1);
    g.fillRect(0, h - 2, 2, h - 2);
    g.fillRect(0, h - 3, 1, h - 3);
    g.fillRect(0, h - 4, 0, h - 5);
    // Draw down-right corner.
    g.fillRect(w - 5, h - 1, w - 1, h - 1);
    g.fillRect(w - 3, h - 2, w - 1, h - 2);
    g.fillRect(w - 2, h - 3, w - 1, h - 3);
    g.fillRect(w - 1, h - 4, w - 1, h - 5);
  };

  // *******************
  // Main clock drawing.
  let drawClock = function() {
    if (debug) console.log('drawClock');
    let date = new Date();
    let timeStr = locale.time(date,1);
    // Draw time.
    let X = 5;
    let Y = 34;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+165, Y+50).setColor(drawingColor); // Clear.
    g.setFontAlign(0, 0).setFontLato().drawString(timeStr, X+83, Y+29);
  };

  // *******************
  // Date Info drawing.
  let drawDate = function() {
    if (debug) console.log('drawDate');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let date = new Date();
    let dayStr = locale.dow(date, 1);
    let dayNum = ("0" + date.getDate()).slice(-2);
    let monthStr = locale.month(date, 1);
    let monthNum = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let X = 5;
    let Y = 96;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+80, Y+30).setColor(drawingColor); // Clear. 
    g.setColor(drawingColor).drawImage(atob("Dg6BADhz/////////wA9tvbbwA9tvbbwA/////A="), X, Y+15); // 14x14.
    g.fillRect(X+45, Y+12, X+47, Y+30);
    // Draw day.
    g.setColor(drawingColor).setFontAlign(0, 0);
    let dayX = 22;
    let dayY = 118;
    g.setFont("Vector", 14).drawString(dayStr, X+30, Y+6);
    g.setFont("Vector", 20).drawString(dayNum, X+30, Y+23);
    // Draw month.
    g.setFont("Vector", 15).drawString(monthStr, X+65, Y+6);
    g.setFont("Vector", 20).drawString(monthNum, X+65, Y+23);
  };
  
  // *******************
  // HR Info drawing.
  // if ( Bangle.isCharging())
  let drawBpm = function() {
    if (debug) console.log('drawBpm');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let X = 90;
    let Y = 100;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+80, Y+14); // Clear.
    g.setColor(drawingColor).setFontAlign(0, 0).setFont("Vector", 20).drawString(bp, X+40, Y+9);
    g.setFont("Vector", 9).drawString('BPM', X+72, Y+8);
    if (Bangle.isHRMOn()) {
      g.setColor(0xf800); // Red.
    }
    g.drawImage(atob("DxKBAAAAAAAAAePH79/////////+//n/8f/B/wH8AfABwAAAAAA="), X, Y-2); // 15x18.
  };
  // HR update events.
  var hp = Bangle.setHRMPower;
  Bangle.setHRMPower = () => {
    hp.apply(Bangle, arguments);
    drawBpm();
  };
  var bp = Math.round(Bangle.getHealthStatus().bpm||Bangle.getHealthStatus("last").bpm);
  let drawBpmOnHRM = function(e) {
    if (e && e.confidence>60) bp = Math.round(e.bpm);
    if (bp == 0) bp = Math.round(Bangle.getHealthStatus().bpm||Bangle.getHealthStatus("last").bpm);
    drawBpm();
  };
  Bangle.on('HRM', drawBpmOnHRM);

  // *******************
  // Steps Info drawing.
  let stepIntervallID;
  let drawSteps = function() {
    if (debug) console.log('drawSteps');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let X = 98;
    let Y = 135;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+72, Y+17); // Clear.
    g.setColor(drawingColor);
    g.drawImage(atob("EhKBAAcAA8MD+cP/8L/8N/oG/4DfoBv8A30Ab8AN+AG+ADfABvAA3AAbAAOA"), X, Y); // 18x18.
    let steps = Bangle.getHealthStatus("day").steps;
    let fontSize = 21;
    if (steps>9999) fontSize = 16;
    g.setFontAlign(0, 0).setFont("Vector", fontSize).drawString(steps, X+50, Y+10);
  };
  // Steps update events.
  if (!offScreenUpd) { // Enable the lcdPower handler only if offScreenUpd is false.
    function drawStepsOnLcdPower(on) {
      if (on) { drawSteps(); }
    }
    Bangle.on('lcdPower', drawStepsOnLcdPower);
  }
  function setSteps() {
    if (debug) console.log('setSteps');
    drawSteps();
    if ( stepIntervall > 0 ) // Real time mode.
      stepIntervallID = setInterval( drawSteps, stepIntervall); // Schedule next runs.
    else
      Bangle.on('step', drawSteps);
  }

  // *******************
  // BLE Info drawing.
  let drawBLE = function() {
    if (debug) console.log('drawBLE');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let X = 29;
    let Y = 6;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+9, Y+17); // Clear. 
    if (NRF.getSecurityStatus().connected) {
      g.setColor(0x001f); // Blue.
    } else {
      g.setColor(drawingColor);
    }
    g.drawImage(atob("ChKBABgHAeB82753uPweD4fz7tnG4fB4HAYA"), X, Y); // 10x18.
  };
  // BLE update events.
  NRF.on('connect', drawBLE);
  NRF.on('disconnect', drawBLE);

  // *******************
  // Lock Screen drawing.
  let drawLock = function() {
    if (debug) console.log('drawLock');
    let X = 7;
    let Y = 6;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+13, Y+17); // Clear. 
    g.setColor(drawingColor);
    if (Bangle.isLocked()) {
      g.drawImage(atob("DhKBAAAAHgH+DzwwMcDmAZgGYBv/////P/h/4f/P/h/////w"), X, Y); // 14x18.
    } else {
      g.drawImage(atob("DhKBAB8B/gccODjgY4AHABwAOAP/////P/h/4f/P/h/////w"), X, Y); // 14x18.
    }
  };
  // Lock Screen info update events.
  Bangle.on("lock", drawLock);

  // *******************
  // GPS drawing.
  let drawGPS = function() {
    if (debug) console.log('drawGPS');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let X = 46;
    let Y = 6;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+17, Y+17); // Clear.
    g.setColor(drawingColor).drawImage(atob("EhKBADgAGwANYAKswNd4G7MD+GBsGAYMAwYAw2HZ/Hvdj26x41Q4awYNgAHA"), X, Y); // 17x18.
    // check if we need to update the widget periodically
    if (Bangle.isGPSOn() && intervalGPS === undefined) {
      intervalGPS = setInterval(
          function() { drawGPS(); },
          10 * 1000); // update every 10 seconds to show gps fix/no fix.
    } else if (!Bangle.isGPSOn() && intervalGPS !== undefined) {
      clearInterval(intervalGPS);
      intervalGPS = undefined;
    }
    if (Bangle.isGPSOn()) {
        const gpsObject = Bangle.getGPSFix();
        if (gpsObject && gpsObject.fix > 0) {
          g.setColor(0x001f); // Blue ( ON with Fix ).
        } else {
          g.setColor(0xf800); // Red ( ON without Fix ).
        }
    } else {
      g.setColor(cleanColor); // ( GPS off ).
    }
    g.fillPoly([X+10,Y+4,X+13,Y+6,X+7,Y+13,X+5,Y+10]);
  };
  var intervalGPS;
  // GPS info update events.
  var oldSetGPSPower = Bangle.setGPSPower;
  Bangle.setGPSPower = function(on, id) {
    var isGPSon = oldSetGPSPower(on, id);
    drawGPS();
    return isGPSon;
  };

  // *******************
  // Battery drawing.
  let battIntervallID;
  let drawBatt = function() {
    if (debug) console.log('drawBatt');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    // If is charging...
    if ( Bangle.isCharging())
      changeInterval(battIntervallID, 30000);
    else
      changeInterval(battIntervallID, battIntervall);
    let X = 72;
    let Y = 6;
    let battPixels = 18;
    g.reset().setColor(cleanColor).fillRect(X, Y+1, X+53, Y+16); // Clear.
    const batteryVal = E.getBattery();
    let xl = X+1+batteryVal*(battPixels)/100;
    g.setColor(0x8410).fillRect(X+2, Y+3, xl, Y+14); // Grey.
    g.setColor(drawingColor);
    let fontSize = 14;
    if (batteryVal=='100') fontSize = 12;
    g.setFontAlign(-1,0).setFont("Vector", fontSize).drawString(batteryVal+'%', X+26, Y+10);
    if (Bangle.isCharging()) {
      g.drawImage(atob("GBKBAAAAAH//+P///MAADMAADMAwDMDwD8PwD8/x794/z8A/D8A8D8AwDMAADMAADP///H//+AAAAA=="), X, Y); // 24x18 chr.
    } else {
      g.drawImage(atob("GBKBAAAAAH//+P///MAADMAADMAADMAAD8AAD8AAD8AAD8AAD8AAD8AADMAADMAADP///H//+AAAAA=="), X, Y); // 24x18 batt.
    }
  };
  let setBatt = function() {
    // Battery update events.
    Bangle.on('charging', drawBatt);
    if ( battIntervall == 0 ) battIntervall = 1000; // Real time mode. (1sec).
    battIntervallID = setInterval(drawBatt, battIntervall);
  };

  // *******************
  // Memory drawing.
  let memIntervallID;
  let drawMemory = function() {
    if (debug) console.log('drawMemory');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let X = 131;
    let Y = 3;
    let maxBarPixels = 19;
    let m = process.memory(false); 
    let totalHDSpace = process.env.STORAGE;
    let ramUsedPercent = Math.round(m.usage*100 / m.total);
    let hdUsedPercent = Math.round(((totalHDSpace - storage.getFree()) / totalHDSpace) * 100); 
    let ramBarPixels = X+11+ramUsedPercent*(maxBarPixels)/100;
    let hdBarPixels = X+11+hdUsedPercent*(maxBarPixels)/100;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+41, Y+19); // Clear.  
    g.setColor(drawingColor).fillRect(X, Y, X+41, Y+19)
    g.setColor(cleanColor).drawImage(atob("BxCBAH399/ff3wAAcbc+P98c"), X+2, Y+2); // 7x16 chr
    // main corner.
    g.fillRect(X, Y, X+1, Y).fillRect(X, Y, X, Y+1);
    g.fillRect(X, Y+19, X+1, Y+19).fillRect(X, Y+18, X, Y+19);
    g.fillRect(X+40, Y+19, X+41, Y+19).fillRect(X+41, Y+18, X+41, Y+19);
    g.fillRect(X+40, Y, X+41, Y).fillRect(X+41, Y, X+41, Y+1);
    // values.
    g.drawString(ramUsedPercent, X+33, Y+3);
    g.drawString(hdUsedPercent, X+33, Y+12);
    // bars.
    g.fillRect(X+11, Y+2, X+11+maxBarPixels, Y+8).fillRect(X+11, Y+11, X+11+maxBarPixels, Y+17);
    g.setColor(0x001f);// fill.  
    g.fillRect(X+11, Y+2, ramBarPixels, Y+8).fillRect(X+11, Y+11, hdBarPixels, Y+17);
    g.setColor(drawingColor);//border
    g.setPixel(X+11, Y+2).setPixel(X+11+maxBarPixels, Y+2);
    g.setPixel(X+11, Y+8).setPixel(X+11+maxBarPixels, Y+8);
    g.setPixel(X+11, Y+11).setPixel(X+11+maxBarPixels, Y+11);
    g.setPixel(X+11, Y+17).setPixel(X+11+maxBarPixels, Y+17);
  };
  let setMemory = function() {
    if (debug) console.log('setMemory');
    if ( memIntervall == 0 ) memIntervall = 1000; // Real time mode. (1sec).
    memIntervallID = setInterval(drawMemory, memIntervall);
  };

  // *******************
  // Draw weather.
  let barPressures = [];
  let barIntervallID;
  // Get barometer temperature and pressure values.
  let drawWeather = function(pressure) {
    if (debug) console.log('drawWeather');
    let X = 5;
    let Y = 138;
    g.reset().setColor(cleanColor).fillRect(X, Y, X+82, Y+14); // Clear. 
    
    g.setColor(drawingColor).drawImage(atob("Eg+BAAA+ABjADBg2Ax+AzC42C42Bw8DhuHDH3uADgAHAAOAAIAA="), X, Y); // 7x16 chr
    //g.setColor(drawingColor).drawImage(atob("GQ6BAEEAADGGAAyGAAHyD4D+DGD/DBt/bAb+fgMfYYGPYEDJsABsMABsHHhgB/fg"), X, Y); // 7x16 chr
    //g.setColor(drawingColor).drawImage(atob("Dg6BAEEBjDMhg+QP4H+N/5/7H+B/AnwYTMMYCCA="), X+2, Y); // 7x16 chr
    
    //g.setFontAlign(1, 0).setFont("Vector", 16).drawString(pressure, X+89, Y+8);
    g.setFontAlign(1, 0).setFont("Vector", 16).drawString('1200', X+67, Y+9);
    g.setFont("Vector", 9).setFontAlign(-1, 0).drawString('hPa', X+68, Y+10);
  };
  let getBarometer = function(e) {
    if (debug) console.log('getBarometer');
    let barReadings = 8;
    if (barPressures.length > barReadings) barPressures.splice(barReadings);
    barPressures.unshift(e.pressure);
    // Shut down the barometer at barReadings.
    if (barPressures.length >= barReadings) {
      if ( barIntervall > 0 ) {
        if (debug) console.log('releaseBarometer');
        Bangle.removeListener('pressure', getBarometer);
        Bangle.setBarometerPower(false, appName);
      }
      // Calc avgs.
      let sumPress = barPressures.reduce((acc, value) => acc + value, 0);
      let avgPress = sumPress / barPressures.length;
      barPressures = [];
      let pressure = (avgPress> -100 && avgPress < 1000) ? avgPress.toFixed(1) : avgPress.toFixed(0); // hPa. xxxx.
      drawWeather(pressure);
    }
  };
  function initBarometer() {
    if (debug) console.log('initBarometer');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    Bangle.setBarometerPower(true, appName);
    Bangle.on('pressure', getBarometer);
  }
  function setBarometer() {
    if (debug) console.log('setBarometer');
    drawWeather(0); // First zero draw.
    if ( barIntervall > 0 ) {
      barIntervallID = setInterval( initBarometer, barIntervall); // Schedule next runs.
    } else { // Real time mode.
      initBarometer();
    }
  }

  // *******************
  // Exit strategy handler.
  Bangle.setUI({
    mode : "clock",
    remove : function() {
      if (debug) console.log('Exit');
      // Clear clock main timeout.
      if (mainTimeoutID) clearTimeout(mainTimeoutID);
      mainTimeoutID = undefined;
      // Clear other intervalls.
      if (intervalGPS) clearInterval(intervalGPS);
      intervalGPS = undefined;
      if (barIntervallID) clearInterval(barIntervallID);
      barIntervallID = undefined;
      if (battIntervallID) clearInterval(battIntervallID);
      battIntervallID = undefined;
      if (memIntervallID) clearInterval(memIntervallID);
      memIntervallID = undefined;   
      if (stepIntervallID) clearInterval(stepIntervallID);
      stepIntervallID = undefined;       
      // Shutdown barometer. (only for the clock).
      Bangle.setBarometerPower(false, "drawTempPressPawlClock");
      // Remove listners.
      Bangle.removeListener('charging', drawBatt);
      if ( stepIntervall == 0 ) // Real time mode.
        Bangle.removeListener('step', drawSteps);
      if (!offScreenUpd) { Bangle.removeListener('lcdPower', drawStepsOnLcdPower); }
      Bangle.removeListener('lock', drawLock);
      Bangle.removeListener('HRM', drawBpmOnHRM);
      Bangle.removeListener('pressure', getBarometer);
      NRF.removeListener('connect', drawBLE);
      NRF.removeListener('disconnect', drawBLE);
      // Restore overrided functions.
      Bangle.setHRMPower = hp;
      Bangle.setGPSPower = oldSetGPSPower;
      // Delete the custom font.
      delete Graphics.prototype.setFontLato;
      //
      g.clear();
      widget_utils.show(); // Show widgets. (FastLoading way).
    }
  });

  // *******************
  // Clock-app entery point.
  makeIt();

} // End of app scope.

// That's all folks!

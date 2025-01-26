/*
*    PawlClock v0.01
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
  Graphics.prototype.setFontLato = function(scale) {
    // Actual height 50 (54 - 5).
    this.setFontCustom(
      E.toString(heatshrink.decompress(atob('ADkD8AHFg/wA4sP/AHVD44HHgPALD0OA40+F43+H4wHGn/8A4v/L4sH/5PFj//CxkD/6eFCw9/GooWHh//wAWLgP/TgoWHn5rFCw41BMYqCHaRDKGgzLYKAJgFv//LIhQBAAI7DWgIABU4adBAAJTDn4HCVAaOCQQhvDAYQuBDYaxBgJEDh4HBgYzDPgUDIYYECA5DUDgIHBg4HEEgIHfF44/EA45HDL4xvHP46PHT5CvHX47PDGYcDb4zvHf5AA/AA9wA4yoDZYq/DXAgHDXYQHEXYQHEj4HHXYQHDn6UCA4d/e4sAXYYHCd4gHCXwbADA86DFA/4HGAGA3Db40HA4UDe40Hc4YHCh7nDA4UfA4X/A4U/A4b/Cv7vGX4UB/A+CZ4YaCgf9A4sH+IHCHwfjA4JWDj/DA4s/wYHFv4kCA4f+A4pKBA4sD/AHCG4R9BA4YCBj/gA4s/4AECN4R5BA4f/gf/Mgn///+A4wZBA4d//6JBA4c/VATHEVASUEEwIHEAAbnDAGbyCAAg+DgKwDA4S4DLQSlCSYQHCn4HDFAV/bAX/4ADFCYgbCh4zHZ4SlBR4iSEA46XCe4QHCDgJWCngHOnwHGvwHRG4iFBI4ppBA4f4OIRnCN4MD9+AO4f///v8CHCDoP/54CBS4f/44CBU4f/wYHBX4f/EQLHDh6gB/6jDZQaTDAEUcA40/A4xODYoYHGgYHGh4HGNIIuG74uGz4uGj4uF/gHFh/4A4sf+AHFn/AA4q0BA4kBVgIHEFwIHFFwIHFj7jBA4guBA4rjCA4YuCA4guCA4r0BAATgBA75SEa4wHvAEEBA40DUYIAEg4HDgZ0Bh67BXAQHCZYJMBA4UHA4KPCA4SXEAgQHL4IEBgIHC/AMCgP4CQUDFgIHoIQY3DA4wCEDggHFO4YHB/iHDCQX+gE/S4IHCOIP/U4IHCv6CBA4k/A4K1CEQKpBEIIHDh//HILSDTQK+CAAd/f64Amn4GFgLxCAAZfBSIIADN4heDP4YeDR4Z5CEwN/U4IABg4NBj6ADEwLHDIoQtBVgQuCHoIHDFwIHBe4QLB/14A4kH/i1BeQQuB/AHFn/wA4pLBA4guBwAHELoMAA4o9BA4Q3BgYFBJ4gCCA4pqBvxvDf4T2Bh4HCIIc/R4MCKISfBS4aQCU4gHDX4ioBY4paBNwQAD/6uDAAUOf4wAjO4QHNdQYHYmAHGW4gUEA4kPA4z7BA4v/A4qYBY4QHCh63CA4c/V4QHDV4Y6DV4YHCDwYHDDwYHDv7ODA4MBZwgHBcwL1DA4MfdogHBDwgHB+LtFgf3DwhMCDwgHCDwhcFA4geEA4IeFA4IeFd5AArj77EsCgB/gGCg5QBOQkf/6oB/77D//DA4JrCv//44HB4DkC//n/E/MgIcCRIMPA4X8RIUHegQCBFoL8DA4cBA4QaBv4HGvwHBTgMHHQM+HgIHhF44HFJ5RfGN45/Bz6NBP4SPHT4XnT4ivHX47PHgCQCb4bvIAHxdBMgRfD/58CKgf/WgIADP4JlFR4J1ET4QHCiACBQwQEBuC/CDIIHBX4QtBn+Aa4sfZ4bvCh+Ah4HGUAUHA4d/AgIHEa4QHDwJyCA4eDKIQHDx5pCA4bPDG4c/RIRPCjwuCA4aJBUwZnCRAcBP4SgE/+D/7+ET4ImDA4jIEX4KvFh7HGgbXGgF+f6oAggZeBSgShEb4RYCagQHGh5iDA5QXEE443HADoA=='))),
      46,
      atob("DhglJSUlJSUlJSUlEA=="),
      64+(scale<<8)+(1<<16)
    );
    return this;
  };

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
    drawUTC();
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
    // Lines.
    g.setColor(drawingColor);
    let bar0_x = 8;
    let bar0_y = 30;
    g.fillRect(bar0_x, bar0_y, bar0_x+160, bar0_y+1);
    let bar1_x = 39;
    let bar1_y = 32;
    g.fillRect(bar1_x, bar1_y, bar1_x+1, bar1_y+35);
    let bar2_x = 61;
    let bar2_y = 95;
    g.fillRect(bar2_x, bar2_y, bar2_x+1, bar2_y+20);
    let bar3_x = 0;
    let bar3_y = 95;
    g.fillRect(bar3_x, bar3_y, bar3_x+60, bar3_y+1);
    let bar4_x = 80;
    let bar4_y = 38;
    g.fillRect(bar4_x, bar4_y, bar4_x+1, bar4_y+51);
    let bar5_x = 88;
    let bar5_y = 59;
    g.fillRect(bar5_x, bar5_y, bar5_x+87, bar5_y+1);
    let bar6_x = 167;
    let bar6_y = 61;
    g.fillRect(bar6_x, bar6_y, bar6_x+1, bar6_y+29);
    let bar7_x = 80;
    let bar7_y = 89;
    g.fillRect(bar7_x, bar7_y, bar7_x+88, bar7_y+1);
    let bar8_x = 61;
    let bar8_y = 115;
    g.fillRect(bar8_x, bar8_y, bar8_x+114, bar8_y+1);
  };

  // *******************
  // Main clock drawing.
  let drawClock = function() {
    if (debug) console.log('drawClock');
    let date = new Date();
    let timeStr = locale.time(date,1);
    // Draw time.
    let timeX = 8;
    let timeY = 122;
    g.reset().setColor(cleanColor).fillRect(timeX, timeY, timeX+159, timeY+48).setColor(drawingColor); // Clear.
    g.setFontAlign(0, 0).setFontLato().drawString(timeStr, timeX+79, timeY+27);
  };

  // *******************
  // Timezone Info drawing.
  let drawUTC = function() {
    if (debug) console.log('drawUTC');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let date = new Date();
    let utc = date.getTimezoneOffset() / -60;
    // Draw time.
    let utcX = 8;
    let utcY = 104;
    g.reset().setColor(cleanColor).fillRect(utcX, utcY, utcX+49, utcY+9).setColor(drawingColor); // Clear.
    g.setFontAlign(-1, 0).setFont("Vector", 13).drawString('UTC', utcX, utcY+5);
    g.setFontAlign(0, 0).drawString((utc >= 0 ? "+" : "") + utc, utcX+40, utcY+5);
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
    // Draw day.
    g.setColor(drawingColor).setFontAlign(0, 0);
    let dayX = 8;
    let dayY = 38;
    g.reset().setColor(cleanColor).fillRect(dayX, dayY, dayX+24, dayY+29).setColor(drawingColor); // Clear. 
    g.setFont("Vector", 15).drawString(dayStr, dayX+1, dayY);
    g.setFont("Vector", 20).drawString(dayNum, dayX+1, dayY+14);
    // Draw month.
    let monthX = 48;
    let monthY = 38;
    g.reset().setColor(cleanColor).fillRect(monthX, monthY, monthX+24, monthY+29).setColor(drawingColor); // Clear.  
    g.setFont("Vector", 15).drawString(monthStr, monthX, monthY);
    g.setFont("Vector", 20).drawString(monthNum, monthX+2, monthY+14);
    // Draw icon.
    let icon_x = 9;
    let icon_y = 74;
    if (debug) { g.reset().setColor(cleanColor).fillRect(icon_x, icon_y, icon_x+13, icon_y+13); } // Clear. 
    g.setColor(drawingColor).drawImage(atob("Dg6BADhz/////////wA9tvbbwA9tvbbwA/////A="), icon_x, icon_y); // 14x14.
    // Draw year.
    let yearX = 32;
    let yearY = 75;
    g.reset().setColor(cleanColor).fillRect(yearX, yearY, yearX+40, yearY+12).setColor(drawingColor); // Clear. 
    g.setFont("Vector", 17).drawString(year, yearX, yearY-1);
  };
  
  // *******************
  // HR Info drawing.
  // if ( Bangle.isCharging())
  let drawBpm = function() {
    if (debug) console.log('drawBpm');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let infoX = 88;
    let infoY = 38;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY, infoX+80, infoY+14); // Clear.
    g.setColor(drawingColor).setFontAlign(0, 0).setFont("Vector", 20).drawString(bp, infoX+40, infoY+9);
    g.setFont("Vector", 9).drawString('BPM', infoX+72, infoY+8);
    if (Bangle.isHRMOn()) {
      g.setColor(0xf800); // Red.
    }
    g.drawImage(atob("DxKBAAAAAAAAAePH79/////////+//n/8f/B/wH8AfABwAAAAAA="), infoX, infoY-2); // 15x18.
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
    let infoX = 88;
    let infoY = 66;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY, infoX+72, infoY+17); // Clear.
    g.setColor(drawingColor);
    g.drawImage(atob("EhKBAAcAA8MD+cP/8L/8N/oG/4DfoBv8A30Ab8AN+AG+ADfABvAA3AAbAAOA"), infoX, infoY); // 18x18.
    let steps = Bangle.getHealthStatus("day").steps;
    let fontSize = 21;
    if (steps>9999) fontSize = 16;
    g.setFontAlign(0, 0).setFont("Vector", fontSize).drawString(steps, infoX+50, infoY+10);
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
    let infoX = 30;
    let infoY = 6;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY, infoX+9, infoY+17); // Clear. 
    if (NRF.getSecurityStatus().connected) {
      g.setColor(0x001f); // Blue.
    } else {
      g.setColor(drawingColor);
    }
    g.drawImage(atob("ChKBABgHAeB82753uPweD4fz7tnG4fB4HAYA"), infoX, infoY); // 10x18.
  };
  // BLE update events.
  NRF.on('connect', drawBLE);
  NRF.on('disconnect', drawBLE);

  // *******************
  // Lock Screen drawing.
  let drawLock = function() {
    if (debug) console.log('drawLock');
    let infoX = 8;
    let infoY = 6;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY, infoX+13, infoY+17); // Clear. 
    g.setColor(drawingColor);
    if (Bangle.isLocked()) {
      g.drawImage(atob("DhKBAAAAHgH+DzwwMcDmAZgGYBv/////P/h/4f/P/h/////w"), infoX, infoY); // 14x18.
    } else {
      g.drawImage(atob("DhKBAB8B/gccODjgY4AHABwAOAP/////P/h/4f/P/h/////w"), infoX, infoY); // 14x18.
    }
  };
  // Lock Screen info update events.
  Bangle.on("lock", drawLock);

  // *******************
  // GPS drawing.
  let drawGPS = function() {
    if (debug) console.log('drawGPS');
    if (!Bangle.isLCDOn() && !offScreenUpd) return; // Exits the function if the screen is off and offScreenUpd is false.
    let infoX = 48;
    let infoY = 6;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY, infoX+17, infoY+17); // Clear. 
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
      g.setColor(drawingColor); // ( GPS off ).
    }
    g.drawImage(atob("EhKBADgAGwANYAKswNd4G78D/+Bv+Af8A/4A/2Hf/Hvdj26x41Q4awYNgAHA"), infoX, infoY); // 17x18.
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
    let infoX = 74;
    let infoY = 6;
    let battPixels = 18;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY+1, infoX+53, infoY+16); // Clear.
    const batteryVal = E.getBattery();
    let xl = infoX+1+batteryVal*(battPixels)/100;
    g.setColor(0x8410).fillRect(infoX+2, infoY+3, xl, infoY+14); // Grey.
    g.setColor(drawingColor);
    let fontSize = 14;
    if (batteryVal=='100') fontSize = 12;
    g.setFontAlign(-1,0).setFont("Vector", fontSize).drawString(batteryVal+'%', infoX+26, infoY+10);
    if (Bangle.isCharging()) {
      g.drawImage(atob("GBKBAAAAAH//+P///MAADMAADMAwDMDwD8PwD8/x794/z8A/D8A8D8AwDMAADMAADP///H//+AAAAA=="), infoX, infoY); // 24x18 chr.
    } else {
      g.drawImage(atob("GBKBAAAAAH//+P///MAADMAADMAADMAAD8AAD8AAD8AAD8AAD8AAD8AADMAADMAADP///H//+AAAAA=="), infoX, infoY); // 24x18 batt.
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
    let infoX = 136;
    let infoY = 6;
    let maxBarPixels = 15;
    g.reset().setColor(cleanColor).fillRect(infoX, infoY+1, infoX+38, infoY+16); // Clear. 
    g.setColor(drawingColor).drawImage(atob("BxCBAH399/ff3wAAcbc+P98c"), infoX, infoY+1); // 7x16 chr
    let m = process.memory(false); 
    let totalHDSpace = process.env.STORAGE;
    let ramUsedPercent = Math.round(m.usage*100 / m.total);
    let hdUsedPercent = Math.round(((totalHDSpace - storage.getFree()) / totalHDSpace) * 100);   
    let ramBarPixels = infoX+10+ramUsedPercent*(maxBarPixels)/100;
    g.setFontAlign(-1,0).setFont("Vector", 6);
    g.fillRect(infoX+9, infoY+1, ramBarPixels, infoY+8).drawRect(infoX+9, infoY+1, infoX+25, infoY+8);
    g.drawString(ramUsedPercent, infoX+28, infoY+5);
    let hdBarPixels = infoX+10+hdUsedPercent*(maxBarPixels)/100;
    g.fillRect(infoX+9, infoY+9, hdBarPixels, infoY+16).drawRect(infoX+9, infoY+9, infoX+25, infoY+16);
    g.drawString(hdUsedPercent, infoX+28, infoY+13);
  };
  let setMemory = function() {
    if (debug) console.log('setMemory');
    if ( memIntervall == 0 ) memIntervall = 1000; // Real time mode. (1sec).
    memIntervallID = setInterval(drawMemory, memIntervall); 
  };

  // *******************
  // Draw temperature and pressure.
  let barTemperatures = [];
  let barPressures = [];
  let barIntervallID;
  // Estimated ambient air temperature.
  let estAmbientTemp = function(sensorTemp) {
    let alpha = 1.7; // Thermal insulation coefficient.
    let wristSkinTemp = 33; // Estimated average skin temperature.
    return sensorTemp - alpha * (sensorTemp - wristSkinTemp); // Dynamic calc contribution of wrist heat.
  };
  // Get barometer temperature and pressure values.
  let drawBarometer = function(temperature, pressure) {
    if (debug) console.log('drawBarometer');
    let barX = 68;
    let barY = 96;
    g.reset().setColor(cleanColor).fillRect(barX, barY, barX+104, barY+13).setColor(drawingColor); // Clear. 
    g.drawImage(atob("Bw6BADhQoUKHDhx9///3xwA="), barX, barY); // 7x14.
    g.setFontAlign(1, 0).setFont("Vector", 16).drawString(temperature, barX+30, barY+8).drawString(pressure, barX+89, barY+8);
    g.setFont("Vector", 9).setFontAlign(-1, 0).drawString('C°', barX+32, barY+7);
    g.setFontAlign(-1, 0).drawString('hPa', barX+90, barY+7);
  };
  let getBarometer = function(e) {
    if (debug) console.log('getBarometer');
    let barReadings = 8;
    if (barTemperatures.length > barReadings) barTemperatures.splice(barReadings);
    if (barPressures.length > barReadings) barPressures.splice(barReadings);
    barTemperatures.unshift(e.temperature);
    barPressures.unshift(e.pressure);
    // Shut down the barometer at barReadings.
    if (barTemperatures.length >= barReadings) {
      if ( barIntervall > 0 ) {
        if (debug) console.log('releaseBarometer');
        Bangle.removeListener('pressure', getBarometer);
        Bangle.setBarometerPower(false, appName);
      }
      // Calc avgs.
      let sumPress = barPressures.reduce((acc, value) => acc + value, 0);
      let avgPress = sumPress / barPressures.length;
      let sumTemp = barTemperatures.reduce((acc, value) => acc + value, 0);
      let avgTemp = sumTemp / barTemperatures.length;
      barTemperatures = [];
      barPressures = [];
      let estTemp = estAmbientTemp(avgTemp);
      let temperature = Math.round(estTemp+tempOffset); // C. xx.
      //let temperature = (avgTemp> -100 && avgTemp < 1000) ? avgTemp.toFixed(1) : avgTemp.toFixed(0); // C. xx,x.
      let pressure = (avgPress> -100 && avgPress < 1000) ? avgPress.toFixed(1) : avgPress.toFixed(0); // hPa. xxxx.
      drawBarometer(temperature,pressure);
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
    drawBarometer(0,0); // First zero draw.
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

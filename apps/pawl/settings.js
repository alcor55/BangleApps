(function(back) {
  let settings = require('Storage').readJSON('pawl-clock.json', 1) || {};
  
  if (typeof settings.bgColor !== "number")       settings.bgColor =      0xffff; // Default white.
  if (typeof settings.offScreenUpd !== "boolean") settings.offScreenUpd =   true; // Default true.
  if (typeof settings.barIntervall !== "number")  settings.barIntervall = 600000; // Default 10min.
  if (typeof settings.battIntervall !== "number") settings.battIntervall = 60000; // Default 1min.
  if (typeof settings.memIntervall !== "number")  settings.memIntervall =  60000; // Default 1min.
  if (typeof settings.stepIntervall !== "number") settings.stepIntervall = 60000; // Default 1min.
  if (typeof settings.weatherMinPress !== "number") settings.weatherMinPress = 1005; // Default 1min.
  if (typeof settings.weatherMaxPress !== "number") settings.weatherMaxPress = 1020; // Default 1min.
  if (typeof settings.debug !== "boolean")        settings.debug =         false; // Default false.
  
  function save(key, value) {
    settings[key] = value;
    require('Storage').writeJSON('pawl-clock.json', settings);
  }
  
  const colors = [
    { name: "Black",     hex: 0x0000 }, // (0, 0, 0)
    { name: "White",     hex: 0xffff }, // (1, 1, 1)
    { name: "Cyan",      hex: 0x07ff }, // (0, 1, 1)
    { name: "Red",       hex: 0xf800 }, // (1, 0, 0)
    { name: "Yellow",    hex: 0xffe0 }, // (1, 1, 0)
    { name: "LimeGreen", hex: 0x87e0 }, // (0.5, 1, 0)
    { name: "Green",     hex: 0x07e0 }, // (0, 1, 0)
    { name: "DarkGreen", hex: 0x0400 }, // (0, 0.5, 0)
    { name: "Torquoise", hex: 0x07f0 }, // (0, 1, 0.5)
    { name: "Magenta",   hex: 0xf81f }, // (1, 0, 1)
    { name: "Pink",      hex: 0xf810 }, // (1, 0, 0.5)
    { name: "Blue",      hex: 0x001f }, // (0, 0, 1)
    { name: "DarkBlue",  hex: 0x0010 }  // (0, 0, 0.5)
  ];
  const colorLabels = colors.map(c => c.name);
  const colorCurrentIndex = colors.findIndex(c => c.hex === settings.bgColor);

  const intervals = [
    { name: "Real Time", millisec:      0 },
    { name: "15 sec",    millisec:  15000 },
    { name: "30 sec",    millisec:  30000 },
    { name: "1 min",     millisec:  60000 },
    { name: "3 min",     millisec: 180000 },
    { name: "5 min",     millisec: 300000 },
    { name: "10 min",    millisec: 600000 }
  ];
  function getIntervalIndex(value) {
    return intervals.findIndex(c => c.millisec === value);
  }
  const intervalsLabels = intervals.map(c => c.name);
  const barIntervalIndex = getIntervalIndex(settings.barIntervall);
  const memIntervalIndex = getIntervalIndex(settings.memIntervall);
  const battIntervalIndex = getIntervalIndex(settings.battIntervall);
  const stepIntervalIndex = getIntervalIndex(settings.stepIntervall);
  
  const appMenu = {
    '': { 'title': 'PawlClock' },
    '< Back': back,
    "BG Color": {
      value: colorCurrentIndex >= 0 ? colorCurrentIndex : 0,
      min: 0, max: colors.length - 1,
      format: v => colorLabels[v],
      onchange: v => save('bgColor', colors[v].hex)
    },
    'Off screen uptate?': {
      value: settings.offScreenUpd,
      format: v => v ? "On" : "Off",
      onchange: v => save('offScreenUpd', v)
    },
    "Temp/Press upd. intervall": {
      value: barIntervalIndex >= 0 ? barIntervalIndex : 0,
      min: 0, max: intervals.length - 1,
      format: v => intervalsLabels[v],
      onchange: v => save('barIntervall', intervals[v].millisec)
    },
    "Memory upd. intervall": {
      value: memIntervalIndex >= 0 ? memIntervalIndex : 0,
      min: 0, max: intervals.length - 1,
      format: v => intervalsLabels[v],
      onchange: v => save('memIntervall', intervals[v].millisec)
    },
    "Battery upd. intervall": {
      value: battIntervalIndex >= 0 ? battIntervalIndex : 0,
      min: 0, max: intervals.length - 1,
      format: v => intervalsLabels[v],
      onchange: v => save('battIntervall', intervals[v].millisec)
    },
    "Step upd. intervall": {
      value: stepIntervalIndex >= 0 ? stepIntervalIndex : 0,
      min: 0, max: intervals.length - 1,
      format: v => intervalsLabels[v],
      onchange: v => save('stepIntervall', intervals[v].millisec)
    },
      "Weather Min Pressure": {
      value: settings.weatherMinPress,
      min: 950, max: 1030,
      format: v => v + " hPa",
      onchange: v => save('weatherMinPress', v)
    },
    "Weather Max Pressure": {
      value: settings.weatherMaxPress,
      min: 960, max: 1050,
      format: v => v + " hPa",
      onchange: v => save('weatherMaxPress', v)
    },
    'Debug': {
      value: settings.debug,
      format: v => v ? "On" : "Off",
      onchange: v => save('debug', v)
    }
  };
  
  E.showMenu(appMenu);
});



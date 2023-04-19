async function tokenUpdate(data) {
  // Update all selected tokens
  for (const token of canvas.tokens.controlled) {
    // console.log(token);
    await token.document.update({
      light: data,
    });
  }
};

const getLightData = (props, animation) => ({
  dim: 0,
  bright: 0,
  angle: 360,
  alpha: 1,
  luminosity: 0.5,
  color: '',
  animation,
  // Override any of the values above
  ...props,
});

const ANIMATIONS = {
  none: {
    type: 'none',
  },
  torch: {
    type: 'torch',
    speed: 1,
    intensity: 1,
    reverse: false,
  },
  starlight: {
    type: 'starlight',
    speed: 0.5,
    intensity: 1,
    reverse: false,
  },
};

const LIGHTS = {
  none: {
    name: 'None',
    // Use light defaults (none)
    data: getLightData({}, ANIMATIONS.none),
  },
  torch: {
    name: 'Torch',
    data: getLightData({ dim: 40, bright: 20 }, ANIMATIONS.torch),
  },
  lamp: {
    name: 'Lamp',
    data: getLightData({ dim: 45, bright: 15 }, ANIMATIONS.torch),
  },
  bullseyeLanternOpen: {
    name: 'Bullseye Lantern',
    data: getLightData({ dim: 120, bright: 60, angle: 45 }, ANIMATIONS.torch),
  },
  hoodedLanternOpen: {
    name: 'Hooded Lantern (Open)',
    data: getLightData({ dim: 60, bright: 30 }, ANIMATIONS.torch),
  },
  hoodedLanternClosed: {
    name: 'Hooded Lantern (Closed)',
    data: getLightData({ dim: 5, bright: 0 }, ANIMATIONS.torch),
  },
  // Cantrips
  cantripLight: {
    name: 'Cantrip: Light',
    data: getLightData({ dim: 40, bright: 20 }, ANIMATIONS.none),
  },
  // Spells
  spellDarkness: {
    name: 'Spell: Darkness',
    data: getLightData({ dim: 0, bright: 15, luminosity: -0.5 }, ANIMATIONS.none),
  },
  // Effects
  effectStarlight: {
    name: 'Effect: Starlight',
    data: getLightData({ dim: 20, bright: 10, color: '#99FFCC', alpha: 0.25 }, ANIMATIONS.starlight),
  },
}

const buttons = {
  ...Object.entries(LIGHTS).reduce((acc, [id, light]) => ({
    ...acc,
    [id]: {
      label: light.name,
      callback: () => {
        tokenUpdate(light.data);
        dialogEditor.render(true);
      }
    },
  }), {}),
  close: {
    icon: '<i class="fas fa-times"></i>',
    label: 'Close',
  },
};

dialogEditor = new Dialog({
  title: 'Token Light Picker',
  content: 'Pick the light source for the token.',
  buttons,
  default: 'close',
  close: () => {},
}).render(true);

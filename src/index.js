// This function stores our state.
const storeState = () => {
    let currentState = {};
    return (stateChangeFunction = state => state) => {
      const newState = stateChangeFunction(currentState);
      currentState = {...newState};
      return newState;
    }
  }

const stateControl = storeState();

// This is a function factory. 
// We can easily create more specific functions that 
// alter a plant's soil, water, and light to varying degrees.
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. 
// We could easily create many more.
const feed = changeState("feed")(1);
const blueFood = changeState("superfeed")(5);

const water = changeState("water")(1);
const superWater = changeState("superwater")(5);

const sun = changeState("sunlight")(5);


window.onload = function() {

  // This function has side effects because we are manipulating the DOM.
  // Manipulating the DOM will always be a side effect. 
  // Note that we only use one of our functions to alter soil. 
  // You can easily add more.
  document.getElementById('feed').onclick = function() {
    const newState = stateControl(feed);
    document.getElementById('feed').innerText = `Soil: ${newState.feed}`;
  };
  document.getElementById('superfeed').onclick = function() {
    const newState = stateControl(blueFood);
    document.getElementById('superfeed').innerText = `Soil: ${newState.superfeed}`;
  };
  document.getElementById('water').onclick = function() {
    const newState = stateControl(water);
    document.getElementById('water').innerText = `Water: ${newState.water}`;
  };
  document.getElementById('superwater').onclick = function() {
    const newState = stateControl(superWater);
    document.getElementById('superwater').innerText = `Water: ${newState.superwater}`;
  };
  document.getElementById('sunlight').onclick = function() {
    const newState = stateControl(sun);
    document.getElementById('sun').innerText = `Sunlight: ${newState.sun}`;
  };
  // This function doesn't actually do anything useful in this application 
  // — it just demonstrates how we can "look" at the current state 
  // (which the DOM is holding anyway). 
  // However, students often do need the ability to see the current state 
  // without changing it so it's included here for reference.
  document.getElementById('show-state').onclick = function() {
    // We just need to call stateControl() without arguments 
    // to see our current state.
    const currentState = stateControl();
    document.getElementById('feed').innerText = `Feed: ${currentState.feed}`;
    document.getElementById('superfeed').innerText = `Superfeed: ${currentState.superfeed}`;
    document.getElementById('water').innerText = `Water: ${currentState.water}`;
    document.getElementById('superwater').innerText = `Superwater: ${currentState.superwater}`;
    document.getElementById('sun').innerText = `Sun: ${currentState.sun}`;
  };
};
export default function (store, key, value) {
  if (store.debug) {
    console.log('setters: ', key, value);
  }
  store.state[key] = value;
}
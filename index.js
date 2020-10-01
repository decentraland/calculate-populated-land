const { CatalystClient } = require("dcl-catalyst-client");

const catalyst = new CatalystClient("https://peer.decentraland.org", "builder");

const deployments = {};
const hashes = new Set();
const coords = new Set();

const pointers = [];
for (let x = -150; x <= 150; x++) {
  for (let y = -150; y <= 150; y++) {
    pointers.push(x + "," + y);
  }
}

console.log("Loading data...");
const options = { pointers, onlyCurrentlyPointed: true };
catalyst.fetchAllDeployments(options).then((entities) => {
  for (const entity of entities) {
    const hash = entity.entityId;
    hashes.add(hash);
    for (const coord of entity.pointers) {
      deployments[coord] = hash;
      coords.add(coord);
    }
  }

  console.log("Total LAND:", pointers.length);
  console.log("Populated LAND:", coords.size);
  console.log("Total scenes:", hashes.size);
});

// 0.2 in the middle of the coordinates is the z axis that makes the models

// be slightly raised
const treePositionMap = {
  1: "-1 0.2 -1",
  2: "0 0.2 -1",
  3: "1 0.2 -1",
  4: "-1 0.2 0",
  5: "0 0.2 0",
  6: "1 0.2 0",
  7: "-1 0.2 1",
  8: "0 0.2 1",
  9: "1 0.2 1",
};
const plantModelMap = {
  1: "plant-model-1",
  2: "plant-model-2",
  3: "plant-model-3",
  4: "plant-model-4",
  5: "plant-model-5",
  6: "plant-model-6",
  7: "plant-model-7",
  8: "plant-model-8",
  9: "plant-model-9",
};

const SMALL_TREE_MODEL = "obj: #small-tree-obj; mtl: #small-tree-mtl";
const MED_TREE_MODEL = "obj: #medium-tree-obj; mtl: #medium-tree-mtl";
const BIG_TREE_MODEL = "obj: #big-tree-obj; mtl: #big-tree-mtl";

const growthMap = {
  0: SMALL_TREE_MODEL,
  1: SMALL_TREE_MODEL,
  2: MED_TREE_MODEL,
  3: BIG_TREE_MODEL,
};
const scaleMap = {
  0: "0 0 0",
  1: "0.3 0.3 0.3",
  2: "0.3 0.3 0.3",
  3: "0.3 0.3 0.3",
};

let currentTileGrowthMap = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};
let newTileGrowthMap = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 3,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
};

// let tile_nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// // let growth_nums = tile_nums.map((_) => Math.floor(Math.random() * 3) + 1);
// let growth_nums = [3, 1, 1, 1, 1, 1, 1, 1, 1];

// let new_tile_nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let new_growth_nums = [3, 1, 3, 1, 1, 1, 1, 1, 1];

// const zip = (a, b) => a.map((k, i) => [k, b[i]]);

for (tile_num in currentTileGrowthMap) {
  let growth_num = currentTileGrowthMap[tile_num];
  let tree = document.getElementById(plantModelMap[tile_num]);
  tree.setAttribute("scale", scaleMap[growth_num]);
  tree.setAttribute("position", treePositionMap[tile_num]);
  tree.setAttribute("obj-model", growthMap[growth_num]);
}

// fetch an inspiring quote
fetch("https://quotes.rest/qod?category=inspire&language=en").then((result) => {
  result.json().then((response) => {
    let quote = response["contents"]["quotes"][0]["quote"];
    let author = response["contents"]["quotes"][0]["author"];
    document.getElementById("quote").innerText = quote;
    document.getElementById("author").innerText = `- ${author}`;
    console.log(quote, author);
  });
});

let firstTime = true;
const fallTime = 1000;
const riseTime = 1000;
// listen for marker found events:
document.getElementById("marker").addEventListener("markerFound", (e) => {
  console.log("Found the marker!");
  if (firstTime) {
    console.log("First time !");
    for (tile_num in currentTileGrowthMap) {
      let curr_g = currentTileGrowthMap[tile_num];
      let new_g = newTileGrowthMap[tile_num];
      if (curr_g != new_g) {
        let tree = document.getElementById(plantModelMap[tile_num]);
        tree.setAttribute(
          "animation",
          `property: scale; to: 0 0 0; dur: ${fallTime}; easing: linear`
        );
        setTimeout((_) => {
          tree.setAttribute("obj-model", growthMap[new_g]);
          tree.setAttribute(
            "animation",
            `property: scale; to: ${scaleMap[new_g]}; dur: ${riseTime}; easing: linear`
          );
          firstTime = false;
        }, fallTime);
      }
    }
  }
});

//random growth
let randint = (stat, end) => Math.floor(Math.random() * end) + start;
fetch("https://6cbbe2ecbbe0.ngrok.io/api/progress").then((res) => {
  res.json().then((result) => {
    console.log(result);
    // let dates = result.map(entry=>entry["date"])
    // result.map((entry) => {
    //   let tile_num = randint(1, 9);
    //   let curr = getCurrentTileGrowthMap();
    //   while (curr[tile_num]>=3){
    //     tile_num = randint(1,9)
    //   }
    //tile-num can now definitely be added to.

    // });
  });
});

function getCurrentTileGrowthMap() {}
function setCurrentTileGrowthMap() {}

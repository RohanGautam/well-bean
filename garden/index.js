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

const STORAGE_KEY = "tile_data";

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

let defaultTileGrowthMap = {
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
  5: 1,
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
    animateModels();
  }
});

function animateModels() {
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
        // firstTime = false;
      }, fallTime);
    }
  }
}

//random growth
function scaleModelBackUp(tile_num, new_g, fallTime) {
  setTimeout((_) => {
    var tree = document.getElementById(plantModelMap[tile_num]);
    tree.setAttribute("obj-model", growthMap[new_g]);
    // tree.setAttribute("scale", "1 1 1");
    // console.log("here!!", tile_num, curr_g, new_g, growthMap[new_g], tree);
    tree.setAttribute(
      "animation",
      `property: scale; to: ${scaleMap[new_g]}; dur: ${riseTime}; easing: linear`
    );
    // firstTime = false;
  }, fallTime);
}

//random growth
let randint = (start, end) => Math.floor(Math.random() * end) + start;
fetch("https://91ef69baed54.ngrok.io/api/progress").then((res) => {
  res.json().then((result) => {
    console.log(result);
    // clearLocalStorage();
    let current_map = getCurrentTileGrowthMap();
    if (!current_map) {
      current_map = defaultTileGrowthMap;
    }
    console.log("curmap is", current_map);
    let new_map = mapInputToGrowth(result.length, { ...current_map });
    console.log("curmap is", current_map);
    setCurrentTileGrowthMap(new_map);
    current_growth_map = { ...current_map };
    newTileGrowthMap = { ...new_map };
    // newTileGrowthMap[3] = 3;
    animateModels();
  });
});
function mapInputToGrowth(entry_num, cur) {
  // let cur = getCurrentTileGrowthMap();
  // if (!cur) {
  //   cur = defaultTileGrowthMap;
  //   console.log(defaultTileGrowthMap);
  // }
  let incremented_count = 0;
  // randomly increment random indices `entry_num` number of times
  while (entry_num != incremented_count) {
    let random_tile_num = randint(1, 9);
    while (cur[random_tile_num] >= 3) {
      random_tile_num = randint(1, 9);
    }
    cur[random_tile_num] += 1;
    incremented_count += 1;
  }
  return cur;
}
// setTimeout(() => {
//   console.log("in set timeout");
//   newTileGrowthMap[3] = 3;
// }, 5000);
function getCurrentTileGrowthMap() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    console.log("key not present");
    return false;
  }
}
function setCurrentTileGrowthMap(curr) {
  console.log("setting..", curr);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(curr));
}

function clearLocalStorage() {
  localStorage.clear();
}

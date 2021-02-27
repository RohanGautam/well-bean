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
  1: SMALL_TREE_MODEL,
  2: MED_TREE_MODEL,
  3: BIG_TREE_MODEL,
};
const scaleMap = {
  1: "0.3 0.3 0.3",
  2: "0.3 0.3 0.3",
  3: "0.3 0.3 0.3",
};

let tile_nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let growth_nums = tile_nums.map((_) => Math.floor(Math.random() * 3) + 1);
let growth_nums = [3, 1, 1, 1, 1, 1, 1, 1, 1];

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

zip(tile_nums, growth_nums).map((ele) => {
  let tile_num = ele[0];
  let growth_num = ele[1];
  let tree = document.getElementById(plantModelMap[tile_num]);
  tree.setAttribute("scale", scaleMap[growth_num]);
  tree.setAttribute("position", treePositionMap[tile_num]);
  tree.setAttribute("obj-model", growthMap[growth_num]);
});

// fetch an inspiring quote
fetch("https://quotes.rest/qod?category=inspire&language=en").then((result) => {
  result.json().then((response) => {
    console.log("response is", response);
    let quote = response["contents"]["quotes"][0]["quote"];
    let author = response["contents"]["quotes"][0]["author"];
    document.getElementById("quote").innerText = quote;
    document.getElementById("author").innerText = `- ${author}`;
    console.log(quote, author);
  });
});

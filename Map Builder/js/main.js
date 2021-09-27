const mapSize = 10;
const layer1 = document.querySelector('#layer1');
const layer2 = document.querySelector('#layer2');
const layer1Btn = document.querySelector('#layer1Btn');
const layer2Btn = document.querySelector('#layer2Btn');
const tyleType = document.querySelector('select');
const getButton = document.querySelector('#getButton');
const giveButton = document.querySelector('#giveButton');
const textarea = document.querySelector('textarea');

//Type -- Number
//WATER     0
//GROUND    1
//STONE     2
//TREE      3

let mousePressed = false;

window.addEventListener('mousedown', (e)=>{
    mousePressed = true;
})

window.addEventListener('mouseup', (e)=>{
    mousePressed = false;
})



for (let i = 0; i < mapSize; i++) {
    const tableRow = document.createElement("tr");
    tableRow.draggable = false;
    for (let i = 0; i < mapSize; i++) {
        const tableData = document.createElement("td");
        const div = document.createElement("div");

        div.draggable = false;
        tableData.draggable = false;
        tableData.tileData = 0;
        

        tableData.addEventListener('mouseenter', (e) =>{
            if(mousePressed){
                if(tyleType.value === "0"){
                    tableData.tileData = 0;
                    div.style.backgroundColor = "aqua";
                }
                else if (tyleType.value === "1"){
                    tableData.tileData = 1;
                    div.style.backgroundColor = "green";
                }
            }
        })

        div.style = "width: 12px; height: 12px;"

        tableData.append(div);
        tableRow.append(tableData);
    }
    layer1.append(tableRow);
}


for (let i = 0; i < mapSize; i++) {
    const tableRow = document.createElement("tr");
    tableRow.draggable = false;
    for (let i = 0; i < mapSize; i++) {
        const tableData = document.createElement("td");
        const div = document.createElement("div");

        div.draggable = false;
        tableData.draggable = false;
        tableData.tileData = 0;

        tableData.addEventListener('mouseenter', (e) =>{
            if(mousePressed){
                if(tyleType.value === "2"){
                    tableData.tileData = 2;
                    div.style.backgroundColor = "grey";
                }
                else if (tyleType.value === "3"){
                    tableData.tileData = 3;
                    div.style.backgroundColor = "brown";
                }
            }
        })

        div.style = "width: 12px; height: 12px;"

        tableData.append(div);
        tableRow.append(tableData);
    }
    layer2.append(tableRow);
}



layer1Btn.addEventListener('change', (e) =>{
    if(layer1Btn.checked){
        layer1.className = "";
    }
    else{
        layer1.className = "hidden";
    }
});

layer2Btn.addEventListener('change', (e) =>{
    if(layer2Btn.checked){
        layer2.className = "";
    }
    else{
        layer2.className = "hidden";
    }
});

const layer1Rows = document.querySelectorAll('#layer1 tr');
const layer2Rows = document.querySelectorAll('#layer2 tr');


getButton.addEventListener('click', (e)=>{

    let file = {};

    file.size = {x:mapSize, y:mapSize};

    file.ground = [];

    for (const row of layer1Rows) {
        const tableDatas = row.querySelectorAll('td');
        let tmp = [];
        for (const data of tableDatas) {
            tmp.push(data.tileData);
        }
        file.ground.push(tmp);
    }

    file.object = [];

    for (const row of layer2Rows) {
        const tableDatas = row.querySelectorAll('td');
        let tmp = [];
        for (const data of tableDatas) {
            tmp.push(data.tileData);
        }
        file.object.push(tmp);
    }

    textarea.value = JSON.stringify(file);
})


giveButton.addEventListener('click' , (e)=>{
    file = JSON.parse(textarea.value);
    
    for (let i = 0; i < file.ground.length; i++) {
        const groundRow = file.ground[i];
        const groundTiles = layer1Rows[i].querySelectorAll('td');
        for (let j = 0; j < groundTiles.length; j++) {
            const tile = groundTiles[j];
            tile.tileData = groundRow[j];
            const div = tile.querySelector('div');
            if(tile.tileData === 0){
                div.style.backgroundColor = "aqua";
            }
            else{
                div.style.backgroundColor = "green";
            }
        }
    }

    for (let i = 0; i < file.object.length; i++) {
        const objectRow = file.object[i];
        const objectTiles = layer2Rows[i].querySelectorAll('td');
        for (let j = 0; j < objectTiles.length; j++) {
            const tile = objectTiles[j];
            tile.tileData = objectRow[j];
            const div = tile.querySelector('div');
            if(tile.tileData === 2){
                div.style.backgroundColor = "grey";
            }
            else if(tile.tileData === 3){
                div.style.backgroundColor = "brown";
            }
        }
    }
})
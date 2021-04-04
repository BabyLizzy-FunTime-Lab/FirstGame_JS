// Global functions
function elementID(ID) {
	return document.getElementById(ID);
}

// CONSTANTEN
let CANVAS_BREEDTE = 800;
let CANVAS_HOOGTE = 600;
let NANONAUT_BREEDTE = 181;
let NANONAUT_HOOGTE = 229;
let GROND_Y = 540;
let NANONAUT_Y_VERSNELLING = 1;
let SPATIEBALK_CODE = "Space";
let NANONAUT_SPRONG_SNELHEID = -20;


// Sprites, Backgrounds & Images
let ninja_sprite = new Image();
	ninja_sprite.src = "Images/nanonauten/nanonaut.png";

let achtergrondAfbeelding = new Image();
	achtergrondAfbeelding.src = "Images/nanonauten/achtergrond.png"


// INSTELLINGEN
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = CANVAS_BREEDTE;
canvas.height = CANVAS_HOOGTE;
canvas.id = "game__canvas";
elementID("game--container").appendChild(canvas);

let nanonautX = 50;
let nanonautY = 40;
let nanonautYSnelheid = 0;
let spatiebalkIsIngedrukt = false;
let nanonautIsInDeLucht = false;

function start() {
	window.requestAnimationFrame(hoofdLus);
}

elementID("start_btn").addEventListener("click", function(event) {
	event.preventDefault();
	start();
})

// HOOFD-LUS
function hoofdLus() {
	update();
	draw();
	window.requestAnimationFrame(hoofdLus);
}

// SPELER-HANDELINGEN
document.body.onkeydown = function(event) {
	if (event.code === SPATIEBALK_CODE) {
		spatiebalkIsIngedrukt = true;
		console.log("nanonautYSnelheid down =" + nanonautYSnelheid);
		console.log("nanonautY down =" + nanonautY)
	}
}
document.body.onkeyup = function(event) {
	if (event.code === SPATIEBALK_CODE) {
		spatiebalkIsIngedrukt = false;
		console.log("nanonautYSnelheid up =" + nanonautYSnelheid);
		console.log("nanonautY up =" + nanonautY)
	}
}

// UPDATEN
function update() {
	// Gravity
	nanonautY = nanonautY + nanonautYSnelheid;
	nanonautYSnelheid = nanonautYSnelheid + NANONAUT_Y_VERSNELLING;
	// Jump
	if (spatiebalkIsIngedrukt && !nanonautIsInDeLucht) {
		nanonautYSnelheid = NANONAUT_SPRONG_SNELHEID;
		nanonautIsInDeLucht = true;
	}
	// Ground bottom
	if (nanonautY > (GROND_Y - NANONAUT_HOOGTE)) {
		nanonautY = GROND_Y - NANONAUT_HOOGTE;
		nanonautYSnelheid = 0;
		nanonautIsInDeLucht = false;
	}	
}


//TEKENEN
function draw() {
	// ctx.clearRect(0, 0, CANVAS_BREEDTE, CANVAS_HOOGTE);

	

	// Teken de lucht
	ctx.fillStyle = "LightSkyBlue";
	ctx.fillRect(0, 0, CANVAS_BREEDTE, GROND_Y - 40);

	// Teken de achtergrond
	ctx.drawImage(achtergrondAfbeelding, 0, -210);

	// Teken de grond
	ctx.fillStyle = "ForestGreen";
	ctx.fillRect(0, GROND_Y - 40, CANVAS_BREEDTE, CANVAS_HOOGTE - GROND_Y + 40);

	// Teken de Nanonaut
	ctx.drawImage(ninja_sprite, nanonautX, nanonautY);
}




// // Global variable, CONSTANTEN
// let canvas = document.createElement("canvas");
// let ctx = canvas.getContext("2d");
// let ninja_sprite = new Image();
// 	ninja_sprite.src = "Images/nanonauten/nanonaut.png";

// let x = 20;
// let y = 40;

// // Global functions
// function elementID(ID) {
// 	return document.getElementById(ID);
// }

// // Global settings, INSTELLINGEN
// ctx.imageSmoothingEnabled = false;

// // Render Game Character
// function render_squareMan() {
// 	ctx.fillStyle = "green";
// 	ctx.fillRect(10,10, 30, 20);
// }
// function render_ninja() {
// 	ctx.drawImage(ninja_sprite, 20, 40, 50, 40);
// 	// If the image object is created in the function
// 	// it needs the onload method.
// 	// ninja_sprite.onload = function() {
// 	// 	ctx.drawImage(ninja_sprite, 20, 40, 50, 40);
// 	// }	
// }

// let direction = "forward";
// function ninja_loop() {
// 	ctx.clearRect(0, 0, 800, 600);

// 	if (direction === "forward") {
// 		ctx.drawImage(ninja_sprite, x, y, 50, 40);
// 		x++;
// 		window.requestAnimationFrame(ninja_loop);
// 		// console.log("This is x, " + x);
// 		if (x == 200) {
// 			direction = "backwards";
// 		}
// 	} else if (direction === "backwards") {
// 		ctx.drawImage(ninja_sprite, x, y, 50, 40);
// 		x--;
// 		window.requestAnimationFrame(ninja_loop);
// 		// console.log("This is x, " + x);
// 		if (x == 20) {
// 			direction = "forward";
// 		} 
// 	}
// }

// // Create game world
// function start_screen() {
// 	window.requestAnimationFrame(ninja_loop);
// 	canvas.id = "game__canvas";
// 	render_squareMan();
// 	render_ninja();
// 	elementID("game--container").appendChild(canvas);
// }


// // Start Game
// elementID("start_btn").addEventListener("click", function(event) {
// 	event.preventDefault();
// 	start_screen();
// }) 
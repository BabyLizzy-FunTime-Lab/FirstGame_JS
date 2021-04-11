// Global functions
function elementID(ID) {
	return document.getElementById(ID);
}
// Sprites, Backgrounds & Images
let ninja_sprite = new Image();
	ninja_sprite.src = "Images/nanonauten/geanimeerdeNanonaut.png";
let robot_bad_sprite = new Image();
	robot_bad_sprite.src = "Images/nanonauten/geanimeerdeRobot.png";
let achtergrondAfbeelding = new Image();
	achtergrondAfbeelding.src = "Images/nanonauten/achtergrond.png";
let bosje_1_Afbeelding = new Image();
	bosje_1_Afbeelding.src = "Images/nanonauten/bosje1.png";
let bosje_2_Afbeelding = new Image();
	bosje_2_Afbeelding.src = "Images/nanonauten/bosje2.png";

// CONSTANTEN
let CANVAS_BREEDTE = 800;
let CANVAS_HOOGTE = 600;
let GROND_Y = 540;
let ACHTERGROND_BREEDTE = 1000;
let JUMP_CODE = "KeyJ";
let NANONAUT_BREEDTE = 181;
let NANONAUT_HOOGTE = 229;
let NANONAUT_Y_VERSNELLING = 1;
let NANONAUT_SPRONG_SNELHEID = -20;
let NANONAUT_X_SNELHEID = 5;
let NANONAUT_NR_ANIMATIEFRAMES = 7;
let NANONAUT_ANIMATIESNELHEID = 3;
let ROBOT_BREEDTE = 141;
let ROBOT_HOOGTE = 139;
let ROBOT_ANIMATIESNELHEID = 5;
let ROBOT_NR_ANIMATIEFRAMES = 9;
let ROBOT_X_SNELHEID = 2;

// INSTELLINGEN
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = CANVAS_BREEDTE;
canvas.height = CANVAS_HOOGTE;
canvas.id = "game__canvas";
elementID("game--container").appendChild(canvas);
let jump = false;
let cameraX = 0;
let cameraY = 0;
let spelFrameTeller = 0;
let bosjesData = genereerBosjes();
let nanonautX = 70;
let nanonautY = GROND_Y - NANONAUT_HOOGTE;
let nanonautYSnelheid = 0;
let nanonautIsInDeLucht = false;
let nanonautFrameNr = 0;
let nannonautSpriteSheet = {
	nrFramesPerRij: 5,
	spriteWidth: NANONAUT_BREEDTE,
	spriteHeight: NANONAUT_HOOGTE,
	image: ninja_sprite
};
let robotSpriteSheet = {
	nrFramesPerRij: 3,
	spriteWidth: ROBOT_BREEDTE,
	spriteHeight: ROBOT_HOOGTE,
	image: robot_bad_sprite
}
let robotData = [{
	x: 800,
	y: GROND_Y - ROBOT_HOOGTE,
	frameNR: 0
}];

// Create bosjes, with coordinates, to be drawn.
function genereerBosjes() {
	let genereerBosjesData = [];
	let bosjeX = 0;
	let bosjeAfbeelding;
	while (bosjeX < (2 * CANVAS_BREEDTE)) {
		if (Math.random() >= 0.5) {
			bosjeAfbeelding = bosje_1_Afbeelding;
		} else {
			bosjeAfbeelding = bosje_2_Afbeelding;
		}
		genereerBosjesData.push({
			x: bosjeX,
			y: 80 + (Math.random() * 20),
			image: bosjeAfbeelding
		});
		bosjeX += 150 + (Math.random() * 200);
	}
	return genereerBosjesData;
}

// Draw running sprite animation function.
function tekenGeanimeerdeSprite(schermX, schermY, frameNR, spriteSheet) {
	let spriteSheetRij = Math.floor(frameNR/spriteSheet.nrFramesPerRij);
	let spriteSheetKolom = frameNR % spriteSheet.nrFramesPerRij;
	let spriteSheetX = spriteSheetKolom * spriteSheet.spriteWidth;
	let spriteSheetY = spriteSheetRij * spriteSheet.spriteHeight;
	ctx.drawImage(
		spriteSheet.image, 
		spriteSheetX, 
		spriteSheetY,
		spriteSheet.spriteWidth,
		spriteSheet.spriteHeight,
		schermX, schermY,
		spriteSheet.spriteWidth,
		spriteSheet.spriteHeight
	)
}

// Verplaats en animeer robots
function updateRobots() {
	for (var i = 0; i < robotData.length; i++) {
		robotData[i].x -= ROBOT_X_SNELHEID;
		if ((spelFrameTeller % ROBOT_ANIMATIESNELHEID) === 0) {
			robotData[i].frameNR++;
			if (robotData[i].frameNR >= ROBOT_NR_ANIMATIEFRAMES) {
				robotData[i].frameNR = 0;
			}
		}
	}
}

// UPDATEN
function update() {
	// Framecounter
	spelFrameTeller++;
	// Run
	nanonautX = nanonautX + NANONAUT_X_SNELHEID;
	// Jump
	if (jump && !nanonautIsInDeLucht) {
        nanonautYSnelheid = NANONAUT_SPRONG_SNELHEID;
        nanonautIsInDeLucht = true;
	}
	// Gravity
    nanonautY = nanonautY + nanonautYSnelheid;
    nanonautYSnelheid = nanonautYSnelheid + NANONAUT_Y_VERSNELLING;
    // Bottom
    if (nanonautY > (GROND_Y - NANONAUT_HOOGTE)) {
        nanonautY = GROND_Y - NANONAUT_HOOGTE;
        nanonautYSnelheid = 0;
        nanonautIsInDeLucht = false;
    }
    // Update animatie na 3 frames
    if ((spelFrameTeller % NANONAUT_ANIMATIESNELHEID) === 0) {
    	nanonautFrameNr++;
    	if (nanonautFrameNr >= NANONAUT_NR_ANIMATIEFRAMES) {
    		nanonautFrameNr = 0;
    	}
    }
    // Update bosjes, resets coordinates if bosje moves offscreen.
    for (var i = 0; i < bosjesData.length; i++) {
    	if ((bosjesData[i].x - cameraX) < - CANVAS_BREEDTE) {
    		bosjesData[i].x += (2 * CANVAS_BREEDTE) + 150;
    	} 
    }
    // Update robots
    updateRobots();
    // Update camera
    cameraX = nanonautX - 70;
}



//TEKENEN
function draw() {
	// Teken de lucht
	ctx.fillStyle = "LightSkyBlue";
	ctx.fillRect(0, 0, CANVAS_BREEDTE, GROND_Y - 40);

	// Teken de bewegend achtergrond
	// achtergrondX is negative so it scrolls to the left and not to the right.
	let achtergrondX = -(cameraX % ACHTERGROND_BREEDTE);
	ctx.drawImage(achtergrondAfbeelding, achtergrondX, -210);
	ctx.drawImage(achtergrondAfbeelding, achtergrondX + ACHTERGROND_BREEDTE, -210);
	// Modus doesn't allow achtergrondX to go beonde 1000 and loops back to 0. The second draw glues
	// a new background to the end of the first one.

	// Teken de grond
	ctx.fillStyle = "ForestGreen";
	ctx.fillRect(0, GROND_Y - 40, CANVAS_BREEDTE, CANVAS_HOOGTE - GROND_Y + 40);

	// Teken bosjes, generated by genereerBosjes()
	for (var i = 0; i < bosjesData.length; i++) {
		ctx.drawImage(bosjesData[i].image, 
			bosjesData[i].x - cameraX, 
			GROND_Y - bosjesData[i].y - cameraY); 
	}
	// Teken robots
	for (var i = 0; i < robotData.length; i++) {
		tekenGeanimeerdeSprite(robotData[i].x - cameraX, robotData[i].y - cameraY, 
			robotData[i].frameNR, robotSpriteSheet);
	}
	// Teken een geanimeerde ninja sprite
    tekenGeanimeerdeSprite(nanonautX - cameraX, nanonautY - cameraY, 
    	nanonautFrameNr, nannonautSpriteSheet);
}

// SPELER-HANDELINGEN, controls
document.body.onkeydown = function(event) {
	if (event.code === JUMP_CODE) {
		jump = true;
	}
}
document.body.onkeyup = function(event) {
	if (event.code === JUMP_CODE) {
		jump = false;
	}
}
// HOOFD-LUS
function hoofdLus() {
	update();
	draw();
	window.requestAnimationFrame(hoofdLus);
}
// Start Game
function start() {
	window.requestAnimationFrame(hoofdLus);
}
// Eventhandeler start game
elementID("start_btn").addEventListener("click", function(event) {
	event.preventDefault();
	start();
})

// Teken de Nanonaut in viewport, old ninja animation
	// ctx.drawImage(ninja_sprite, nanonautX - cameraX, nanonautY - cameraY);
	// let nanonautSpriteSheetRij = Math.floor(nanonautFrameNr/NANONAUT_NR_FRAMES_PER_RIJ);
	// let nannonautSpriteSheetKolom = nanonautFrameNr % NANONAUT_NR_FRAMES_PER_RIJ;
	// let nannonautSpriteSheetX = nannonautSpriteSheetKolom * NANONAUT_BREEDTE;
	// let nannonautSpriteSheetY = nanonautSpriteSheetRij * NANONAUT_HOOGTE;
	// ctx.drawImage(ninja_sprite, nannonautSpriteSheetX, nannonautSpriteSheetY, 
	// 	NANONAUT_BREEDTE, NANONAUT_HOOGTE, nanonautX - cameraX, nanonautY - cameraY, 
	// 	NANONAUT_BREEDTE, NANONAUT_HOOGTE);

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
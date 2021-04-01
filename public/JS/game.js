// Global variable, CONSTANTEN
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let ninja_sprite = new Image();
	ninja_sprite.src = "Images/nanonauten/nanonaut.png";

let x = 20;
let y = 40;

// Global functions
function elementID(ID) {
	return document.getElementById(ID);
}

// Global settings, INSTELLINGEN
ctx.imageSmoothingEnabled = false;

// HOOFD-LUS

// SPELER-HANDELINGEN

// UPDATEN

//TEKENEN


// Render Game Character
function render_squareMan() {
	ctx.fillStyle = "green";
	ctx.fillRect(10,10, 30, 20);
}
function render_ninja() {
	ctx.drawImage(ninja_sprite, 20, 40, 50, 40);
	// If the image object is created in the function
	// it needs the onload method.
	// ninja_sprite.onload = function() {
	// 	ctx.drawImage(ninja_sprite, 20, 40, 50, 40);
	// }	
}

function ninja_loop() {
	ctx.clearRect(0, 0, 800, 600);

	if (x != 200) {
		ctx.drawImage(ninja_sprite, x, y, 50, 40);
		x++;
		window.requestAnimationFrame(ninja_loop); 
	} else {
		ctx.drawImage(ninja_sprite, x, y, 50, 40);
	}
	
}

// Create game world
function start_screen() {
	window.requestAnimationFrame(ninja_loop);
	canvas.id = "game__canvas";
	render_squareMan();
	render_ninja();
	elementID("game--container").appendChild(canvas);
}


// Start Game
elementID("start_btn").addEventListener("click", function(event) {
	event.preventDefault();
	start_screen();
}) 
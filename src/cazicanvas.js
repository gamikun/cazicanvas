CanvasRenderingContext2D.prototype.circle = function(x, y, radius) {
	this.arc(x, y, radius, 0, Math.PI * 2, 0);
}

CanvasRenderingContext2D.prototype.perfectPolygon = function(
	x, y, radius, sides, rotation
) {
	if (sides < 3) {
		return;
	}

	if (!rotation) {
		rotation = 0;
	}

	var v = Math.PI / sides * 2;
	var vx, vy, d;

	for (var i = 0; i < sides; i++) {
		d = i * v + rotation;
		vx = radius * Math.cos(d) + x;
		vy = radius * Math.sin(d) + y;

		this.lineTo(vx, vy);
	}
}

CanvasRenderingContext2D.prototype.star = function(
	x, y, innerRadius, outerRadius, spikes
) {
	var vectors = spikes * 2;
	var v = Math.PI / vectors * 2;
	var vx, vy, d;
	var alt = false;
	
	var radius;

	for (var i = 0; i < vectors; i++) {
		d = i * v;
		
		radius = alt ? innerRadius : outerRadius;
		vx = radius * Math.cos(d) + x;
		vy = radius * Math.sin(d) + y;

		this.lineTo(vx, vy);

		alt = !alt;
	}
}

CanvasRenderingContext2D.prototype.grid = function(x, y, w, h, cw, ch) {
	for (var xx = x; xx < w; xx += cw) {
		this.moveTo(xx, 0);
		this.lineTo(xx, h);
	}

	for (var yy = y; yy < h; yy += ch) {
		this.moveTo(0, yy);
		this.lineTo(w, yy);
	}
}

CanvasRenderingContext2D.prototype.strokeGrid = function(x, y, w, h, cw, ch) {
	this.beginPath();
	this.grid(x, y, w, h, cw, ch);
	this.stroke();
}

CanvasRenderingContext2D.prototype.zigzagLineTo = function(x, y) {
	
}

CanvasRenderingContext2D.prototype.roundedRect = function(x, y, w, h, r) {
	this.moveTo(x + r, y);
	this.lineTo(x + w - r, y);
	this.arcTo(x + w, y, x + w, y + r, r);
	this.lineTo(x + w, y + x - r);
	this.arcTo(x + w, y + h, x + w - r, y + h, r);
	this.lineTo(x + r, y + h);
	this.arcTo(x, y + h, x, y + h - r, r);
	this.lineTo(x, y + r);
	this.arcTo(x, y, x + r, y, r);
}

CanvasRenderingContext2D.prototype.strokeRoundedRect = function(x, y, w, h, r) {
	this.beginPath();
	this.roundedRect(x, y, w, h, r);
	this.stroke();
}

CanvasRenderingContext2D.prototype.fillRoundedRect = function(x, y, w, h, r) {
	this.beginPath();
	this.roundedRect(x, y, w, h, r);
	this.stroke();
}
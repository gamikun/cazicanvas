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

CanvasRenderingContext2D.prototype.zigzagLineTo = function(x, y) {
	
}
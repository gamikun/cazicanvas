CanvasRenderingContext2D.prototype.circle = function(x, y, radius) {
	this.arc(x, y, radius, 0, Math.PI * 2, 0);
}

CanvasRenderingContext2D.prototype.strokeCircle = function(x, y, radius) {
	this.beginPath();
	this.arc(x, y, radius, 0, Math.PI * 2, 0);
	this.stroke();
}

CanvasRenderingContext2D.prototype.fillCircle = function(x, y, radius) {
	this.beginPath();
	this.arc(x, y, radius, 0, Math.PI * 2, 0);
	this.fill();
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

CanvasRenderingContext2D.prototype.strokeStar = function(
	x, y, innerRadius, outerRadius, spikes
) {
	this.beginPath();
	this.star(x, y, innerRadius, outerRadius, spikes);
	this.closePath();
	this.stroke();
}

CanvasRenderingContext2D.prototype.modelStar = function(
	x, y, innerRadius, outerRadius, spikes
) {
	var self = this;
	var lnw = this.lineWidth;
	var lnd = this.getLineDash();
	var fnt = this.font;
	var txtbl = this.textBaseline;

	this.textBaseline = 'middle';
	this.font = '12px Arial';
	this.setLineDash([5, 3]);
	this.lineWidth = 1;

	this.strokeCircle(x, y, innerRadius);
	this.strokeCircle(x, y, outerRadius);

	// draw points
	var pointIndex = 0;
	var orad = outerRadius + 15;
	var irad = innerRadius + 15;
	var alt = false;
	this.iterateCircumference(x, y, orad, spikes, function(x, y) {
		self.fillText(pointIndex.toString(), x, y);
		pointIndex += 2;
	});
	pointIndex = 0;
	this.iterateCircumference(x, y, outerRadius, spikes, function(x, y) {
		self.strokeCircle(x, y, 5);
		pointIndex += 2;
	});
	pointIndex = 0;
	this.iterateCircumference(x, y, innerRadius, spikes * 2, function(x, y) {
		if (pointIndex % 2 != 0) {
			self.strokeCircle(x, y, 5);
		}
		pointIndex += 1;
	});	
	pointIndex = 0;
	this.iterateCircumference(x, y, irad, spikes * 2, function(x, y) {
		if (pointIndex % 2 != 0) {
			self.fillText(pointIndex.toString(), x, y);
		}
		pointIndex += 1;
	});

	// draw center
	this.fillCircle(x, y, 3);
	//this.fillText('hola', x, y);
	this.font = '10px Arial';
	this.textBaseline = 'top';
	this.fillText("(" + x.toString() + "," + y.toString() + ")", x, y + 5);

	// draw lines
	this.beginPath();
	this.moveTo(x, y);
	this.lineTo(x, y - innerRadius);
	this.stroke();
	
	// reset state
	this.setLineDash(lnd);
	this.textBaseline = txtbl;
	this.lineWidth = lnw;
	this.font = fnt;
}

CanvasRenderingContext2D.prototype.modelCircle = function(x, y, radius) {
	var lnw = this.lineWidth;
	var dsh = this.getLineDash();
	var fnt = this.font;
	var bln = this.textBaseline

	this.lineWidth = 1;
	this.setLineDash([5, 3]);
	this.font = '12px Arial';

	this.beginPath();
	this.moveTo(x, y);
	this.lineTo(x + radius, y);
	this.stroke();

	//this.strokeCircle(x, y, 5);
	this.fillText("r = " + radius.toString(), x + radius / 2, y + 5);
	this.font = '10px Arial';
	this.textBaseline = 'bottom';
	this.fillCircle(x, y, 3);
	this.fillText("(" + x.toString() + "," + y.toString() + ")", x, y - 7);
	
	this.strokeCircle(x, y, radius);

	this.textBaseline = bln;
	this.font = fnt;
	this.lineWidth = lnw;
	this.setLineDash(dsh);
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
	this.lineTo(x + w, y + h - r);
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

CanvasRenderingContext2D.prototype.iterateCircumference = function(
	x, y, radius, segments, fn
) {
	var v = Math.PI / segments * 2;
	var vx, vy, d;

	for (var i = 0; i < segments; i++) {
		d = i * v;
		
		vx = radius * Math.cos(d) + x;
		vy = radius * Math.sin(d) + y;

		fn(vx, vy);
	}
}
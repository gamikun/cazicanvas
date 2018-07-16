/**
 * cazicanvas 1.4.0, 2018/02/08
 *
 * @author Gamaliel Espinoza M. (gamaliel.espinoza@gmail.com)
 *
 */

var CaziCanvas = function(context) {
    this.cx = context;
};

CaziCanvas.prototype.circle = function(x, y, radius) {
    this.arc(x, y, radius, 0, Math.PI * 2, 0);
}

CaziCanvas.prototype.strokeCircle = function(x, y, radius) {
    this.cx.beginPath();
    this.cx.arc(x, y, radius, 0, Math.PI * 2, 0);
    this.cx.stroke();
}

CaziCanvas.prototype.fillCircle = function(x, y, radius) {
    this.cx.beginPath();
    this.cx.arc(x, y, radius, 0, Math.PI * 2, 0);
    this.cx.fill();
}

CaziCanvas.prototype.perfectPolygon = function(
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

        this.cx.lineTo(vx, vy);
    }
}

CaziCanvas.prototype.star = function(
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

        this.cx.lineTo(vx, vy);

        alt = !alt;
    }
}

CaziCanvas.prototype.strokeStar = function(
    x, y, innerRadius, outerRadius, spikes
) {
    this.cx.beginPath();
    this.star(x, y, innerRadius, outerRadius, spikes);
    this.cx.closePath();
    this.cx.stroke();
}

CaziCanvas.prototype.modelStar = function(
    x, y, innerRadius, outerRadius, spikes
) {
    var self = this;
    var lnw = this.lineWidth;
    var lnd = this.cx.getLineDash();
    var fnt = this.font;
    var txtbl = this.textBaseline;

    this.cx.textBaseline = 'middle';
    this.cx.font = '12px Arial';
    this.cx.setLineDash([5, 3]);
    this.cx.lineWidth = 1;

    this.strokeCircle(x, y, innerRadius);
    this.strokeCircle(x, y, outerRadius);

    // draw points
    var pointIndex = 0;
    var orad = outerRadius + 15;
    var irad = innerRadius + 15;
    var alt = false;
    this.iterateCircumference(x, y, orad, spikes, function(x, y) {
        self.cx.fillText(pointIndex.toString(), x, y);
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
            self.cx.fillText(pointIndex.toString(), x, y);
        }
        pointIndex += 1;
    });

    // draw center
    this.fillCircle(x, y, 3);
    this.cx.font = '10px Arial';
    this.cx.textBaseline = 'top';
    this.cx.fillText("(" + x.toString() + "," + y.toString() + ")", x, y + 5);

    // draw lines
    this.cx.beginPath();
    this.cx.moveTo(x, y);
    this.cx.lineTo(x, y - innerRadius);
    this.cx.stroke();
    
    // reset state
    this.cx.setLineDash(lnd);
    this.cx.textBaseline = txtbl;
    this.cx.lineWidth = lnw;
    this.cx.font = fnt;
}

CaziCanvas.prototype.modelCircle = function(x, y, radius) {
    var lnw = this.cx.lineWidth;
    var dsh = this.cx.getLineDash();
    var fnt = this.cx.font;
    var bln = this.cx.textBaseline;

    this.cx.lineWidth = 1;
    this.cx.setLineDash([5, 3]);
    this.cx.font = '12px Arial';

    this.cx.beginPath();
    this.cx.moveTo(x, y);
    this.cx.lineTo(x + radius, y);
    this.cx.stroke();

    //this.strokeCircle(x, y, 5);
    this.cx.fillText("r = " + radius.toString(), x + radius / 2, y + 5);
    this.cx.font = '10px Arial';
    this.cx.textBaseline = 'bottom';
    this.fillCircle(x, y, 3);
    this.cx.fillText("(" + x.toString() + "," + y.toString() + ")", x, y - 7);
    
    this.strokeCircle(x, y, radius);

    this.cx.textBaseline = bln;
    this.cx.font = fnt;
    this.cx.lineWidth = lnw;
    this.cx.setLineDash(dsh);
}

CaziCanvas.prototype.grid = function(x, y, w, h, cw, ch) {
    for (var xx = x; xx < w; xx += cw) {
        this.cx.moveTo(xx, 0);
        this.cx.lineTo(xx, h);
    }

    for (var yy = y; yy < h; yy += ch) {
        this.cx.moveTo(0, yy);
        this.cx.lineTo(w, yy);
    }
}

CaziCanvas.prototype.strokeGrid = function(x, y, w, h, cw, ch) {
    this.cx.beginPath();
    this.grid(x, y, w, h, cw, ch);
    this.cx.stroke();
}

CaziCanvas.prototype.chess = function(x, y, w, h, cw, ch, c1, c2) {
    var alt = false;
    var sw = w / cw;
    var sh = h / ch;

    for (var yy = 0; yy < h; yy += cw) {
        alt = !alt;
        for (var xx = 0; xx < w; xx += ch) {
            var index = xx * yy;

            if (alt) {
                this.cx.fillStyle = c2;    
            } else {
                this.cx.fillStyle = c1;
            }

            alt = !alt;

            this.cx.fillRect(xx, yy, cw, ch);
        }
    }
}

CaziCanvas.prototype.zigzagLineTo = function(x, y) {
    
}

CaziCanvas.prototype.roundedRect = function(x, y, w, h, r) {
    this.cx.moveTo(x + r, y);
    this.cx.lineTo(x + w - r, y);
    this.cx.arcTo(x + w, y, x + w, y + r, r);
    this.cx.lineTo(x + w, y + h - r);
    this.cx.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.cx.lineTo(x + r, y + h);
    this.cx.arcTo(x, y + h, x, y + h - r, r);
    this.cx.lineTo(x, y + r);
    this.cx.arcTo(x, y, x + r, y, r);
}

CaziCanvas.prototype.strokeRoundedRect = function(x, y, w, h, r) {
    this.cx.beginPath();
    this.roundedRect(x, y, w, h, r);
    this.cx.stroke();
}

CaziCanvas.prototype.fillRoundedRect = function(x, y, w, h, r) {
    this.cx.beginPath();
    this.roundedRect(x, y, w, h, r);
    this.cx.stroke();
}

CaziCanvas.prototype.iterateCircumference = function(
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

CaziCanvas.prototype.iterateLine = function(
    x1, y1, x2, y2, fn
) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    var xaxis = (x2 - x1) < 0 ? -1 : 1;
    var yaxis = (y2 - y1) < 0 ? -1 : 1;
    var ratio, ix, iy;

    if (dx === 0 && dy === 0) {
        fn(x1, y1);
    }

    else if (dx > dy) {
        ratio = dy / dx;
        ix = 1 * xaxis;
        iy = ratio * yaxis;
        for (var i = 0; i <= dx; i++) {
            var x = x1 + i * xaxis;
            var y = Math.round(y1 + i * yaxis * ratio);
            fn(x, y);
        }
    }

    else if (dy > dx) {
        ratio = dx / dy;
        iy = 1 * yaxis;
        ix = ratio * xaxis;
        for (var i = 0; i <= dy; i++) {
            var y = y1 + i * yaxis;
            var x = Math.round(x1 + i * xaxis * ratio);
            fn(x, y);
        }
    }

    else {
        for (var i = 0; i < dx; i++) {
            var x = x1 + i * xaxis;
            var y = y1 + i * yaxis;
            fn(x, y);
        }
    }
}

CaziCanvas.prototype.polygon = function(points) {
    var x, y;
    this.cx.moveTo(points[0][0], points[0][1]);
    for (var index = 1; index < points.length; index++) {
        x = points[index][0];
        y = points[index][1];
        cx.lineTo(x, y);
    }
};

CaziCanvas.prototype.fillPolygon = function(points) {
    this.cx.beginPath();
    this.polygon(points);
    this.cx.closePath();
    this.cx.fill();
}

CaziCanvas.prototype.strokePolygon = function(points) {
    this.cx.beginPath();
    this.polygon(points);
    this.cx.closePath();
    this.cx.stroke();
}

CaziCanvas.prototype.modelPolygon = function(points) {
    var top    = 0xFFFF;
    var bottom = 0x0000;
    var left   = 0xFFFF;
    var right  = 0x0000;
    var lnd = this.cx.getLineDash();
    var lw = this.cx.lineWidth;
    var p, cx, cy;

    for (var index = 0; index < points.length; index++) {
        p = points[index];
        if (p[1] < top)
            top = p[1];
        if (p[1] > bottom)
            bottom = p[1];
        if (p[0] < left)
            left = p[0];
        if (p[0] > right)
            right = p[0];
    }

    cx = ((right -   left) / 2) + left;
    cy = ((top   - bottom) / 2) +  top;

    this.cx.setLineDash([5, 3]);
    this.cx.lineWidth = 1;
    this.cx.moveTo(left, top);
    this.cx.lineTo(right, top);
    this.cx.lineTo(right, bottom);
    this.cx.lineTo(left, bottom);
    this.cx.closePath();
    this.cx.stroke();

    // draw points
    this.fillCircle(left, top, 5);
    this.fillCircle(right, top, 5);
    this.fillCircle(right, bottom, 5);
    this.fillCircle(left, bottom, 5);

    // center
    this.cx.fillStyle = '#ffffff';
    this.cx.lineWidth = 2;
    this.cx.beginPath();
    this.cx.moveTo(cx - 5, cy    );
    this.cx.lineTo(cx + 5, cy    );
    this.cx.moveTo(cx,     cy - 5);
    this.cx.lineTo(cx,     cy + 5);
    this.cx.stroke();

    this.cx.lineWidth = lw;
    this.cx.setLineDash(lnd);
}
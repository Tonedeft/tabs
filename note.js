class Note {
	constructor(cursor, value) {
		// TODO: staffIndex should be computed based on which measure we are on
		this.staffIndex = cursor.staffIndex;
		this.x = cursor.x;
		this.y = cursor.y;
		this.value = value;
	}

	draw(ctx, options) {
		options = options || {};
		ctx.save();
		// Draw 6 lines across the page

		// Line spacing 
		lineSpacing = options.lineSpacing || 20;
		// Staff spacing
		staffSpacing = options.staffSpacing || 40;
		// Lines per staff
		linesPerStaff = options.linesPerStaff || 6;

		// Default variables that are not provided
		stroke = options.stroke || 'rgba(0,0,0,1)';
		fill = options.fill || 'rgba(0,0,0,1)';

		textSize = options.textSize || 15;
		textAlign = options.align || 'center';

		// Set context values
		ctx.strokeStyle = stroke;
		ctx.fillStyle = fill;
		let width = ctx.canvas.width, height = ctx.canvas.height;

		// Get the staff details
		var staffTop = staffSpacing + this.staffIndex * ((linesPerStaff) * lineSpacing + staffSpacing) - .5 * lineSpacing;

		// Get location of cursor
		var textX = cursorWidth*this.x+(textSize+lineSpacing)/4;
		var textY = staffTop+this.y*lineSpacing + (textSize+lineSpacing)/2;


		ctx.fillStyle = fill;
		ctx.textAlign = textAlign;
		ctx.font = textSize + "pt Arial";
		ctx.fillText(this.value, textX, textY);


		ctx.restore();
	}
}

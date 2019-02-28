// TODO: Get rid of "drawing.js" entirely

function draw_grid(ctx, minor, major, stroke, fill) {
	// Default variables that are not provided
	minor = minor || 10;
	major = major || minor * 5;
	stroke = stroke || "#00FF00";
	fill = fill || "#00FF00";

	// Set context values
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	let width = ctx.canvas.width, height = ctx.canvas.height;

	// Draw the horizontal gridlines
	for (var i = 0; i < width; i += minor)
	{
		ctx.beginPath();
		ctx.moveTo(i,0);
		ctx.lineTo(i,height);
		ctx.lineWidth = (i % major == 0) ? 0.5 : 0.25;
		ctx.stroke();
		if (i % major == 0) 
		{
			ctx.fillText(i, i, minor);
		}
	}

	// Draw the vertical gridlines
	for (var i = 0; i < height; i += minor)
	{
		ctx.beginPath();
		ctx.moveTo(0,i);
		ctx.lineTo(width,i);
		ctx.lineWidth = (i % major == 0) ? 0.5 : 0.25;
		ctx.stroke();
		if (i % major == 0) 
		{
			ctx.fillText(i, 0, i + minor);
		}
	}
}

function draw_tab(ctx, options) {
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

	textSize = options.textSize || 25;
	textAlign = options.align || 'center';

	// Set context values
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	let width = ctx.canvas.width, height = ctx.canvas.height;


	// Fill with as many staves as we can to fill the page
	for (var staffTop = staffSpacing; 
		staffTop < height; 
		staffTop += staffSpacing + linesPerStaff * lineSpacing)
	{
		// Draw the horizontal lines
		for (var i = 0; i < linesPerStaff; i += 1)
		{
			ctx.beginPath();
			ctx.moveTo(0,i*lineSpacing+staffTop);
			ctx.lineTo(width,i*lineSpacing+staffTop);
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		// Draw the edges of the staff
		ctx.beginPath();
		ctx.moveTo(0,staffTop);
		ctx.lineTo(0,staffTop+lineSpacing*(linesPerStaff-1));
		ctx.lineWidth = 5;
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(width,staffTop);
		ctx.lineTo(width,staffTop+lineSpacing*(linesPerStaff-1));
		ctx.lineWidth = 5;
		ctx.stroke();

		// Write "TAB" down the left side
		ctx.fillStyle = fill;
		ctx.textAlign = textAlign;
		ctx.font = textSize + "pt Arial";
		ctx.fillText("T", 0+textSize/2, staffTop + textSize);
		ctx.fillText("A", 0+textSize/2, staffTop + textSize * 2.5);
		ctx.fillText("B", 0+textSize/2, staffTop + textSize * 4);

		if (options.guide) {
			//ctx.strokeStyle = "red"0
			//ctx.fillStyle = "rgba(255,0,0,0.25)";
			//ctx.lineWidth = .5;
			//ctx.beginPath();
			//ctx.rect(20, 10, 150, 100);
			//ctx.stroke();
			//ctx.fill();
		}
	}
	ctx.restore();
}


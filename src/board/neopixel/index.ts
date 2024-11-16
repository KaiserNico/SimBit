import svgTextbb from "../../microbit-breadboard.svg";
import svgTextimg from "../../microbit-neopixel-strip.svg";
export class Neopixel {
	constructor(private board: SVGElement[]) {
		this.board = board;
		this.strip_array = [];
		this.used_pin_array = [];
	}
    
	NeoPixel(id:number, pin:number, len:number, bytes_per_pixel:number, buffer: number) {
		const neopixel_strip = new Strip(id,pin,len,bytes_per_pixel,buffer);
		this.strip_array.push(neopixel_strip);
		if(!this.used_pin_array.includes(pin)) {
			this.used_pin_array.push(pin)
		}
		generate_wires(pin,this.used_pin_array,this.board)
	}
	
	write(id:number,buffer: number) {
		var shown_pin_array;
		if (this.used_pin_array.length > 5) {
			shown_pin_array = this.used_pin_array.slice(0,5);
		}
		else {
			shown_pin_array = this.used_pin_array;
		}
		for (let strip of this.strip_array) {
		    if (id == strip.id) {
		        let pin_index = shown_pin_array.indexOf(strip.pin);
		        if (pin_index !== -1) {
		        	strip.buf = buffer;
		            createLedCanvas(strip, pin_index, shown_pin_array);
		        } 
		    }
    	}
	}
	
	boardStopped() {
		this.strip_array = [];
		this.used_pin_array = [];
		var svg_wrapper = document.querySelector(".sim-neopixel");
		if (svg_wrapper) {
			svg_wrapper.remove()
			document.body.prepend(this.board);
		}
	}	
};

export function generate_wires(pin:number, used_pin_array: number, board: SVGElement) {
	var svg_neopixel = document.querySelector(".sim-neopixel");
  	if (!svg_neopixel){
    	svg_wrapper(board);
    	create_breadboard();
    	var visability_bb= document.querySelector(".sim-bb")
    	visability_bb.style.display = "none"
    	generate_SVG_group();
  	}
  	if (used_pin_array.length > 1) {
      	var visability_bb = document.querySelector(".sim-bb")
      	if (visability_bb.style.display) {
          	visability_bb.removeAttribute("style");
      	}
  	}
  	if (used_pin_array.length < 6) {
      	create_wire(used_pin_array.length);
      	draw_wires(used_pin_array);
      	create_led_SVG(used_pin_array.length, used_pin_array);
  	}      
}

export function svg_wrapper(board: SVGElement) {
	var svg_board = board;
  	var svg_wrapper = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  	svg_wrapper.setAttribute("version", "1.0");
  	svg_wrapper.setAttribute("class", "sim-neopixel");
  	svg_wrapper.setAttribute("width", "100%");
  	svg_wrapper.setAttribute("height","100%");

	svg_wrapper.appendChild(svg_board);
  	document.body.appendChild(svg_wrapper);
}

export function create_breadboard() {
	/*breadboard image was copied, inspired and modified  from https://makecode.microbit.org/ and https://github.com/microsoft/pxt/blob/7ff18bab6877da1dd282f3856ce28c5f1a573dc1/pxtsim/visuals/breadboard.ts*/
  	var breadboard_drawing_default = svgTextbb ;
  	var svg_wrapper = document.querySelector(".sim-neopixel");
  	var breadboard = new DOMParser().parseFromString(breadboard_drawing_default, "image/svg+xml").documentElement;
  	svg_wrapper.appendChild(breadboard);
}

export function generate_SVG_group() {
  	let svg_group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  	svg_group.setAttribute("class", "svg-group");
  	let svg_wrapper = document.querySelector(".sim-neopixel");
  	svg_wrapper.appendChild(svg_group);
}

export function create_wire(array_length:number) {
  	let svg = document.querySelector(".svg-group");
  	if (svg) {
    	svg.innerHTML = "";
  	}
  	let red_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
  	let blue_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
  	let purple_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  	red_wire.setAttribute("class", "red_wire");
  	blue_wire.setAttribute("class", "blue_wire");
  	purple_wire.setAttribute("class", "purple_wire");
  	svg.appendChild(red_wire);
  	svg.appendChild(blue_wire);
  	svg.appendChild(purple_wire);
  	if (array_length > 1){
    	let green_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
    	let red_wire_bb = document.createElementNS("http://www.w3.org/2000/svg", "g");
    	let blue_wire_bb = document.createElementNS("http://www.w3.org/2000/svg", "g");
    	green_wire.setAttribute("class", "green_wire");
	    red_wire_bb.setAttribute("class", "red_wire_bb");
	    blue_wire_bb.setAttribute("class", "blue_wire_bb");
	    svg.appendChild(green_wire);
	    svg.appendChild(red_wire_bb);
	    svg.appendChild(blue_wire_bb);
	    if (array_length > 2) {
			let yellow_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
			yellow_wire.setAttribute("class", "yellow_wire");
			svg.appendChild(yellow_wire);
			if (array_length > 3) {
				let orange_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
				orange_wire.setAttribute("class", "orange_wire");
				svg.appendChild(orange_wire);
				if (array_length > 4) {
					let pink_wire = document.createElementNS("http://www.w3.org/2000/svg", "g");
					pink_wire.setAttribute("class", "pink_wire");
					svg.appendChild(pink_wire);
				}
			}
		}
  	}
}

export function draw_wires(pin_array: number) {
	var startpoint_array = [];
    var start_0 = 89.5 // x pos of pin0
    var start_3V = start_0+246;
    var start_GND = start_0 + 321;
    var start_low = 398; // y pos of upper end of lower part
    var end_low =475;  // y pos of lower end of lower wire part
    var end_3V = end_low;
    var end_GND = end_low;
    var mid_mid = 358 // y pos of end of mid wire part
    var start_top = 301; // y pos of wire start 
    var end_top = 320;
    var purple_wire = document.querySelector('.purple_wire');
    var green_wire = document.querySelector('.green_wire');
    var yellow_wire = document.querySelector('.yellow_wire');
    var orange_wire = document.querySelector('.orange_wire');
    var pink_wire = document.querySelector('.pink_wire');
    var red_wire = document.querySelector('.red_wire');
    var red_wire_bb = document.querySelector('.red_wire_bb');
    var blue_wire = document.querySelector('.blue_wire');
    var blue_wire_bb = document.querySelector('.blue_wire_bb');
    
    const start_offsets = [
		{ min: 0, max: 0, offset: start_0, step: 0 },
		{ min: 1, max: 2, offset: start_0 + 77, step: 84 },
		{ min: 3, max: 3, offset: start_0 - 25, step: 0 },
		{ min: 4, max: 7, offset: start_0 + 23.5, step: 9.5 },
		{ min: 8, max: 12, offset: start_0 + 99, step: 9.5 },
		{ min: 13, max: 16, offset: start_0 + 184, step: 9.5 },
		{ min: 17, max: 18, offset: start_0 + 278.5, step: 9.5 },
	];

	pin_array.forEach(element => {
		const pin = start_offsets.find(pin => element >= pin.min && element <= pin.max);

		if (pin) {
			const start_X = pin.offset + pin.step * (element - pin.min);
			startpoint_array.push(start_X);
		}
	});
	
	var xPos_purple_lower_end
	var xPos_red_lower_end
	var xPos_blue_lower_end;
	var xPos_green_lower_end
	var xPos_yellow_lower_end
	var xPos_orange_lower_end
	var xPos_pink_lower_end;
	var bb_end_array = [];
	var interval;

	if (pin_array.length == 1) {
	    xPos_purple_lower_end = start_0 + 145;
	    xPos_red_lower_end = xPos_purple_lower_end + 15;
	    xPos_blue_lower_end = xPos_red_lower_end + 15;
	} else if (pin_array.length > 1) {
		var xPos_red_lower_end = start_0+354.5; // x pos of lower end of red wire
	    var xPos_blue_lower_end = xPos_red_lower_end+15; // x pos of lower end of blue wire
	    var end_3V = 417;
	    var end_GND = 402;
	    if (pin_array.length == 2) {
	        interval = 180;
	        xPos_purple_lower_end = 145.33;
	        xPos_green_lower_end = xPos_purple_lower_end + interval;
	    } else if (pin_array.length == 3) {
	        interval = 135;
	        xPos_purple_lower_end = 101.33;
	        xPos_green_lower_end = xPos_purple_lower_end + interval;
	        xPos_yellow_lower_end = xPos_green_lower_end + interval;
	    } else if (pin_array.length == 4) {
	        interval = 105;
	        xPos_purple_lower_end = 86.33;
	        xPos_green_lower_end = xPos_purple_lower_end + interval;
	        xPos_yellow_lower_end = xPos_green_lower_end + interval;
	        xPos_orange_lower_end = xPos_yellow_lower_end + interval;
	    } else if (pin_array.length == 5) {
	        interval = 90;
	        xPos_purple_lower_end = 56.33;
	        xPos_green_lower_end = xPos_purple_lower_end + interval;
	        xPos_yellow_lower_end = xPos_green_lower_end + interval;
	        xPos_orange_lower_end = xPos_yellow_lower_end + interval;
	        xPos_pink_lower_end = xPos_orange_lower_end + interval;
	    }

	    for (var i = 0; i < pin_array.length; i++) {
	        var xPos_red_bb_lower_end = xPos_purple_lower_end + interval * i + 15;
	        var xPos_blue_bb_lower_end = xPos_red_bb_lower_end + 15;
	        bb_end_array.push(xPos_red_bb_lower_end);
	        bb_end_array.push(xPos_blue_bb_lower_end);
	    }
	}
	
	var color;
	
	if (purple_wire) {
	    color = "#a772a1";
	    create_single_wire(purple_wire, color, xPos_purple_lower_end, start_low, end_low, startpoint_array[0], end_top, mid_mid, start_top);
	}
	
	if (green_wire) {
	    color = "#3cce73";
	    create_single_wire(green_wire, color, xPos_green_lower_end, start_low, end_low, startpoint_array[1], end_top, mid_mid, start_top);
	}
	
	if (yellow_wire) {
	    color = "#ece600";
	    create_single_wire(yellow_wire, color, xPos_yellow_lower_end, start_low, end_low, startpoint_array[2], end_top, mid_mid, start_top);
	}
	
	if (orange_wire) {
	    color = "#fdb262";
	    create_single_wire(orange_wire, color, xPos_orange_lower_end, start_low, end_low, startpoint_array[3], end_top, mid_mid, start_top);
	}
	
	if (pink_wire) {
	    color = "#ff80fa";
	    create_single_wire(pink_wire, color, xPos_pink_lower_end, start_low, end_low, startpoint_array[4], end_top, mid_mid, start_top);
	}
	
	if (red_wire) {
	    color = "red";
	    create_single_wire(red_wire, color, xPos_red_lower_end, start_low, end_3V, start_3V, end_top, mid_mid, start_top);
	    
	    if (pin_array.length > 1) {
		var lower_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		lower_circle.setAttribute("cx", xPos_red_lower_end);
		lower_circle.setAttribute("cy", end_3V - 3);
		lower_circle.setAttribute("r", "4.875");
		lower_circle.setAttribute("fill", "#333333");
		red_wire.appendChild(lower_circle);
		}
	}
	
	if (blue_wire) {
	    color = "#01a6e8";
	    create_single_wire(blue_wire, color, xPos_blue_lower_end, start_low, end_GND, start_GND, end_top, mid_mid, start_top);
	    
	    if (pin_array.length > 1) {
	    var lower_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	    lower_circle.setAttribute("cx", xPos_blue_lower_end);
	    lower_circle.setAttribute("cy", end_GND - 3);
	    lower_circle.setAttribute("r", "4.875");
	    lower_circle.setAttribute("fill", "#333333");
	    blue_wire.appendChild(lower_circle);
		}
	}

	if (pin_array.length > 1) {
		if (blue_wire_bb) {
			blue_wire_bb.innerHTML = '';
		}
		if (red_wire_bb) {
			red_wire_bb.innerHTML = '';
		}
		for (var i = 0; i < bb_end_array.length - 1; i = i + 2) {
			var _red_wire_bb = document.createElementNS("http://www.w3.org/2000/svg", "path");
			var _blue_wire_bb = document.createElementNS("http://www.w3.org/2000/svg", "path");
			var circle_red = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			var circle_blue = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			var offset_red;
			var offset_blue;
			if (pin_array.length == 2) {
			    offset_red = 0;
			    offset_blue = 0;
			} else if (pin_array.length == 3) {
				offset_red = (i % 4 == 0) ? 14 : 0;
			    offset_blue = (i % 4 == 0) ? 14 : 0;
			} else if (pin_array.length == 4) {
				offset_red = (i % 8 == 2) ? 14 : 0;
			    offset_blue = (i % 8 == 0 || i % 8 == 2) ? 14 : 0;
			} else if (pin_array.length == 5) {
				offset_red = 0;
			   	offset_blue = (i % 10 == 8) ? -32 : 0;
			}

			_red_wire_bb.setAttribute("d", "M" + bb_end_array[i] + "," + end_low + "L" + (bb_end_array[i] + offset_red) + "," + (end_3V - 2.5));
			_blue_wire_bb.setAttribute("d", "M" + bb_end_array[i + 1] + "," + end_low + "L" + (bb_end_array[i + 1] + offset_blue) + "," + (end_GND - 2.5));

			circle_red.setAttribute("cx", (bb_end_array[i] + offset_red));
			circle_red.setAttribute("cy", (end_3V - 1));
			circle_blue.setAttribute("cx", (bb_end_array[i + 1] + offset_blue));
			circle_blue.setAttribute("cy", (end_GND - 1));

			_red_wire_bb.setAttribute("stroke", "red");
			_red_wire_bb.setAttribute("stroke-width", "5");

			_blue_wire_bb.setAttribute("stroke", "#01a6e8");
			_blue_wire_bb.setAttribute("stroke-width", "5");

			// Attribute für die roten und blauen Kreise setzen
			circle_red.setAttribute("r", "4.875");
			circle_red.setAttribute("fill", "#333333");

			circle_blue.setAttribute("r", "4.875");
			circle_blue.setAttribute("fill", "#333333");

			// Hinzufügen der roten Elemente zu red_wire_bb und blaue Elemente zu blue_wire_bb
			red_wire_bb.appendChild(_red_wire_bb);
			red_wire_bb.appendChild(circle_red);

			blue_wire_bb.appendChild(_blue_wire_bb);
			blue_wire_bb.appendChild(circle_blue);
		}
	}
}
	
export function create_single_wire(wire_element, color, xPos_lower_end, start_low, end_low, startpoint, end_top, mid_mid, start_top) {
	wire_element.innerHTML = '';
	
    var wire_low = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var wire_mid = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var wire_top = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // lower part of wire
    wire_low.setAttribute("d", `M${xPos_lower_end},${start_low}L${xPos_lower_end},${end_low}`);
    wire_low.setAttribute("stroke", color);
    wire_low.setAttribute("stroke-width", "5");

    // middle part of wire
    wire_mid.setAttribute("d", `M${xPos_lower_end},${start_low}C${xPos_lower_end},${end_top} ${startpoint},${mid_mid} ${startpoint},${end_top}`);
    wire_mid.setAttribute("fill", "none");
    wire_mid.setAttribute("stroke", color);
    wire_mid.setAttribute("stroke-width", "5");

    // top part of wire
    wire_top.setAttribute("d", `M${startpoint},${start_top}L${startpoint},${end_top}`);
    wire_top.setAttribute("stroke", color);
    wire_top.setAttribute("stroke-width", "5");

    // circle
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", startpoint);
    circle.setAttribute("cy", start_top + 4);
    circle.setAttribute("r", "4.875");
    circle.setAttribute("fill", "#333333");

    wire_element.appendChild(wire_low);
    wire_element.appendChild(wire_mid);
    wire_element.appendChild(wire_top);
    wire_element.appendChild(circle);
}

export function create_led_SVG(strip_array_length:number, used_pin_array: number){
	var svg_container = document.querySelector(".svg-group");

	for (var i = 0; i < strip_array_length; i++) {
		var img_string = svgTextimg;
		var img_svg = new DOMParser().parseFromString(img_string, "image/svg+xml").documentElement;
		var ycoord = 465;
		var xcoord;
		if (strip_array_length == 1) {
			xcoord = 205.5;
		} else if (strip_array_length == 2) {
			xcoord = 116.83 + i * 180;
		} else if (strip_array_length == 3) {
			xcoord = 72.83 + i * 135;
		} else if (strip_array_length == 4) {
			xcoord = 57.83 + i * 105;
		} else if (strip_array_length == 5) {
			xcoord = 27.83 +i * 90;
		}
		img_svg.setAttribute("x",xcoord);
		img_svg.setAttribute("y",ycoord);
		svg_container.appendChild(img_svg);
	   
		var id_name = "sim-neopixel-canvas-index=" + i;
		var canvas = document.getElementById(id_name);
		if (canvas) {
			var shown_pin_array;
			if (used_pin_array.length > 5) {
				shown_pin_array = used_pin_array.slice(0,5);
			}
			else {
				shown_pin_array = used_pin_array;
			}
			move_led_canvas(canvas,i,shown_pin_array)
		}
	}
}

export function move_led_canvas(canvas: SVGElement, pos: number, pin_array: number) {
	var xcoord = calculate_x_coord(pin_array.length, pos);
	canvas.setAttribute("x", xcoord);
}
export function createLedCanvas(strip: Strip, pos: number, pin_array: number){
      var xcoord = calculate_x_coord(pin_array.length, pos);
      var ycoord = 490;
      var height = 180;
      var width = 18;
      var id_name = "sim-neopixel-canvas-index=" + pos;
      var existing_id = document.getElementById(id_name);
      if (existing_id) {
          existing_id.remove()
      }
      var svg = document.querySelector(".sim-neopixel");
      var parent_group = document.getElementById("canvas_parent_group")

      if (!parent_group) {
          var parent_group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          parent_group.setAttribute("id", "canvas_parent_group");
          svg.appendChild(parent_group);
      }

      var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.setAttribute("id", id_name);
      svgElement.setAttribute("width", width);
      svgElement.setAttribute("height", height);
      svgElement.setAttribute("x", xcoord);
      svgElement.setAttribute("y", ycoord);

      var background_rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      background_rect.setAttribute("width", width);
      background_rect.setAttribute("height", height);
      background_rect.setAttribute("fill", "rgba(255, 255, 255, 0.9)");

      svgElement.appendChild(background_rect);

      var length = strip.n;
      var bytes_per_pixel = strip.bpp
      var total_bytes = length * bytes_per_pixel;
      var rect_height = height / (length + 3);
      var i = 0;
      var j = 0;
      while (i < total_bytes && j < length){
          var space = rect_height / (length+3); //1 rect divided num of rect as space between rect
          var rect_width = "100%";
          var rect_pos_y = rect_height+2*space + j * (rect_height+space);
          var color_rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          color_rect.setAttribute("width", rect_width);
          color_rect.setAttribute("height", rect_height);
          color_rect.setAttribute("y", rect_pos_y);
          if (bytes_per_pixel == 3) {
              color_rect.setAttribute("fill", "rgb(" + strip.buf[i+1] + "," + strip.buf[i] + "," + strip.buf[i+2] + ")")
               i += 3; // Increment i by 3 for bytes_per_pixel == 3
               j++
          }
          else if (bytes_per_pixel == 4) {
              color_rect.setAttribute("fill", "rgba(" + strip.buf[i+1] + "," + strip.buf[i] + "," + strip.buf[i+2] + "," + (strip.buf[i+3])/255 + ")")
               i += 4; // Increment i by 3 for bytes_per_pixel == 4
               j++
          }
          svgElement.appendChild(color_rect);
      }
      parent_group.appendChild(svgElement);

}

export function calculate_x_coord(pin_array_length: number, pos: number) {
    var xcoord;
    switch (pin_array_length) {
        case 1:
            xcoord = 240.5;
            break;
        case 2:
            xcoord = 151.5 + pos * 180;
            break;
        case 3:
            xcoord = 107.5 + pos * 135;
            break;
        case 4:
            xcoord = 92.5 + pos * 105;
            break;
        default:
            if (pin_array_length >= 5) {
                xcoord = 62.5 + pos * 90;
            }
    }
    return xcoord;
};

export class Strip {
    constructor(id:number, pin:number, length:number, bpp:number, buffer: number) {
    this.id = id;
    this.pin = pin;
    this.n = length;
    this.bpp = bpp;
    this.buf = buffer;
    }
}

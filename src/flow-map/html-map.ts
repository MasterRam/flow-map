

const $: any = window['$'];
export class FlowHTMLMap {
  constructor(private id: string) {}
  element: HTMLElement;
  top: number = 0;
  left: number = 0;
  objectInterval: number = 5;
  private _createBase(): boolean {
    this.element = document.getElementById(this.id) as HTMLElement;

    this.element.style.height =
      (this.element.clientHeight > 700 ? this.element.clientHeight - 5 : 700) +
      "px";
    this.element.style.width =
      (this.element.clientWidth > 700 ? this.element.clientWidth - 5 : 700) +
      "px";
    // element.appendChild(this.canvas);

    return true;
  }

  draw(data): void {
    if (!this._createBase()) return;

    this.drawObject("circle", { name:"start",width: 30, height: 30 });
    this.drawObject("rectangle", { name:"process1",width: 150, height: 100 });
    this.drawObject("rectangle", { name:"process2",width: 150, height: 100 });
    this.drawObject("rounded", { name:"process3",width: 150, height: 100 });
    // this.drawObject("multi", { width: 50, height: 50 });
    // this.drawObject("multi", { width: 50, height: 50 });
    // this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("circle", { name:"end",width: 30, height: 30 });
    
    $(document).ready(function() {
      // reset svg each time
      $("#svg1").attr("height", "0");
      $("#svg1").attr("width", "0");
      connectAll();
    });

    $(window).resize(function() {
      // reset svg each time
      $("#svg1").attr("height", "0");
      $("#svg1").attr("width", "0");
      connectAll();
    });
    
  }

  getPoints(forType: string, options: any): any {
    let center = this.element.clientWidth / 2;
    let x = 0;
    switch (forType) {
      case "rectangle":
        x = center - options.width / 2;
        return { x:  this.left + this.objectInterval, y: this.top + this.objectInterval/2 };
      case "rounded":
        x = center - options.width / 2;
        return { x: this.left + this.objectInterval, y: this.top + this.objectInterval/2 };
      case "circle":
        x = center - options.width / 2;
        return { x: this.left + this.objectInterval, y: this.top + this.objectInterval/2 };
      case "multi":
        return {
          x: center,
          y: this.top + options.height + this.objectInterval/2
        };
      default:
        return { x: 0, y: 0 };
    }
  }

  drawObject(forType: string, options: any) {
    let origin = this.getPoints(forType, options);

    let top = this.top;
    let bottom = top + this.objectInterval;
    switch (forType) {
      case "rectangle":
        {
          this.element.drawRectangle(
            this.element,options.name,
            origin.x,
            origin.y,
            options.height,
            options.width
          );
        }
        this.top = this.top + options.height + this.objectInterval;
        this.left = this.left + options.width + this.objectInterval;
        break;
      case "circle":
        {
          this.element.drawCircle(
            this.element,options.name,
            origin.x,
            origin.y,
            options.height,
            options.width
          )
        }
        this.top = this.top + options.height  + this.objectInterval;
        this.left = this.left + options.width  + this.objectInterval;
        break;
      case "multi":
        // {
        //   this.context.moveTo(origin.x + options.width, origin.y);
        //   this.regularpolygon(origin.x, origin.y, options.width, 4);
        // }
        this.top = this.top + options.height  + this.objectInterval;
        this.left = this.left + options.width  + this.objectInterval;
        break;
      case "rounded":
        {
          this.element.drawRoundedRectangle(
            this.element,options.name,
            origin.x,
            origin.y,
            options.height,
            options.width
          );
        }
        this.top = this.top + options.height + this.objectInterval;
        this.left = this.left + options.width + this.objectInterval;
        break;
      default:
        break;
    }
    // if (top != 0)
    //   this.drawArrow(this.canvas.width / 2, top, this.canvas.width / 2, bottom);
    // this.context.strokeStyle = "#cc0000";
    // this.context.fillStyle = "#cc0000";
    //this.context.fill();
    return { x: 0, y: 0 };
  }
}
declare global {
  interface HTMLElement {
    drawRectangle(
      s: HTMLElement,name:string,
      x: number,
      y: number,
      height: number,
      width: number
    ): HTMLElement;
    drawCircle(
      s: HTMLElement,name:string,
      x: number,
      y: number,
      height: number,
      width: number
    ): HTMLElement;
    drawRoundedRectangle(
      s: HTMLElement,name:string,
      x: number,
      y: number,
      height: number,
      width: number
    ): HTMLElement;
  }
}

HTMLElement.prototype.drawCircle = (
  s: HTMLElement,name:string,
  x: number,
  y: number,
  height: number,
  width: number
) => {
  let div = document.createElement("div");
  div.setAttribute('id',name);
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.position = "relative";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.borderRadius = "50%";
  div.style.backgroundColor = "red";
  s.appendChild(div);
  return s;
};

HTMLElement.prototype.drawRectangle = (
  s: HTMLElement,name:string,
  x: number,
  y: number,
  height: number,
  width: number
) => {
  let div = document.createElement("div");
  div.setAttribute('id',name);
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.position = "relative";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.backgroundColor = "red";
  s.appendChild(div);
  return s;
};

HTMLElement.prototype.drawRoundedRectangle = (
  s: HTMLElement,name:string,
  x: number,
  y: number,
  height: number,
  width: number
) => {
  let div = document.createElement("div");
  div.setAttribute('id',name);
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.position = "relative";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.borderRadius = "10px";
  div.style.backgroundColor = "red";
  s.appendChild(div);
  return s;
};

function signum(x) {
  return x < 0 ? -1 : 1;
}
function absolute(x) {
  return x < 0 ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
  // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
  var stroke = parseFloat(path.attr("stroke-width"));
  // check if the svg is big enough to draw the path, if not, set heigh/width
  if (svg.attr("height") < endY) svg.attr("height", endY);
  if (svg.attr("width") < startX + stroke) svg.attr("width", startX + stroke);
  if (svg.attr("width") < endX + stroke) svg.attr("width", endX + stroke);

  var deltaX = (endX - startX) * 0.15;
  var deltaY = (endY - startY) * 0.15;
  // for further calculations which ever is the shortest distance
  var delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

  // set sweep-flag (counter/clock-wise)
  // if start element is closer to the left edge,
  // draw the first arc counter-clockwise, and the second one clock-wise
  var arc1 = 0;
  var arc2 = 1;
  if (startX > endX) {
    arc1 = 1;
    arc2 = 0;
  }
  // draw tha pipe-like path
  // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
  path.attr(
    "d",
    "M" +
      startX +
      " " +
      startY +
      " V" +
      (startY + delta) +
      " A" +
      delta +
      " " +
      delta +
      " 0 0 " +
      arc1 +
      " " +
      (startX + delta * signum(deltaX)) +
      " " +
      (startY + 2 * delta) +
      " H" +
      (endX - delta * signum(deltaX)) +
      " A" +
      delta +
      " " +
      delta +
      " 0 0 " +
      arc2 +
      " " +
      endX +
      " " +
      (startY + 3 * delta) +
      " V" +
      endY
  );
}

export function connectElements(svg, path, startElem, endElem) {
  var svgContainer = $("#svgContainer");

  // if first element is lower than the second, swap!
  if (startElem.offset().top > endElem.offset().top) {
    var temp = startElem;
    startElem = endElem;
    endElem = temp;
  }

  // get (top, left) corner coordinates of the svg container
  var svgTop = svgContainer.offset().top;
  var svgLeft = svgContainer.offset().left;

  // get (top, left) coordinates for the two elements
  var startCoord = startElem.offset();
  var endCoord = endElem.offset();

  // calculate path's start (x,y)  coords
  // we want the x coordinate to visually result in the element's mid point
  var startX = startCoord.left + 0.5 * startElem.outerWidth() - svgLeft; // x = left offset + 0.5*width - svg's left offset
  var startY = startCoord.top + startElem.outerHeight() - svgTop; // y = top offset + height - svg's top offset

  // calculate path's end (x,y) coords
  var endX = endCoord.left + 0.5 * endElem.outerWidth() - svgLeft;
  var endY = endCoord.top - svgTop;

  // call function for drawing the path
  drawPath(svg, path, startX, startY, endX, endY);

}

function connectAll() {
  // connect all the paths you want!
  connectElements($("#svg1"), $("#path1"), $("#start"), $("#process1"));
  connectElements($("#svg1"), $("#path2"), $("#process1"), $("#process2"));
  connectElements($("#svg1"), $("#path3"), $("#process2"), $("#process3"));
  connectElements($("#svg1"), $("#path4"), $("#process3"), $("#end"));
  connectElements($("#svg1"), $("#path5"), $("#process2"), $("#end"));

  // connectDivs("start","process1",'blue',1);
  // connectDivs("process1","process2",'blue',1);
  // connectDivs("process2","process3",'blue',1);
  // connectDivs("process3","end",'blue',1);
  // connectDivs("process2","end",'blue',1);
  
}



//#######################################
function connectDivs(leftId, rightId, color, tension) {
  var left = document.getElementById(leftId);
  var right = document.getElementById(rightId);
     
  var leftPos = findAbsolutePosition(left);
  var x1 = leftPos.x;
  var y1 = leftPos.y;
  x1 += left.offsetWidth;
  y1 += (left.offsetHeight / 2);
 
  var rightPos = findAbsolutePosition(right);
  var x2 = rightPos.x;
  var y2 = rightPos.y;
  y2 += (right.offsetHeight / 2);
 
  var width=x2-x1;
  var height = y2-y1;
 
  drawCircle(x1, y1, 3, color);
  drawCircle(x2, y2, 3, color);
  drawCurvedLine(x1, y1, x2, y2, color, tension);
}
function findAbsolutePosition(htmlElement) {
  var x = htmlElement.offsetLeft;
  var y = htmlElement.offsetTop;
  for (var el=htmlElement; 
      
       el != null; 
       el = el.offsetParent) {
         x += el.offsetLeft;
         y += el.offsetTop;
  }
  return {
      "x": x,
      "y": y
  };
}

function drawCircle(x, y, radius, color) {
  var svg = createSVG();
      var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  shape.setAttributeNS(null, "cx", x);
  shape.setAttributeNS(null, "cy", y);
  shape.setAttributeNS(null, "r",  radius);
  shape.setAttributeNS(null, "fill", color);
  svg.appendChild(shape);
}
function createSVG() {
  var svg:HTMLElement = document.getElementById("svg1") as any;
  if (null == svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", 
                                   "svg") as any;
    svg.setAttribute('id', 'svg-canvas');
    svg.setAttribute('style', 'position:absolute;top:0px;left:0px');
    svg.setAttribute('width', document.body.clientWidth+'');
    svg.setAttribute('height', document.body.clientHeight+'');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", 
                       "xmlns:xlink", 
                       "http://www.w3.org/1999/xlink");
    document.body.appendChild(svg);
  }
  return svg;
}

function drawCurvedLine(x1, y1, x2, y2, color, tension) {
  var svg = createSVG();
  var shape = document.createElementNS("http://www.w3.org/2000/svg", 
                                       "path");
  var delta = (x2-x1)*tension;
  var hx1=x1+delta;
  var hy1=y1;
  var hx2=x2-delta;
  var hy2=y2;
  var path = "M "  + x1 + " " + y1 + 
             " C " + hx1 + " " + hy1 
                   + " "  + hx2 + " " + hy2 
             + " " + x2 + " " + y2;
  shape.setAttributeNS(null, "d", path);
  shape.setAttributeNS(null, "fill", "none");
  shape.setAttributeNS(null, "stroke", color);
  svg.appendChild(shape);
}

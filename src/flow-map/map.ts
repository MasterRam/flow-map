export class FlowMap {
  constructor(private id: string) {}
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  top: number = 0;
  objectInterval: number = 50;
  private _createBase(): boolean {
    let element = document.getElementById(this.id) as HTMLElement;
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.canvas.id = "mycanvas";
    this.canvas.height = element.clientHeight>700? element.clientHeight - 5:700;
    this.canvas.width = element.clientWidth>700?element.clientWidth - 5:700;
    element.appendChild(this.canvas);

    return true;
  }

  draw(data): void {
    if (!this._createBase()) return;

    this.context = this.canvas.getContext("2d");
    this.drawObject("circle", { width: 30, height: 30 });
    this.drawObject("rectangle", { width: 150, height: 100 });
    this.drawObject("rectangle", { width: 150, height: 100 });
    this.drawObject("rounded", { width: 150, height: 100 });
    this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("circle", { width: 30, height: 30 });

    this.context.stroke();
    //let ss=document.createElement('script');
    //ss.innerHTML=""

    //document.appendChild()
  }

  getPoints(forType: string, options: any): any {
    let center = this.canvas.width / 2;
    let x = 0;
    switch (forType) {
      case "rectangle":
        x = center - options.width / 2;
        return { x: x, y: this.top + this.objectInterval };
      case "rounded":
        x = center - options.width / 2;
        return { x: x, y: this.top + this.objectInterval };
      case "circle":
        return {
          x: center,
          y: this.top + options.height + this.objectInterval
        };
      case "multi":
        return {
          x: center,
          y: this.top + options.height + this.objectInterval
        };
      default:
        return { x: 0, y: 0 };
    }
  }

  drawObject(forType: string, options: any) {
    let origin = this.getPoints(forType, options);

    let top = this.top;
    let bottom = top+this.objectInterval;
    switch (forType) {
      case "rectangle":
        {
          this.context.rect(origin.x, origin.y, options.width, options.height);
        }
        this.top = this.top + options.height + this.objectInterval;
        break;
      case "circle":
        {
          this.context.moveTo(origin.x + options.width, origin.y);
          this.context.ellipse(
            origin.x,
            origin.y,
            options.width,
            options.height,
            0,
            0,
            360
          );
        }
        this.top = this.top + options.height * 2 + this.objectInterval;
        break;
      case "multi":
        {
          this.context.moveTo(origin.x + options.width, origin.y);
          this.regularpolygon(origin.x, origin.y, options.width, 4);
        }
        this.top = this.top + options.height * 2 + this.objectInterval;
        break;
      case "rounded":
        {
          this.context.moveTo(origin.x + options.width, origin.y);
          this.roundRect(
            origin.x,
            origin.y,
            options.width,
            options.height,
            10,
            null,
            true
          );
        }
        this.top = this.top + options.height + this.objectInterval;
        break;
      default:
        break;
    }
    if(top!=0)
    this.drawArrow(this.canvas.width / 2,top, this.canvas.width / 2, bottom);
    this.context.strokeStyle = "#cc0000";
    this.context.fillStyle = "#cc0000";
    this.context.fill();
    return { x: 0, y: 0 };
  }
  regularpolygon(x, y, radius, sides) {
    if (sides < 3) return;
    //this.context.beginPath();
    var a = Math.PI * 2 / sides;
    this.context.translate(x, y);
    this.context.moveTo(radius, 0);
    for (var i = 1; i <= sides; i++) {
      this.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    }

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    //this.context.closePath();
  }

  /**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} this.context
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
  roundRect(x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    //this.context.beginPath();
    this.context.moveTo(x + radius.tl, y);
    this.context.lineTo(x + width - radius.tr, y);
    this.context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    this.context.lineTo(x + width, y + height - radius.br);
    this.context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    this.context.lineTo(x + radius.bl, y + height);
    this.context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    this.context.lineTo(x, y + radius.tl);
    this.context.quadraticCurveTo(x, y, x + radius.tl, y);
    this.context.closePath();
    if (fill) {
      this.context.fill();
    }
    // if (stroke) {
    //   this.context.stroke();
    // }
  }
  drawConnector(forType: string, options: any) {}

  drawArrow(fromx, fromy, tox, toy) {
    //variables to be used when creating the arrow

    var headlen = 10;

    var angle = Math.atan2(toy - fromy, tox - fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    //this.context.beginPath();
    this.context.moveTo(fromx, fromy);
    this.context.lineTo(tox, toy);
    //this.context.strokeStyle = "#cc0000";
    //this.context.lineWidth = 2;
    // this.context.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    //this.context.beginPath();
    this.context.moveTo(tox, toy);
    this.context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    );

    //path from the side point of the arrow, to the other side point
    this.context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 7),
      toy - headlen * Math.sin(angle + Math.PI / 7)
    );

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    this.context.lineTo(tox, toy);
    this.context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    );

    //draws the paths created above
    //this.context.strokeStyle = "#cc0000";
    //this.context.lineWidth = 2;
    this.context.stroke();
    //this.context.fillStyle = "#cc0000";
    //this.context.fill();
  }
}

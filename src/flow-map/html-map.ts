export class FlowHTMLMap {
  constructor(private id: string) {}
  element: HTMLElement;
  top: number = 0;
  objectInterval: number = 10;
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

    this.drawObject("circle", { width: 30, height: 30 });
    this.drawObject("rectangle", { width: 150, height: 100 });
    this.drawObject("rectangle", { width: 150, height: 100 });
    this.drawObject("rounded", { width: 150, height: 100 });
    this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("multi", { width: 50, height: 50 });
    this.drawObject("circle", { width: 30, height: 30 });
  }

  getPoints(forType: string, options: any): any {
    let center = this.element.clientWidth / 2;
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
    let bottom = top + this.objectInterval;
    switch (forType) {
      case "rectangle":
        {
          this.element.drawRectangle(this.element,
            origin.x,
            origin.y,
            options.height,
            options.width
          );
        }
        this.top = this.top + options.height + this.objectInterval;
        break;
      case "circle":
        {
          this.element.drawCircle(this.element,
            origin.x,
            origin.y,
            options.height,
            options.width
          );
        }
        this.top = this.top + options.height * 2 + this.objectInterval;
        break;
      case "multi":
        // {
        //   this.context.moveTo(origin.x + options.width, origin.y);
        //   this.regularpolygon(origin.x, origin.y, options.width, 4);
        // }
        this.top = this.top + options.height * 2 + this.objectInterval;
        break;
      case "rounded":
        {
          this.element.drawRoundedRectangle(this.element,
            origin.x,
            origin.y,
            options.height,
            options.width
          );
        }
        this.top = this.top + options.height + this.objectInterval;
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
  interface HTMLElement  {
    drawRectangle(
      s: HTMLElement,
      x: number,
      y: number,
      height: number,
      width: number
    ): HTMLElement;
    drawCircle(
      s: HTMLElement,
      x: number,
      y: number,
      height: number,
      width: number
    ): HTMLElement;
    drawRoundedRectangle(
      s: HTMLElement,
      x: number,
      y: number,
      height: number,
      width: number
    ): HTMLElement;
  }
}


HTMLElement.prototype.drawCircle = (s:HTMLElement,
  x: number,
  y: number,
  height: number,
  width: number
) => {
  let div = document.createElement("div");
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.position = "relative";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.borderRadius = "50%";
  div.style.backgroundColor='red';
  s.appendChild(div);
  return s;
};

HTMLElement.prototype.drawRectangle = (s:HTMLElement,x: number, y: number, height: number, width: number) => {
let div = document.createElement("div");
div.style.width = width + "px";
div.style.height = height + "px";
div.style.position = "relative";
div.style.left = x + "px";
div.style.top = y + "px";
div.style.backgroundColor='red';
s.appendChild(div);
return s;
};

HTMLElement.prototype.drawRoundedRectangle = (s:HTMLElement,x: number, y: number, height: number, width: number) => {
  let div = document.createElement("div");
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.position = "relative";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.borderRadius = "10px";
  div.style.backgroundColor='red';
  s.appendChild(div);
  return s;
  };
  









// // export class DrawHTMLElement extends HTMLElement {
// //   prototype: DrawHTMLElement;
// //   /**
// //    *
// //    */
// //   constructor(HTMLElement) {
// //     super();
// //   }

// //   drawRectangle = (x: number, y: number, height: number, width: number) => {
// //     let div = document.createElement("div");
// //     div.style.width = width + "px";
// //     div.style.height = height + "px";
// //     div.style.position = "relative";
// //     div.style.left = x + "px";
// //     div.style.top = y + "px";
// //     this.appendChild(div);
// //   };
// //   drawRoundedRectangle = (
// //     x: number,
// //     y: number,
// //     height: number,
// //     width: number
// //   ) => {
// //     let div = document.createElement("div");
// //     div.style.width = width + "px";
// //     div.style.height = height + "px";
// //     div.style.position = "relative";
// //     div.style.left = x + "px";
// //     div.style.top = y + "px";
// //     div.style.borderRadius = "5px";
// //     this.appendChild(div);
// //   };

// //   drawCircle = (x: number, y: number, height: number, width: number) => {
// //     let div = document.createElement("div");
// //     div.style.width = width + "px";
// //     div.style.height = height + "px";
// //     div.style.position = "relative";
// //     div.style.left = x + "px";
// //     div.style.top = y + "px";
// //     div.style.borderRadius = "50%";
// //     this.appendChild(div);
// //   };

// //   drawArrow(fromx, fromy, tox, toy) {
// //     //variables to be used when creating the arrow

// //     var headlen = 10;
// //   }
// // }

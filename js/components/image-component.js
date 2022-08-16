import { Component } from "./component.js"

class Drawable extends Component{
    constructor(){
        this.renderable = true;
        this.drawdepth = 0;
    }
}
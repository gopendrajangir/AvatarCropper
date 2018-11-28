import React, { Component } from 'react';

const rightDivCover = {
  boxSizing: "border-box",
  position: "relative",
  margin: "0px",
  margin: "15px 0px",
  padding: "0px",
  width: "auto",
  display: "flex",
  alignItems: "center",
  backgroundColor: "silver",
  marginRight: "15px"
}

const circleSpacer = {
  boxSizing: "border-box",
  position: "absolute",
  height: "100%",
  margin: "0px",
  padding: "0px",
  backgroundColor: "inherit",
  transform: "translateX(-100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const circleSpacerBefore = {
  boxSizing: "border-box",
  margin: "0px",
  padding: "0px",
  display: "block",
  content: "",
  position: "absolute",
  right: "0px",
  borderRadius: "100%",
  backgroundColor: "white",
}

const rightDivLeft = {
  boxSizing: "border-box",
  position: "relative",
  borderRadius: "100%",
  margin: "0px",
  padding: "0px",
  margin: "0px 15px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const rightDivRight = {
  boxSizing: "content-box",
  padding: "20px",
  height: "100%",
  width: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around"
}

const canvas = {
  display: "none",
  position: "absolute",
  cursor: "move",
}

const image = {
  position: "absolute",
  cursor: "move",
}

const hiddenCanvas = {
  display: "none"
}

const rangeInput = {
  width: "100%"
}

const buttonWrapper = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around"
}

const buttons = {
  width: "80px",
  height: "30px"
}

var that;

export default class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {zoom: 1, left: 0, top: 0, right: 0, bottom: 0, url: this.props.url};
    this.onMouseDown = this.onMouseDown.bind(this);
    that = this;
  }

  getDiffs() {

    var divRect = document.querySelector('.right-div-left').getBoundingClientRect();
    var imgRect = document.querySelector('.image').getBoundingClientRect();
    
    return {
      left: divRect.left - imgRect.left,
      top: divRect.top - imgRect.top,
    }
  }

  changeRange(value) {

    var width = document.querySelector('.image').offsetWidth;
    var height = document.querySelector('.image').offsetHeight;

    var cL = this.state.left;
    var cT = this.state.top;
    
    var diffs = this.getDiffs();
    
    var newWidth = this.props.width * (100 * value)/100; 
    var newHeight = this.props.height * (100 * value)/100; 

    var widthDiff = newWidth - width;
    var heightDiff = newHeight - height;

    if(value > this.state.zoom) {
      cL -= widthDiff/2;
      cT -= heightDiff/2;
      
    } else if(value < this.state.zoom) { 

      if(diffs.left >= (width - this.props.width)-10) {
        cL = -1 * (newWidth - this.props.width);
      } else {
        cL -= widthDiff/2;
      }
      
      if(diffs.top >= (height - this.props.height)-10) {
        cT = -1 * (newHeight - this.props.height);
      } else {
        cT -= heightDiff/2;      
      }
      
    }

    this.setState({zoom: value, left: cL, top: cT});
  }

  handleMove(e) {

    var directionX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    var directionY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    var cL = that.state.left;
    var cT = that.state.top;

    var diffs = that.getDiffs();

    var width = parseInt(document.querySelector('.image').offsetWidth);
    var height = parseInt(document.querySelector('.image').offsetHeight);

    if(directionX > 0) {
      if(width == that.props.width) {
        cL = 0;
      } else if(diffs.left == 0) {
        cL = 0;
      } else if(diffs.left > 0) {
        cL += directionX;
      } else if(diffs.left < 0) {
        cL = 0;
      }
    } else if(directionX < 0) {
      if(width == that.props.width) {
        cL = 0;
      } else if(diffs.left == (width - that.props.width)) {
        
      } else if(diffs.left > 0 && diffs.left < (width - that.props.width)) {
        cL += directionX;
      } else if (diffs.left > (width - that.props.width)) {
        cL = -1 * (width - that.props.width);
      } else if(diffs.left > 0 || diffs.left < (width - that.props.width)) {
        cL += directionX;
      }
    }


    if(directionY > 0) {
      if(height == that.props.height) {
        cT = 0;
      } else if(diffs.top == 0) {
        cT = 0;
      } else if(diffs.top > 0) {
        cT += directionY;
      } else if(diffs.top < 0) {
        cT = 0;
      }
    } else if(directionY < 0) {
      if(height == that.props.height) {
        cT = 0;
      } else if(diffs.top == (height - that.props.height)) {
        cT = -1 * (height - that.props.height);
      } else if(diffs.top > 0 && diffs.top < (height - that.props.height)) {
        cT += directionY;
      } else if (diffs.top > (height - that.props.height)) {
        cT = -1 * (height - that.props.height);
      } else if(diffs.top > 0 || diffs.top < (height - that.props.height)) {
        cT += directionY;
      }
    }

    that.setState({left: cL, top: cT});

  }

  onMouseDown() {
    var image = document.querySelector('.image');
    
    image.addEventListener('mousemove', this.handleMove, true)
    document.addEventListener('mouseup',() => {
      image.removeEventListener('mousemove', this.handleMove, true);
    })
  }
  
  onMouseUp() {
    document.querySelector('.image').removeEventListener('mousemove', this.helpme, true);
  }
  
  canvasStatus() {
    
    var w = document.querySelector('.image').offsetWidth;
    var h = document.querySelector('.image').offsetHeight;
    
    var canvas = document.getElementById('myCanvas');
    
    var context = canvas.getContext('2d');
    
    canvas.width = w;
    canvas.height = h;
    
    var imageObj = new Image();
    
    imageObj.src = this.state.url;
    
    var that = this;

    var divRect = document.querySelector('.right-div-left').getBoundingClientRect();
    var imgRect = document.querySelector('.image').getBoundingClientRect();
    
    var diffs = {
      left: divRect.left - imgRect.left,
      top: divRect.top - imgRect.top,
    }
      
    var hiddenCanvas = document.getElementById('hidden-canvas');
    
    var hiddenContext = hiddenCanvas.getContext('2d');
    
    var dataURL;

    imageObj.onload = function() {
      var sourceX = 0;
      var sourceY = 0;
      var sourceWidth = w;
      var sourceHeight = h;
      
      context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight);      
      
      console.log(canvas.toDataURL());

      hiddenContext.drawImage(canvas, diffs.left, diffs.top, that.props.width, that.props.height, 0, 0, that.props.width, that.props.height);
      
      dataURL = hiddenCanvas.toDataURL();

      that.props.onSave(dataURL, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({url: nextProps.url, zoom: 1, left: 0, top: 0});
  }

  render() {
    return(
      <div style={{...rightDivCover, height: `${this.props.height + 30}px`}} className="right-div-cover">

        <div style={{...circleSpacer, width: `${this.props.width / 2 + 15}px`}} className="circle-spacer">
          <div style={{...circleSpacerBefore, width: `${this.props.width + 29}px`, height: `${this.props.height + 29}px`}} className="circleBefore">
          </div>
        </div>

        <div
          
          onMouseDown={ () => this.onMouseDown()}
          onMouseUp={() => this.onMouseUp()}
          style={
            {
              ...rightDivLeft, 
              width: `${this.props.width}px`, 
              height: `${this.props.height}px`
            }
          } 
          
          className="right-div-left">
          
          <canvas id="myCanvas"
            width={this.props.width} height={this.props.height}
            onDragStart={ (e) => {e.preventDefault()}} width={this.props.width} height={this.state.height}
            style={
              {
                ...canvas,
                left: `${this.state.left}px`,
                top: `${this.state.top}px`,
              }
            }
          >
          </canvas>
          <img className="image"
            onDragStart={ (e) => {e.preventDefault()}} width={this.props.width} height={this.state.height}
            src={this.state.url}
            style={
              {
                ...image,
                width: `${100 * this.state.zoom}%`,
                height: `${100 * this.state.zoom}%`,
                left: `${this.state.left}px`,
                top: `${this.state.top}px`,
              }
            }
          />
          
          <canvas width={this.props.height} height={this.props.width}
            id="hidden-canvas"
            style={
              {
                ...hiddenCanvas
              }
            }
          ></canvas>
        </div>

        <div style={rightDivRight} className="right-div-right">
          <input style={rangeInput} className="range-input" onChange={(e) => this.changeRange(e.target.value)} type="range" value={this.state.zoom} step="0.1" min="1" max="10"/>
          <div style={buttonWrapper} className="button-wrapper">
            <button onClick={() => {
              this.props.onSave(false);
            }}
            style={buttons}>Cancel</button>
            <button onClick={() => {
              this.canvasStatus();
              } 
            } style={buttons}>Save</button>
          </div>
        </div>

      </div>
    )
  }
}

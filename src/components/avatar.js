import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const leftDivCover = {
  position: "relative",
  boxSizing: "content-box",
  margin: "0px",
  zIndex: 1,
  padding: "0px",
  width: "auto",
  height: "auto",
  borderTopRightRadius: "100%",
  borderBottomRightRadius: "100%",
}

const leftDivChild = {
  boxSizing: "border-box",
  position: "relative",
  margin: "15px",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "2px solid grey"
}

const leftDivImage = {
  position: "relative",
  margin: "0px",
  padding: "0px",
  width: "100%",
  height: "100%",
  borderRadius: "100%",
}

const imageOverlay = {
  boxSizing: "border-box",
  position: "absolute",
  left: "0px",
  top: "0px",
  width: "100%",
  height: "100%",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.8)",
}

const imageInput = {
  display: "none"
}

const icon = {
  position: "absolute",
  color: "grey",
}

export default class CameraRoll extends Component {

  constructor(props) {
    super(props);
    this.state = {isHovered: false}
  }

  onHover() {
    this.setState({isHovered: true});
  }

  onLeave() {
    this.setState({isHovered: false});
  }

  render() {
    return (
      <div style={leftDivCover} className="left-div-cover">
        <label onMouseEnter={() => {this.onHover()}} onMouseLeave={() => {this.onLeave()}} style={{...leftDivChild, width:this.props.width, height: this.props.height, fontSize: `${30 * this.props.width / 100}px`}} htmlFor="image-input" className="left-div-child">
          <img style={leftDivImage} src={this.props.url} alt="img" />
          <ReactCSSTransitionGroup transitionName="MakeOpaque"
            transitionEnter = {true} transitionEnterTimeout = {0}
            transitionLeave = {true} transitionLeaveTimeout = {0}
            >
            {
              this.state.isHovered
              ?
              <div style={imageOverlay} className="image-overlay">
              <i style={icon} className="fas fa-camera"></i>
              </div>
              :
              null
            }
          </ReactCSSTransitionGroup>
          <input onInput = {(e) => { this.props.handler(e)}} style={imageInput} id="image-input" type="file" />
        </label>
      </div>
    )
  }
}

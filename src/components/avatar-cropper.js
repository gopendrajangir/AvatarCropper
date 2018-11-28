import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import Cropper from './cropper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const container = {
  position: "relative",
  boxSizing: "content-box",
  border: "2px solid grey",
  height: "auto",
  width: "auto",
  margin: "0px",
  padding: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
}

var that;

export default class AvatarCropper extends Component {
  
  constructor(props) {
    super(props);
    this.checkSelected = this.checkSelected.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {isSelected: false, currentURL: this.props.url, url: this.props.url, that: this};
    
    that = this;
  }
  
  checkSelected(e) {
    var reader = new FileReader();
    e.persist();
    reader.onload = function(e) {
      that.setState({url: e.target.result, isSelected: true});
    }
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = null;
  }
  
  onSave(url, isSelected) {
    console.log(url);
    this.setState({url: url || this.state.currentURL, isSelected, currentURL: url || this.state.currentURL});
  }
  
  render() {
    return(
      <div style={container} className="container">
          <Avatar handler={this.checkSelected} width={this.props.width} height={this.props.height} url={this.state.currentURL}/>
          {
            this.state.isSelected
            ?
            <ReactCSSTransitionGroup transitionName="slideToRight"
              transitionAppear = {true} transitionAppearTimeout={0}
              transitionEnter = {false}
              transitionLeave = {false}
              >
              <Cropper onSave={this.onSave} width={this.props.width} height={this.props.height} url={this.state.url} />
            </ReactCSSTransitionGroup>
            :
            null
          }
      </div>
    )
  }
}

AvatarCropper.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

AvatarCropper.defaultProps = {
  url: "http://www.esek.org.gr/images/ESET/eset_user.png",
  width: 180,
  height: 180
}

import React, { Component } from 'react';
import AvatarCropper from './avatar-cropper';

export default class App extends Component {
  render() {
    return (
      <AvatarCropper width={150} height={150} url="http://www.esek.org.gr/images/ESET/eset_user.png"/>
    );
  }
}

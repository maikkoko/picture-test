import React, { Component } from 'react'
import WebcamCapture from 'components/Webcam'
import ExifParser from 'exif-parser'
import moment from 'moment'

class Home extends Component {
  state = {
    exif: null,
    device: null,
    createDate: null,
    originDate: null,
    modifiedDate: null
  }

  getExif = buffer => {
    var parser = ExifParser.create(buffer)

    let exif = parser.parse()

    let { tags } = exif
    let device = (tags.Make || '') + ' ' + (tags.Model || '')
    let createDate = tags.CreateDate ? moment(tags.createDate).format('MMMM D, YYYY HH:mm:ss ZZ') : ''
    let modifiedDate = tags.ModifyDate ? moment(tags.ModifyDate).format('MMMM D, YYYY HH:mm:ss ZZ') : ''
    let originDate = tags.DateTimeOriginal ? moment(tags.DateTimeOriginal).format('MMMM D, YYYY HH:mm:ss ZZ') : ''

    console.log(tags)
    console.log(window.navigator)

    this.setState({
      exif: JSON.stringify(exif),
      device,
      createDate,
      originDate,
      modifiedDate
    })
  }
  
  onImageCapture = event => {
    let input = event.target
    let _this = this

    if (input.files && input.files[0]) {
      let reader = new FileReader()
  
      reader.onload = function(e) {
        _this.getExif(e.target.result)
      }
  
      reader.readAsArrayBuffer(input.files[0])
    }
  }

  render() {
    return (
      <div className="home">
        <h2>Home</h2>
  
        <WebcamCapture />
  
        <p>
          Capture Image:
          <input
            onChange={this.onImageCapture}
            type="file"
            accept="image/*"
            id="capture"
            capture
          />
        </p>
      
        <p>{window.navigator.userAgent}</p>
        <p>{}</p>
        <p>{`Device Info: ${this.state.device || ''}`}</p>
        <p>{`Create Date: ${this.state.createDate || ''}`}</p>
        <p>{`Modify Date: ${this.state.modifiedDate || ''}`}</p>
        <p>{`DateTime Original: ${this.state.originDate || ''}`}</p>
        <p>{`Exif: ${this.state.exif || ''}`}</p>

        <img id="captured-image" width="400px" />
        
      </div>
    )
  }

}
  

export default Home

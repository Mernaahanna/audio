import React, { Component} from 'react'
import './list.css'
import { Button, Modal} from 'antd';

export class AddList extends Component {

   constructor() {
       super();
       this.state = {
         visible: false,
         fields: {},
         errors: {}
        }
       this.handleChange = this.handleChange.bind(this);
       this.submitnewTrack = this.submitnewTrack.bind(this);
    }

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submitnewTrack(e) {
      e.preventDefault();
      if (this.validateForm()) {
        let fields = {};
        fields["track_name"] = "";
        fields["track_path"] = "";
        fields["artist_name"] = "";
        fields["track_length"] = "";
        this.setState({
          fields: fields
        });
// var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
// xmlhttp.open("POST", "https://api.myjson.com/bins/hw8lz");
// xmlhttp.setRequestHeader("Content-Type", "application/json");
// xmlhttp.send(JSON.stringify({
//   name: this.state.fields.track_name,
//       length: this.state.fields.track_length,
//       artist: this.state.fields.artist_name ,
//       url: this.state.fields.track_path
// }));
        this.setState({
          visible: false,
        });
      }
    }

     validateForm() {

       let fields = this.state.fields;
       let errors = {};
       let formIsValid = true;

       if (!fields["track_name"]) {
         formIsValid = false;
         errors["track_name"] = "*Please enter your track_name.";
       }

       if (typeof fields["track_name"] !== "undefined") {
         if (!fields["track_name"].match(/^[a-zA-Z ]*$/)) {
           formIsValid = false;
           errors["track_name"] = "*Please enter alphabet characters only.";
         }
       }

       if (!fields["track_path"]) {
         formIsValid = false;
         errors["track_path"] = "*Please enter your path.";
       }

       if (typeof fields["track_path"] !== "undefined") {
         //regular expression for email validation
         var pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)\.(mp3)*\/?$/);
         if (!pattern.test(fields["track_path"])) {
           formIsValid = false;
           errors["track_path"] = "*Please enter valid Url path.";
         }
       }

       if (!fields["artist_name"]) {
         formIsValid = false;
         errors["artist_name"] = "*Please enter artist name.";
       }

       if (typeof fields["artist_name"] !== "undefined") {
         if (!fields["artist_name"].match(/^[a-zA-Z ]*$/)) {
           formIsValid = false;
           errors["artist_name"] = "*Please enter alphabet characters only.";
         }
       }


       if (!fields["track_length"]) {
         formIsValid = false;
         errors["track_length"] = "*Please enter your track_length.";
       }

       if (typeof fields["track_length"] !== "undefined") {
         if (!fields["track_length"].match(/^[0-9\b]\.[0-9\b]+$/)) {
           formIsValid = false;
           errors["track_length"] = "*Please enter track_length Like 1.1";
         }
       }

       this.setState({
         errors: errors
       });
       return formIsValid;
     }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.submitnewTrack(e);
    
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return ( 
      <div>
      < Button type = "primary" style = {{width: "20%", fontSize: "1rem"}} 
        onClick = {this.showModal} > ADD NEW TRACK </Button>
      < Modal
        title = "ADD TRACK"
        visible = {this.state.visible}
        onOk = {this.handleOk}
        onCancel = {this.handleCancel} 
      >
        < form method = "post"
          name = "newTrack"
          onSubmit = {
              this.submitnewTrack
            } >
            <label >Track Name </label> 
            <input type = "text" name = "track_name" 
              value = {
                this.state.fields.track_name
              }
              onChange = {
                this.handleChange
              }
          /> 
          <div className = "errorMsg" > {this.state.errors.track_name} </div> 
          <label > Track Path < /label> 
          <input type = "text"
            name = "track_path"
            value = {
              this.state.fields.track_path
            }
            onChange = {
              this.handleChange
            }
          /> 
          <div className = "errorMsg" > {this.state.errors.track_path} </div> 
          <label > Artist Name </label> 
          <input type = "text"
            name = "artist_name"
            value = {
              this.state.fields.artist_name
            }
            onChange = {
              this.handleChange
            }
          /> 
          <div className = "errorMsg" > {this.state.errors.artist_name} </div> 
          <label > Track Length </label> 
          <input type = "track_length"
            name = "track_length"
            value = {
              this.state.fields.track_length
            }
            onChange = {
              this.handleChange
            }
          /> 
          <div className = "errorMsg" > {this.state.errors.track_length} </div> 
          {/* <input type = "submit" className = "button" value = "Add" / > */}
        </form>
      </Modal>
    </div>
    )
  }
}
export default AddList;
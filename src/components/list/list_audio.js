import React, {Component} from 'react'
import './list.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { Button, Modal} from 'antd';


export class ListAudio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      track: [],
      query: "",
      filteredData: [],
      visible: false,
      fields: {},
      errors: {},
      srcAudio:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitnewTrack = this.submitnewTrack.bind(this);
     this.playAudio = this.playAudio.bind(this);
     this.renderList = this.renderList.bind(this)
  }

  componentDidMount() {
    this.getTracks()
  }

  getTracks(){
   fetch("https://api.myjson.com/bins/hw8lz")
     .then(res => res.json())
     .then(
       (res) => {
         const {
           query
         } = this.state;

         const filteredData = res.tracks.filter(element => {
           return element.name.toLowerCase().includes(query.toLowerCase());
         });
         this.setState({
           track: res.tracks,
           filteredData
         });

       },
       (err) => {
         console.log(err)
       }
     )
  }

  search = event => {
       const query = event.target.value;
       this.setState(prevState => {
         const filteredData = prevState.track.filter(element => {
           return element.name.toLowerCase().includes(query.toLowerCase());
         });

         return {
           query,
           filteredData
         };
       })
  };

  renderList() {
    const {
      track,
      filteredData
    } = this.state
    return (track).map((d, index) => {
      return <div className = "listaduio"
      onClick = {
        this.playAudio.bind(this,d.url)
      } >
                < li > {`${d.name} - ${d.artist}`}
                  < div className = "inline" >
                    <h5 > {d.length} </h5>  
                    < a onClick = {
                        this.deleteElement.bind(this, index)
                      } > < FontAwesomeIcon icon = {
                      faTimes
                    }
                    />  
                    < /a>
                  </div>  
                </li>
              </div>
    })
  }

  playAudio(url){
   
           this.setState({
             srcAudio: url
           });
           var player = document.getElementById('audio');
           player.play()
  }

  deleteElement(index) {
    // this.state.filteredData == [] ? this.setState({
    //   track: this.state.track.filter(function (e, i) {
    //     console.log(i)
    //     return i !== index;
    //   })
    // }): this.setState({
    //       filteredData: this.state.filteredData.filter(function (e, i) {
    //         return i !== index;
    //       })
    //     })
    console.log(index)
    this.setState({
          track :this.state.track.filter(function (e, i) {
              return i !== index;
            }) })
         
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
      fields["name"] = "";
      fields["length"] = "";
      fields["artist"] = "";
      fields["url"] = "";
      this.setState({
        fields: fields
      });
     this.setState({
       track: this.state.track.concat({
         name: this.state.fields.name,
         length: parseFloat(this.state.fields.length),
         artist: this.state.fields.artist,
         url: this.state.fields.url
       }),
       visible: false,
     });
     }
     }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["url"]) {
      formIsValid = false;
      errors["url"] = "*Please enter your path.";
    }

    if (typeof fields["url"] !== "undefined") {
      //regular expression for url validation
      var pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)\.(mp3)*\/?$/);
      if (!pattern.test(fields["url"])) {
        formIsValid = false;
        errors["url"] = "*Please enter valid Url path.";
      }
    }

    if (!fields["artist"]) {
      formIsValid = false;
      errors["artist"] = "*Please enter artist name.";
    }

    if (typeof fields["artist"] !== "undefined") {
      if (!fields["artist"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["artist"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["length"]) {
      formIsValid = false;
      errors["length"] = "*Please enter your length.";
    }

    if (typeof fields["length"] !== "undefined") {
      if (!fields["length"].match(/^[0-9\b]\.[0-9\b]+$/)) {
        formIsValid = false;
        errors["length"] = "*Please enter length Like 1.1";
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
    this.setState({
      visible: false,
    });
  };

  render() {
    return ( <div className = "container" >
     <form >
       <input placeholder = "Search for..."
        value = {
          this.state.query
        }
        onChange = {
          this.search
        }
        style={{color:'black'}}
     /> 
     </form >
      < audio controls className = "player"
      preload = "false" id="audio">
        < source id = "audiosource"
        src = {
          this.state.srcAudio
        }
        />
        </audio> 
      <ul > {this.renderList()} </ul> 
      < Button type = "primary"
      style = {
        {
          width: "20%",
          fontSize: "1rem"
        }
      }
      onClick = {
          this.showModal
        } > ADD NEW TRACK </Button> 
        <Modal
          title = "ADD TRACK"
          visible = {this.state.visible}
          onOk = {this.handleOk}
          onCancel = {this.handleCancel} >
        <form method = "post"
          name = "newTrack"
          onSubmit = {this.submitnewTrack} >
        <label > Track Name </label>  
        <input type = "text"
          name = "name"
          value = {this.state.fields.name}
          onChange = {this.handleChange}
        />  
        <div className = "errorMsg" > {this.state.errors.name} </div>  
        <label > Track Path </label>  
        <input type = "text"
          name = "url"
          value = {this.state.fields.url}
          onChange = {this.handleChange}
        />  
        <div className = "errorMsg" > {this.state.errors.url} </div>  
        <label > Artist Name </label>  
        <input type = "text"
          name = "artist"
          value = {this.state.fields.artist}
          onChange = {this.handleChange}
        />  
        <div className = "errorMsg" > {this.state.errors.artist} </div>  
        <label > Track Length </label>  
        <input type = "length"
          name = "length"
          value = {this.state.fields.length}
          onChange = {this.handleChange}
        />  
        <div className = "errorMsg" > {this.state.errors.length} </div>  
         </form> 
         </Modal>
      </div>
    )
  }
}
export default ListAudio;
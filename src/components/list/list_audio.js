import React, {Component} from 'react'
import './list.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import AddList from './add_list'

export class ListAudio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      track: [],
      query: "",
      filteredData: []
    };
  }

  componentDidMount() {
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

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.track.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  renderList() {
    const {
      track,
      filteredData
    } = this.state
    return (filteredData == [] ? track : filteredData).map((d, index) => {
      return <div className = "listaduio" > 
                < li > {`${d.name} - ${d.artist}`}
                  < div className = "inline" >
                    <h5 > {d.length} < /h5>  
                    < FontAwesomeIcon icon = {
                      faTimes
                    }
                    onClick = {
                      this.deleteElement.bind(this, index)
                    }
                    />  
                  </div>  
                </li>
              </div>
    })
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
    this.state.filteredData == [] ? this.setState({
          track :this.state.track.filter(function (e, i) {
              return i !== index;
            }) })
            : this.setState({
                 track: this.state.filteredData.filter(function (e, i) {
              return i !== index;
            })})
        console.log(this.state.track)
  }

  render() {
    return ( <div className = "container" >
     <form >
       <input placeholder = "Search for..."
        value = {
          this.state.query
        }
        onChange = {
          this.handleInputChange
        }
        style={{color:'black'}}
     /> 
     </form >
      <audio id = "audio1"
      preload controls > Your browser does not support HTML5 Audio!😢 < /audio> 
      <ul > {this.renderList()} </ul> 
      < AddList/>
      </div>
    )
  }
}
export default ListAudio;
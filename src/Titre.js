import React, { Component } from 'react'

export default class Titre extends Component {

        constructor(props) {
          super(props);
          this.state = { seconds: 10000 };
        }
      
        tick() {
          this.setState(state => ({
            seconds: state.seconds -1
          }));
        }
      
        componentDidMount() {
          this.interval = setInterval(() => this.tick(), 1000);
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
        }
      
    


    render() {
        return (
            <div>
                <div>
              Secondes : {this.state.seconds}
                 </div>
                <h1>voici mon premier composant</h1>
                {this.props.nom}
                {this.props.children}
            </div>
        )
    }
}



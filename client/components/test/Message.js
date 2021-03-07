import React from 'react'

class Message extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
      message: {}
    }

    componentDidMount() {
        fetch('/api/test')
        .then((response) => response.json())
        .then((data) => {
          this.setState({message:data})
          console.log('hey helloworld response is')
          console.log(this.state.message)
        })
        .catch(console.log)
    }

    render(){
        return(
            <div>
             { this.state.message.content }
            </div>
        )
    }
}

export default Message;
import React from 'react'
import { connect } from 'react-redux'

class MessageTile extends React.Component {


    render(){
        return (
            <div>
                {this.props.message.content}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { 
      user: state.user,
      messages: state.messages
    }
  }
  
const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, null)(MessageTile);
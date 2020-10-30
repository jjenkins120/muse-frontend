import React from 'react'
import { connect } from 'react-redux'


class ShowUser extends React.Component {

    state = {
        user: {}
    }

componentDidMount(){
    const userId = parseInt(this.props.match.params.id)
    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp => resp.json())
    .then(userObj => {
        this.setState({
            user: userObj
        })
    })
}

renderFollower = () => {
    
   
}

    
    render(){
        return (
            <div>
                {this.state.user.first_name} {this.state.user.last_name}
                
                {this.renderFollower()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { 
      
    }
  }
  
const mapDispatchToProps = {
   
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
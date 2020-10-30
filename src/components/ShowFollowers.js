import React from 'react'
import { connect } from 'react-redux'

class ShowFollowers extends React.Component {
    
    render(){
        return(
            <div>
                Show Followers page
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowFollowers);
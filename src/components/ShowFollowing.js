import React from 'react'
import { connect } from 'react-redux'

class ShowFollowing extends React.Component {
    
    render(){
        return(
            <div>
                Show Following page
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowFollowing);
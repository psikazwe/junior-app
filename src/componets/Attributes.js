import React, { PureComponent } from 'react';
class Attributes extends PureComponent{
    render(){
      if(this.props.attributes.name === 'Color'){
         return(
          <div className='row'>
            <h2>{this.props.attributes.name}:</h2>
            <div className='attributes'>
                {
                    this.props.attributes.items.map( (art, key) => 
                        <button 
                          style={{background: art.value}}
                          key={key} 
                          className={
                              this.props.isSet(this.props.attributes.id, art.id) ? 
                                'attribute-button color active '+art.value 
                              : 
                                'attribute-button color'
                          }  
                          data-bg={art.value} 
                          onClick={
                              () => this.props.setAttribute(this.props.attributes.id,art.id)}
                        />
                    )
                }
            </div>
          </div>
        )
      }
      else{
        return(
          <div className='row'>
            <h2>{this.props.attributes.name}:</h2>
            <div className='attributes'>
              {
                this.props.attributes.items.map( (art, key) => 
                  <button 
                    key={key} 
                    className={ 
                      this.props.isSet(this.props.attributes.id, art.id) 
                      ? 'attribute-button active' 
                      : 'attribute-button'
                    } 
                    onClick={ () => 
                      this.props.setAttribute(this.props.attributes.id,art.id)
                    }
                  > 
                    { art.value } 
                  </button>
                )
              }
            </div>
          </div>
        )
      }
     
    }
}

export default Attributes
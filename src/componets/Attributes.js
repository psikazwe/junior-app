import React, { PureComponent } from 'react';
import styled from 'styled-components';
const StyledColorBox =styled.div`
  background: ${props => props.boxColor};
  height: 100%;
  width: 100%;
`;
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
                            key={key} 
                            className={
                                this.props.isSet(this.props.attributes.id, art.id) ? 
                                  'attribute-button color active '+art.value 
                                : 
                                  'attribute-button color'
                            }  
                            onClick={() => this.props.setAttribute(this.props.attributes.id,art.id)}
                          > 
                            <StyledColorBox boxColor={art.value}/>
                          </button>             

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
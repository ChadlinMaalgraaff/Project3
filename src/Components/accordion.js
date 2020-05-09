import React, { Component } from 'react';
import { Button } from "react-bootstrap";

class MyAccordion extends Component {
    state = {
        open: 'true'
    }

    openBottom = () => {
        const bottom = document.getElementById(this.props.rando); 
        console.log(bottom);

        if (this.state.open == 'false') {
            this.setState({
                open: 'true'
            })
        }else {
            this.setState({
                open: 'false'
            })
        }   

        if (this.state.open == 'true') {
            bottom.style.maxHeight = '500px';
            bottom.style.height = '500px';
            bottom.style.opacity  = '1';
        }else {
            bottom.style.maxHeight = '0px';
            bottom.style.opacity  = '0';
        }

        console.log(bottom);

    }

    render() {
        return (
            <div
                className={'accordion ' + this.props.open ? 'open' : ''}
                key={this.props.rando}
                style={{backgroundColor:'grey'}}
            >
                <div className='top'>
                    <div>
                        {this.props.top}
                    </div>
                    <div>
                        <Button onClick={this.openBottom}>Click me!</Button>
                    </div>
                </div>
                <div className='bottom' id={this.props.rando}>
                    {this.props.bottom}
                </div>
            </div>
        );
    }
}

export default MyAccordion;
import React, { Component } from 'react';
import './style.css';

class SideMenuToggle extends Component {

    render() {
        let menuOpen = false;

        const clicked = () => {
            const content = document.getElementById('toggle-content');
            const items = content.getElementsByClassName('content-item');
            const menuBtn = document.getElementById('menu-btn');

            if(!menuOpen) {
                menuBtn.classList.add('open');
                menuOpen = true;
              } else {
                menuBtn.classList.remove('open');
                menuOpen = false;
            } 

            content.classList.toggle("open");
            for (var i = 0; i < items.length; i++) {
                items[i].classList.toggle("fade");
            }
        }
        
        return(
            <div className='toggle'>
                <div className="menu-btn" id='menu-btn' onClick={clicked}>
                    <div className="menu-btn__burger"></div>
                </div>
                <div className='toggle-content' id='toggle-content'>
                    <div className='content-item' id='content-item'>
                        Content item
                    </div>
                </div>
                <div style={{height: '1000vh', minHeight: '1000px'}}>
                </div>
            </div>
        );
    }

}

export default SideMenuToggle;
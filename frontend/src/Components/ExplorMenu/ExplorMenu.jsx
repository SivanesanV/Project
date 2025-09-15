import React from 'react'
import './ExplorMenu.css'
import { menu_list } from '../../assets/assets'

function ExplorMenu({ category, setCategory }) {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className="explore-menu-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, nam.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index} className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
};

export default ExplorMenu

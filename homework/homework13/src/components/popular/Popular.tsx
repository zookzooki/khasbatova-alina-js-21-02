import React from 'react'
import './Popular.css'

interface PopularItemProps {
    name: string,
}

export class Popular extends React.Component<PopularItemProps> {
    render(){
        return <div className="popular__item popular__item__theme_default">
            <div className="popular__item__picture"/>
            <div><a className="popular__item__name" href="#">{this.props.name}</a></div>
            <button className="popular__item__button">Купить</button>
        </div>
    }
}

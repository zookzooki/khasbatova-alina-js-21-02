import React from 'react'
import './Sidebar.css'

export class Sidebar extends React.Component {
    render() {
        return <div className="sidebar sidebar__theme_default">
            <p className="sidebar__fish-type">Морская рыба</p>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Акула
            </label>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Окунь
            </label>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Палтус
            </label>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Треска
            </label>
            <p className="sidebar__fish-type">Пресноводная рыба</p>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Белоглазка
            </label>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Осётр
            </label>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Речной угорь
            </label>
            <label className="sidebar__checkbox">
                <input type="checkbox"/>
                    Налим
            </label>
        </div>
    }
}
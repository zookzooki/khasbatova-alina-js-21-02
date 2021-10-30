import React from 'react';
import './Content.css'
import {apiResponse} from "../../../api-mock/api";
import {Popular} from "../../popular/Popular";

export class Content extends React.Component {
    render() {
        return <div className="content">
            <div className="content__text">
                <h1>Рыбы на любой вкус</h1>
                <p>Мы продаем рыбов, а не только показываем!</p>
            </div>
            <div className="content__fish-type">
                <div className="fish-type__item fish-type__item__theme_default">
                    <a href="#">Замороженные рыбы</a>
                    <p>Мы заморозили рыбов для вас</p>
                </div>
                <div className="fish-type__item fish-type__item__theme_default">
                    <a href="#">Живые рыбы</a>
                    <p>На кухню или разведение</p>
                </div>
            </div>
            <div>
                <h2>Популярные</h2>
                <div className="popular">
                    {apiResponse.status === 'ok' ?
                        apiResponse.result.map((elem: any, index: number) => <Popular name = {elem.name} key={index}/>) :
                        'При загрузке произошла ошибка'
                    }
                </div>
            </div>
        </div>
    }
}

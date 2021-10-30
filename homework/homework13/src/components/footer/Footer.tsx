import React from 'react';
import './Footer.css'

export class Footer extends React.Component {
    render() {
        return <div className="footer footer__theme_default">
            <p className="footer__contacts">Контакты</p>
            <p className="footer__copyright">© 2021 ИП Рыбов О.А.</p>
        </div>
    }
}

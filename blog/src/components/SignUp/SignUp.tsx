import React from 'react';
import {
  Form, Input, Button, Col, Row, Select, DatePicker,
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';

import './SignUp.scss';
import { create } from '../../redux/actions/signInAction';
import { CardType } from '../../redux/types/dumMyApiResponses';
import { Loader } from '../Loader/Loader';
import { ThemeContext, ThemeContextState } from '../../context/ThemeContext';

const { Option } = Select;

export const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.signIn.error);
  const loading = useSelector((state: any) => state.signIn.loading);
  const redirect = useSelector((state: any) => state.signIn.redirect);
  const info = useSelector((state: any) => state.signIn.info);

  const onFinish = (value: CardType) => {
    dispatch(create(value));
    form.resetFields();
  };

  return (

    <ThemeContext.Consumer>
      {
          (context: Partial<ThemeContextState>) => (
            <div className={`signUp ${context.darkTheme ? 'signUp_dark' : ''}`}>
              {
       loading
         ? <Loader />
         : redirect
           ? (<Redirect to={`/profile/${info.id}`} />)
           : (
             <Row
               justify="center"
               align="middle"
             >
               <Col sm={12} xs={24}>
                 <h1>Регистрация</h1>
                 <Form
                   layout="vertical"
                   initialValues={{
                     firstName: '',
                     lastName: '',
                     email: '',
                     phone: '',
                     gender: '',
                     dateOfBirth: '',
                   }}
                   form={form}
                   onFinish={(value: CardType) => onFinish(value)}
                   autoComplete="off"
                 >
                   <Form.Item
                     label="Имя"
                     name="firstName"
                     rules={[
                       {
                         required: true,
                         type: 'string',
                         message: 'Обязательное поле',
                       },
                     ]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item
                     label="Фамилия"
                     name="lastName"
                     rules={[
                       {
                         required: true,
                         message: 'Обязательное поле',
                       },
                     ]}
                   >
                     <Input />
                   </Form.Item>

                   <Form.Item
                     name="email"
                     label="E-mail"
                     rules={[
                       {
                         type: 'email',
                         message: 'Некорректная электронная почта',
                       },
                       {
                         required: true,
                         message: 'Обязательное поле',
                       },
                     ]}
                   >
                     <Input />
                   </Form.Item>

                   <Form.Item name="dateOfBirth" label="Дата рождения">
                     <DatePicker
                       locale={locale}
                       disabledDate={(current) => current && current > moment().endOf('day')}
                     />
                   </Form.Item>

                   <Form.Item
                     name="gender"
                     label="Пол"
                   >
                     <Select placeholder="Ваш пол">
                       <Option value="female">женский</Option>
                       <Option value="male">мужской</Option>
                       <Option value="other">другой</Option>
                     </Select>
                   </Form.Item>
                   <Form.Item>
                     <Button type="primary" htmlType="submit" block className="confirm">
                       Регистрация
                     </Button>
                   </Form.Item>
                 </Form>
                 <Link to="/signin"><p className="has_account">Уже есть аккаунт? Войти</p></Link>
                 { error ? <div className="error">{error}</div> : '' }
               </Col>
             </Row>
           )
      }
            </div>
          )
        }
    </ThemeContext.Consumer>
  );
};

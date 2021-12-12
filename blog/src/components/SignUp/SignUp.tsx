import React from 'react';
import {
  Form, Input, Button, Col, Row, Select, DatePicker,
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import enLocale from 'antd/es/date-picker/locale/en_US';
import ruLocale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const dateFormat = 'DD.MM.YYYY';

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
                 <h1>{t('signUp.title')}</h1>
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
                     label={t('signUp.firstNameLabel')}
                     name="firstName"
                     rules={[
                       {
                         required: true,
                         type: 'string',
                         message: t('signUp.errorMessage'),
                       },
                     ]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item
                     label={t('signUp.lastNameLabel')}
                     name="lastName"
                     rules={[
                       {
                         required: true,
                         message: t('signUp.errorMessage'),
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
                         message: t('signUp.emailErrorMessage'),
                       },
                       {
                         required: true,
                         message: t('signUp.errorMessage'),
                       },
                     ]}
                   >
                     <Input />
                   </Form.Item>

                   <Form.Item name="dateOfBirth" label={t('signUp.birthDateLabel')}>
                     <DatePicker
                       format={dateFormat}
                       locale={window.localStorage.i18nextLng.split('-')[0] === 'en' ? enLocale : ruLocale}
                       disabledDate={(current) => current && current > moment().endOf('day')}
                     />
                   </Form.Item>

                   <Form.Item
                     name="gender"
                     label={t('signUp.genderLabel')}
                   >
                     <Select placeholder={t('signUp.genderLabel')}>
                       <Option value="female">{t('signUp.femaleType')}</Option>
                       <Option value="male">{t('signUp.maleType')}</Option>
                       <Option value="other">{t('signUp.otherType')}</Option>
                     </Select>
                   </Form.Item>
                   <Form.Item>
                     <Button type="primary" htmlType="submit" block className="confirm">
                       {t('signUp.enter')}
                     </Button>
                   </Form.Item>
                 </Form>
                 <Link to="/signin"><p className="has_account">{t('signUp.haveAccount')}</p></Link>
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

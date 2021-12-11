import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './SignIn.scss';
import { load } from '../../redux/actions/signInAction';
import { CardType } from '../../redux/types/dumMyApiResponses';
import { Loader } from '../Loader/Loader';
import { ThemeContext, ThemeContextState } from '../../context/ThemeContext';

export const SignIn = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.signIn.error);
  const loading = useSelector((state: any) => state.signIn.loading);
  const redirect = useSelector((state: any) => state.signIn.redirect);
  const { t } = useTranslation();

  const onFinish = (value: CardType) => {
    if (value.id) {
      dispatch(load(value?.id));
      form.resetFields();
    }
  };

  return (
    <ThemeContext.Consumer>
      {
          (context: Partial<ThemeContextState>) => (
            <div className={`signIn ${context.darkTheme ? 'signIn_dark' : ''}`}>
              {
       loading
         ? <Loader />
         : redirect
           ? (<Redirect to="/user" />)
           : (
             <Row
               justify="center"
               align="middle"
             >
               <Col sm={12} xs={24}>
                 <h1>{t('signIn.title')}</h1>
                 <Form
                   form={form}
                   layout="vertical"
                   onFinish={(value) => onFinish(value)}
                   autoComplete="off"
                   initialValues={{
                     id: '',
                   }}
                 >
                   <Form.Item
                     name="id"
                     label="ID"
                     rules={[
                       {
                         required: true,
                         pattern: new RegExp(/^[a-zA-Z0-9]+$/),
                         message: t('signIn.errorMessage'),
                       },
                     ]}
                   >
                     <Input placeholder={t('signIn.input')} />
                   </Form.Item>
                   <Form.Item>
                     <Button type="primary" block className="confirm" htmlType="submit">
                       {t('signIn.enter')}
                     </Button>
                   </Form.Item>
                 </Form>
                 <Link to="/signup"><p className="no_account">{t('signIn.noAccount')}</p></Link>
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

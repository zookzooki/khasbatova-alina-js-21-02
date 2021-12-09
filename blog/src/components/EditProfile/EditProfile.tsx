import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, DatePicker, // Col, Row,
} from 'antd';
import 'antd/dist/antd.css';
import 'moment/locale/ru';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/ru_RU';

import './EditProfile.scss';
import { updateProfile, notVisibleModal } from '../../redux/actions/profileAction';
import { load } from '../../redux/actions/signInAction';
import { CardType } from '../../redux/types/dumMyApiResponses';

export const EditProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const visible = useSelector((state: any) => state.profile.visibleModal);
  const info = useSelector((state: any) => state.profile.info);

  const onClose = () => {
    dispatch(notVisibleModal());
    form.resetFields();
  };

  const onFinish = (value: CardType) => {
    dispatch(updateProfile(info.id, value));
    form.resetFields();
    onClose();
    dispatch(load(info.id));
  };

  if (!visible) return null;
  const dateFormat = 'DD.MM.YYYY';

  return (
    <div className="edit_profile__modal">
      <CloseOutlined onClick={onClose} className="modal-close" />
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <div className="picture">
            {
            info.picture ? <img src={info.picture} alt="картинка поста" /> : <UserOutlined className="noPicture" />
          }
          </div>
          <Form
            layout="horizontal"
            size="small"
            initialValues={{
              firstName: info.firstName,
              lastName: info.lastName,
              gender: info.gender,
              phone: info.phone,
              picture: info.picture,
              dateOfBirth: moment(info.dateOfBirth),
            }}
            form={form}
            onFinish={(value: CardType) => onFinish(value)}
            autoComplete="off"
          >

            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="picture"
              label="URL фотографии"
              rules={[
                {
                  type: 'url',
                  message: 'Допустимые значения: url',
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              label="Имя"
              name="firstName"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/[a-zA-ZA-Яа-яЁё]+$/),
                  message: 'Обязательное поле состоит только из букв',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              label="Фамилия"
              name="lastName"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/[a-zA-ZA-Яа-яЁё]+$/),
                  message: 'Обязательное поле состоит только из букв',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="phone"
              label="Телефон"
              rules={[
                {
                  pattern: new RegExp(/^(8|\+7)+[\d]+$/),
                  message: 'Должен начинаться с 8 или +7 и содержать только цифры',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="dateOfBirth"
              label="Дата рождения"
            >

              <DatePicker
                format={dateFormat}
                locale={locale}
                getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                disabledDate={(current) => current && current > moment().endOf('day')}
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="gender"
              label="Пол"
              rules={[
                {
                  pattern: new RegExp(/^(female|male|other)$/),
                  message: 'Допустимые значения: female, male, other',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="confirm">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

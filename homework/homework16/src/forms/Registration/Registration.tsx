import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Form, Input, Button, Select, DatePicker,
} from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import 'antd/dist/antd.css';
import './Registration.css';
import { ProfileResponse } from '../../types/dumMyApiResponses';
import { createUser } from '../../api/dumMyApi';

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="7">+7</Option>
      <Option value="8">+8</Option>
    </Select>
  </Form.Item>
);

export const Registration = () => {
  const [form] = Form.useForm();
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');

  const onFinish = (values: ProfileResponse) => {
    const {
      firstName, lastName, email, phone, gender, picture,
    } = values;
    const isDateOfBirth = values.dateOfBirth;
    let dateOfBirth;
    if (isDateOfBirth) {
      const fullDate = new Date(isDateOfBirth);
      dateOfBirth = `${fullDate.getMonth() + 1}/${fullDate.getDate()}/${fullDate.getFullYear()}`;
      console.log(fullDate, dateOfBirth);
    }
    console.log('dateOfBirth', dateOfBirth);
    createUser({
      firstName, lastName, email, phone, gender, dateOfBirth, picture,
    }, (resp: ProfileResponse) => {
      if (resp && resp.id) {
        setUserId(resp.id);
        setRedirect(true);
      }
    });
  };

  return redirect
    ? (<Redirect to={`/user/${userId}`} />)
    : (
      <Form
        id="registration-form"
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Имя"
          name="firstName"
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

        <Form.Item
          name="phone"
          label="Номер телефона"
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item name="dateOfBirth" label="Дата рождения">
          <DatePicker locale={locale} />
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

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        />
        <Form.Item
          label="Аватарка"
          name="picture"
          rules={[
            {
              type: 'url',
              message: 'Введите url аватарки',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Регистрация
        </Button>
      </Form>
    );
};

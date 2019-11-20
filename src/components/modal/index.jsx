import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, Button, Input, Slider, InputNumber, Row, Col, Select } from 'antd';

const ModalComp = props => {
  const {
    isModalOpen,
    handleChange,
    requestData,
    changeNumOfVideos,
    changeSortType,
    saveRequest,
    handleCloseModal,
    edit,
    error
  } = props;
  const { Option } = Select;
  return (
    <div className={cn('modal-wrapper', { hidden: !isModalOpen })}>
      <div className="modal">
        <Form className="modal-form" onSubmit={saveRequest}>
          <p className="modal-form__title">Сохранить запрос</p>
          <Form.Item hasFeedback label="Запрос" colon={false}>
            <Input
              disabled={edit === null}
              name="searchQuery"
              size="large"
              onChange={handleChange}
              value={requestData.searchQuery}
            />
          </Form.Item>
          <Form.Item
            label="Название"
            hasFeedback
            colon={false}
            required
            validateStatus={error}
            help={error ? ' Название не должно быть пустым' : ''}
          >
            <Input
              onChange={handleChange}
              value={requestData.name}
              name="name"
              size="large"
              placeholder="Укажите название"
              style={{ color: 'rgba(0,0,0,.25)' }}
            />
          </Form.Item>
          <Form.Item label="Сортировать по" className="modal-form__item">
            <Select
              value={requestData.sortBy}
              defaultValue="relevance"
              size="large"
              onChange={changeSortType}
            >
              <Option value="date">Дате</Option>
              <Option value="rating">Рейтингу</Option>
              <Option value="relevance">Релевантности</Option>
              <Option value="title">Заголовку</Option>
              <Option value="videoCount ">Количеству видео</Option>
              <Option value="viewCount">Просмотрам</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Максимальное количество">
            <Row>
              <Col span={18}>
                <Slider
                  key="numOfVideos"
                  name="numOfVideos"
                  min={1}
                  max={50}
                  onChange={changeNumOfVideos}
                  value={typeof requestData.numOfVideos === 'number' ? requestData.numOfVideos : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  key="numOfVideos"
                  name="numOfVideos"
                  min={1}
                  max={50}
                  style={{ marginLeft: 16 }}
                  value={requestData.numOfVideos}
                  onChange={changeNumOfVideos}
                />
              </Col>
            </Row>
          </Form.Item>
          <div className="modal-form__buttons">
            <Form.Item className="modal-button">
              <Button type="primary" ghost size="large" onClick={handleCloseModal}>
                {edit !== null ? 'Не изменять' : 'Не сохранять'}
              </Button>
            </Form.Item>
            <Form.Item className="modal-button">
              <Button type="primary" size="large" htmlType="submit">
                {edit !== null ? 'Изменить' : 'Сохранить'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Form.create()(ModalComp);

ModalComp.propTypes = {
  changeNumOfVideos: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  requestData: PropTypes.object.isRequired,
  changeSortType: PropTypes.func.isRequired,
  saveRequest: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  edit: PropTypes.number,
  error: PropTypes.string.isRequired
};
ModalComp.defaultProps = {
  edit: undefined
};

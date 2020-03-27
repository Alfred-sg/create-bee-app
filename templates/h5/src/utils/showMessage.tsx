import React from 'react';
import { message, Modal, Collapse } from 'antd-mobile';
import { IS_PROD } from '@/config';
import { Response } from '@/types/global';

const { Panel } = Collapse;

const showMessage = (text: string, res: Response, onClose?: () => void) => {
  if (res && res.success){
    message.success({
      content: renderMessage(text, res),
      onClose,
    });
  } else {
    message.error({
      content: renderMessage(text, res),
      onClose,
      duration: 5,
    });
  }
}

const renderMessage = (text: string, res: Response) => {
  return (
    <span>
      {text}
      {(!res || !res.success) ? 
        '：' + (res ? res.errorMessage : '未知错误') : 
        ''}
      {!IS_PROD && res && (
        <a 
          style={{paddingLeft: '5px'}} 
          onClick={() => showDetail(text, res)}
        >
          详情
        </a>
      )}
    </span>
  )
}

const showDetail = (text: string, res: Response) => {
  const { origin, ...rest } = res;

  if (!origin){
    Modal.info({
      title: text,
      content: (
        <pre>
          <code>
            {JSON.stringify(res, null, 2)}
          </code>
        </pre>
      ),
    })
    return;
  }

  const { url, method, params } = origin;

  Modal.info({
    title: text,
    content: (
      <div>
        <div style={{lineHeight: 2.4}}>
          <span style={{color: 'rgba(0, 0, 0, 0.85)'}}>请求地址</span>：{url}
        </div>
        <div style={{lineHeight: 2.4, marginBottom: 10}}>
          <span style={{color: 'rgba(0, 0, 0, 0.85)'}}>请求方法</span>：{method}
        </div>
        {params && rest && Object.keys(rest).length && (
          <Collapse defaultActiveKey={res && res.success ? "params" : "res"}>
            {params && (
              <Panel header="请求参数" key="params">
                <pre>
                  <code>
                    {JSON.stringify(params, null, 2)}
                  </code>
                </pre>
              </Panel>
            )}
            {rest && Object.keys(rest).length && (
              <Panel header="响应内容" key="res">
                <pre>
                  <code>
                    {JSON.stringify(rest, null, 2)}
                  </code>
                </pre>
              </Panel>
            )}
          </Collapse>
        )}
      </div>
    ),
    width: 720
  })
}

export default showMessage;

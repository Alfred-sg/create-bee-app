import React from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as dd from 'dingtalk-jsapi';
import showMessage from '@/utils/showMessage';
import styles from './index.scss';

interface Item {
  label: string,
  value: number,
}

export default ({
  value = [],
  onChange,
}: {
  value?: Item[],
  onChange?: (value: Item[]) => any,
}) => {
  const onClick = () => {
    dd.ready(() => {
      dd.biz.contact.choose({
        multiple: false,// multiple || false, //是否多选：true多选 false单选； 默认true
        users: [],// (value || []).map(item => item.value), //默认选中的用户列表，员工userid；成功回调中应包含该信息
        corpId: undefined, //企业id
        // max: 10,// multiple ? 10 : undefined, //人数限制，当multiple为true才生效，可选范围1-1500
        onSuccess: function(data: any) {
          onChange && onChange(data.map((item: any) => ({ value: item.emplId, label: item.name })));
        },
        onFail : function(err: any) {
          showMessage('钉钉选人接口调用失败', err);
        }
      }); 
    })
  }

  const remove = (removedItem: any, e: any) => {
    e.stopPropagation();
    onChange && onChange(value.filter(item => item !== removedItem));
  }

  return (
    <div className={styles.contact_choose} onClick={onClick}>
      {
        value.length ? (value || []).map((item, index) => {
          return (
            <div className={styles.contact_choose_item} key={item.value || index}>
              {item.label}
              <span onClick={(e: any) => { remove(item, e) }}>
                <IconContext.Provider value={{ className: styles.contact_choose_icon }}>
                  <AiOutlineCloseCircle />
                </IconContext.Provider>
              </span>
            </div>
          );
        }) : ''
      }
      <div style={{clear: 'both', marginBottom: '3px'}}></div>
    </div>
  );
};

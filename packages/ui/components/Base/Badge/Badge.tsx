import {
  BaseHTMLAttributes,
} from 'react';
import './badge.scss';

export type BadgeCustomAttributes = {
  type?: 'default' | 'success'
};

export const Badge = (props: BaseHTMLAttributes<HTMLDivElement> & BadgeCustomAttributes) => {
  const { children } = props;
  return <div className=" badge " {...props} >{children}</div>;
};

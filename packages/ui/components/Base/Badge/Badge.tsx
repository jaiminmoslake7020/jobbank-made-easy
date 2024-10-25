import {
  BaseHTMLAttributes,
} from 'react';
import './badge.scss';

export type BadgeCustomAttributes = {
  type?: 'default' | 'success',
  contentEditable?: 'inherit' | boolean,
  className?: string
};

export const Badge = (props: BaseHTMLAttributes<HTMLDivElement> & BadgeCustomAttributes) => {
  const { children, className } = props;
  return <div {...props} className={` badge ${className || ''} `}   >{children}</div>;
};

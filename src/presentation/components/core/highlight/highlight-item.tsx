import classNames from 'classnames';
import { FC } from 'react';

import { highlightItemStyle } from './styles/highlight-item.css';
import { HighlightItemProps } from './types';

export const HighlightItem: FC<HighlightItemProps> = (props) => {
  const { children, className, ...rest } = props;
  const classes = classNames(highlightItemStyle, className);

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

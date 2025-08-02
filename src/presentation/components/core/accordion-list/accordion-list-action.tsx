import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import { FC } from 'react';

import { accordionListActionStyle } from './styles/accordion-list-action.css';
import { AccordionListActionProps } from './types';

export const AccordionListAction: FC<AccordionListActionProps> = (props) => {
  const { children, className, asChild, ...rest } = props;
  const classes = classNames(accordionListActionStyle, className);

  const Component = asChild ? Slot : 'button';

  return (
    <Component {...rest} className={classes}>
      {children}
    </Component>
  );
};

'use client';

import classNames from 'classnames';
import { FC } from 'react';

import { useActivedItemContext } from './contexts/active-item-context';
import { useItemContext } from './contexts/item-context';
import { accordionContentRecipe } from './styles/accordion-content-recipe.css';
import { AccordionContentProps } from './types';

export const AccordionContent: FC<AccordionContentProps> = (props) => {
  const { children, className, ...rest } = props;
  const { activedItemID } = useActivedItemContext();
  const { itemID } = useItemContext();
  const opened = activedItemID === itemID;

  const classes = classNames(
    accordionContentRecipe({
      opened,
    }),
    className,
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

'use client';

import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import { FC, useCallback } from 'react';

import { toggleTriggerRecipe } from './styles/toggle-trigger-recipe.css';
import { ToggleTriggerProps } from './types';

export const ToggleTrigger: FC<ToggleTriggerProps> = (props) => {
  const { children, className, enabled, setEnabled, asChild, ...rest } = props;
  const classes = classNames(
    toggleTriggerRecipe({
      enabled,
    }),
    className,
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, [setEnabled]);

  const Component = asChild ? Slot : 'button';

  return (
    <Component {...rest} type='button' className={classes} onClick={toggle}>
      {children}
    </Component>
  );
};

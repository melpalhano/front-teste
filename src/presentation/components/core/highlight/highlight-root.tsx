import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import { FC } from 'react';

import { highlightRootRecipe } from './styles/highlight-root-recipe.css';
import { HighlightRootProps } from './types';

export const HighlightRoot: FC<HighlightRootProps> = (props) => {
  const { children, className, highlighted, status, asChild, ...rest } = props;
  const classes = classNames(
    highlightRootRecipe({
      highlighted,
      status,
    }),
    className,
  );

  const Component = asChild ? Slot : 'div';

  return (
    <Component {...rest} className={classes}>
      {children}
    </Component>
  );
};

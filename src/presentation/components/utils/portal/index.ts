import { usePortal as usePortalContext } from './contexts/portal-context';
import { PortalClose } from './portal-close';
import { PortalProvider } from './portal-provider';
import { PortalTrigger } from './portal-trigger';
import { PortalViewport } from './portal-viewport';

export const Portal = {
  Provider: PortalProvider,
  Trigger: PortalTrigger,
  Viewport: PortalViewport,
  Close: PortalClose,
};

export const usePortal = usePortalContext;

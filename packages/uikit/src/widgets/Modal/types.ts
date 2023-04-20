import { BoxProps } from "../../components/Box";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;
export type HandlerArgs = (args?: any) => void;

export interface InjectedProps {
  dataModal?: any;
  onDismiss?: Handler;
  mode?: string;
}

export interface ModalProps extends InjectedProps, Omit<BoxProps, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
}

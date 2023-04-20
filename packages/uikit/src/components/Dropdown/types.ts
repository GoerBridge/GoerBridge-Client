export type Position = "top" | "top-right" | "top-left" | "bottom";

export interface PositionProps {
  position?: Position;
}

export interface DropdownProps extends PositionProps {
  target: React.ReactElement;
}

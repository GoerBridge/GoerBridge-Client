import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Box, Flex } from "../../../../components/Box";
import { UserMenuProps } from "./types";
import { UserMenuItem } from "./styles";
import { useMatchBreakpoints } from "../../../../contexts";

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background: #111b1e;
  border-radius: 12px;
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.mediaQueries.sm} {
    left: 0;
    transform: unset;
  }

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  border-radius: 8px;
`;

const UserMenu: React.FC<UserMenuProps> = ({ overlay, children, disabled, placement = "bottom-end", ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isMobile } = useMatchBreakpoints();
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const showDropdownMenu = () => {
      if (!isMobile) {
        setIsOpen(true);
      }
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [isMobile, targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex position="relative" alignItems="center" ref={setTargetRef} {...props}>
      <div onClick={() => setIsOpen((s) => !s)} role="presentation">
        {children}
      </div>
      {!disabled && (
        <Menu isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{overlay?.({ isOpen })}</Box>
        </Menu>
      )}
    </Flex>
  );
};

export default UserMenu;

import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { MotionBox } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const mobileFooterHeight = 73;

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
  // border-bottom: 2px solid #383e48;
  display: flex;
  padding: 24px 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ background }) => background || "transparent"};
    padding: 24px;
  }
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(90vh - ${mobileFooterHeight}px);
  padding: 24px 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    max-height: 90vh;
    padding: 24px;
  }
`;

export const ModalCloseButton: React.FC<React.PropsWithChildren<{ onDismiss: ModalProps["onDismiss"] }>> = ({
  onDismiss,
}) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<React.PropsWithChildren<{ onBack: ModalProps["onBack"] }>> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(MotionBox)<{ $maxWidth: string }>`
  overflow: hidden;
  background: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: absolute;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "360px"};
  bottom: 0;
  min-height: 300px;

  ${({ theme }) => theme.mediaQueries.sm} {
    /* border: 1px solid rgba(0, 128, 55, 0.5); */
    box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    position: auto;
    bottom: auto;
    max-height: 100vh;
  }
`;

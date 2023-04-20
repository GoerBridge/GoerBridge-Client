import React, { useRef } from "react";
import { useTheme } from "styled-components";
import Heading from "../../components/Heading/Heading";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from "./styles";
import { ModalProps } from "./types";
import { useMatchBreakpoints } from "../../contexts";
import { Flex } from "../../components/Box";
import { Text } from "../../components/Text";

export const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300;

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  title,
  description,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
  headerBackground = "transparent",
  maxWidth = "320px",
  ...props
}) => {
  const theme = useTheme();
  const { isMobile } = useMatchBreakpoints();
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    // @ts-ignore
    <ModalContainer
      drag={isMobile ? "y" : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = "none";
      }}
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss();
      }}
      ref={wrapperRef}
      $maxWidth={maxWidth}
      {...props}
    >
      <ModalHeader background={getThemeValue(theme, `colors.${headerBackground}`, headerBackground)}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Flex flexDirection="column">
            <Heading>{title}</Heading>
            {description && (
              <Text color="#F98C36" fontSize="16px" mt="8px">
                {description}
              </Text>
            )}
          </Flex>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;

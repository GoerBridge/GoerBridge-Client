import styled from 'styled-components'

export const StyledHome = styled.div`
  padding-bottom: 32px;
`
export const CardBridgeTransfer = styled.div`
  width: 100%;
  max-width: 630px;
  margin: 0 auto 48px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(218 220 223);
  border-radius: 16px;
  .head {
    padding: 24px 16px;
    border-bottom: 1px solid #383e48;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 24px;
    }

    h1 {
      font-weight: 700;
      font-size: 20px;
      line-height: 140%;
      text-align: center;
      color: #ffffff;
      margin-bottom: 8px;
    }

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      text-align: center;
      color: #f98c36;
    }
  }

  .content {
    padding: 24px 16px;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 24px;
    }

    .btn-max {
      color: #f98c36;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;

      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;

      width: 63px;
      height: 27px;
      margin-left: 10px;
      background: #111b1e;
      border: unset;
      box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
      border-radius: 8px;
      cursor: pointer;

      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 16px;
      }
    }

    .wrap-input-item {
      > div > div:last-child {
        width: 100%;
      }
      /* margin-bottom: 12px;
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-bottom: 32px;
      } */
    }
  }
  .form-action {
    width: 100%;
    margin-top: 32px;
    button {
      width: 100%;
      height: 44px;
      font-size: 14px;
      background: #052c83;
      // box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
      border-radius: 8px;

      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 16px;
      }
    }

    button:disabled {
      background: #e0e0eb;
      color: rgb(143, 155, 179);
    }
  }
`
export const RightInputButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;

  min-width: 50px;
  height: 36px;

  background: transparent;
  box-shadow: none;
  border-radius: 8px;
  border: unset;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 44px;
    padding: 4px 16px;
  }

  > div {
    white-space: nowrap;

    > svg {
      width: 1px;
      path {
        stroke: #000;
      }
      ${({ theme }) => theme.mediaQueries.sm} {
        width: auto;
      }
    }
  }

  .wIcon {
    margin-right: 6px;
    width: 24px;
    height: 24px;

    ${({ theme }) => theme.mediaQueries.sm} {
      width: 20px;
      height: 20px;
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    > svg {
      width: 100%;
    }
  }
  .jPoDQE {
    width: 15px;
    height: 15px;
    opacity: 0.5;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 15px;
      height: 15px;
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    > svg {
      width: 100%;
    }
  }
`
export const NetworkSelectContentStyle = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .network-item {
    align-items: center;
    border: 0;
    /* background: transparent; */
    color: ${({ theme }) => theme.colors.textSubtle};
    cursor: pointer;
    display: flex;
    font-size: 16px;
    height: 48px;
    justify-content: space-between;
    outline: 0;
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;

    background: #000000;
    border-radius: 12px;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }

    &:active:not(:disabled) {
      opacity: 0.85;
      transform: translateY(1px);
    }
  }
`
export const CurrenciesSelectContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  .curr-item {
    align-items: center;
    border: 0;
    /* background: transparent; */
    color: ${({ theme }) => theme.colors.textSubtle};
    cursor: pointer;
    display: flex;
    font-size: 16px;
    height: 48px;
    justify-content: space-between;
    outline: 0;
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;

    background: #edf1f7;
    border-radius: 12px;

    &:hover:not(:disabled) {
      // background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    }

    &:active:not(:disabled) {
      opacity: 0.85;
      transform: translateY(1px);
      // background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    }

    img {
      width: 28px;
      height: 28px;
    }
  }
`

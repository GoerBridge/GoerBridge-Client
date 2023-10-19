import styled from 'styled-components'

export const StyledHome = styled.div`
  padding-bottom: 32px;
`
export const CardBridgeTransfer = styled.div`
  width: 100%;
  max-width: 630px;
  margin: 0 auto;
  background: #111b1e;
  border: 1px solid rgba(0, 128, 55, 0.5);
  border-radius: 12px;

  .head {
    padding: 24px;
    border-bottom: 1px solid #383e48;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-weight: 700;
      font-size: 20px;
      line-height: 140%;
      text-align: center;
      color: #ffffff;
      margin-bottom: 6px;
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
    padding: 24px;

    .btn-max {
      color: #f98c36;
      font-weight: 600;
      font-size: 16px;
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
      // box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
      border-radius: 8px;
      cursor: pointer;
    }

    .wrap-input-item {
      /* margin-bottom: 12px;
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-bottom: 32px;
      } */
    }
  }
  .form-action {
    width: 100%;
    margin-top: 24px;
    button {
      width: 100%;
      height: 44px;
      background: #008037;
      // box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
      border-radius: 8px;
    }
  }
`
export const RightInputButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  gap: 8px;

  min-width: 50px;
  height: 44px;

  background: #008037;
  // box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;
  border-radius: 8px;
  border: unset;

  .wIcon {
    width: 24px;
    height: 24px;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 28px;
      height: 28px;
    }
  }
  img {
    width: 100%;
    height: auto;
  }
`
export const NetworkSelectContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
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

    background: #000000;
    border-radius: 12px;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }

    &:active:not(:disabled) {
      opacity: 0.85;
      transform: translateY(1px);
    }

    img {
      width: 28px;
      height: 28px;
    }
  }
`

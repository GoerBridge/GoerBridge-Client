import { createAction } from '@reduxjs/toolkit'

export const setOwner = createAction<{ owner: string }>('admin/owner')
export const getAddressDetail = createAction<any>('admin/getAddressDetail')

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isEqual } from 'utils'
import { ObjectUtils } from 'utils/object.utils'

const moduleConfig = [
  {
    key: 'en-US',
    label: 'ENG',
    isActive: true,
  },
  // {
  //     key: ELocale.CHINA,
  //     label: 'CN',
  //     isActive: true,
  // }
]

export const useForm = (configs) => {
  const initialValues = {}
  const validationSchema = {}
  const locales = moduleConfig

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await configs.onSubmit(values, getDirtyFields())
      if (configs.onSuccess) configs.onSuccess(response)
      setSubmitting(false)
    } catch (error: any) {
      setErrors(error.errors || {})
      setSubmitting(false)
    }
  }

  const structure = configs.structure.reduce((output: any, item: any) => {
    output[item.name] = {
      ...item,
      defaultValue: typeof item.defaultValue !== 'undefined' ? item.defaultValue : '',
      isDisabled: typeof item.isDisabled === 'boolean' ? item.isDisabled : false,
      isVisible: typeof item.isVisible === 'boolean' ? item.isVisible : true,
    }

    // Default Values
    if (typeof item.defaultValue !== 'undefined') initialValues[item.name] = item.defaultValue
    else if (item.isMutilLocale) initialValues[item.name] = {}
    else initialValues[item.name] = ''

    // Validates
    if (typeof item.validate !== 'undefined') {
      if (item.isMutilLocale && locales.length > 0) {
        validationSchema[item.name] = Yup.object().shape(
          locales.reduce((output: any, i) => {
            output[i.key] = item.validate
            return output
          }, {}),
        )
      } else validationSchema[item.name] = item.validate
    }

    return output
  }, {})

  const formState = useFormik({
    enableReinitialize: !!configs.enableReinitialize,
    initialValues,
    validationSchema: Yup.object().shape(validationSchema),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: false,
  })

  const getDirtyFields = () => {
    return Object.keys(formState.values).reduce((output = {}, key) => {
      if (!isEqual(formState.values[key], initialValues[key])) output[key] = formState.values[key]
      return output
    }, {})
  }

  if (configs.isDebug) console.log('Form debug: ', formState)

  return {
    getInputProps: (name) => {
      if (!structure[name]) throw Error(`Cannot find structureItem with name:${name}`)
      return {
        name,
        value: ObjectUtils.getIn(formState.values, name, '', undefined),
        defaultValue: initialValues[name],
        isDisabled: structure[name].isDisabled || formState.isSubmitting,
        error: ObjectUtils.getIn(formState.touched, name, false, undefined)
          ? ObjectUtils.getIn(formState.errors, name, '', undefined)
          : null,
        onChange: (value) => (formState.isSubmitting ? value : formState.setFieldValue(name, value)),
        onTouched: (status = true) => formState.setFieldTouched(name, status),
        getValue: (name) => formState.values[name],
        locales,
        isMutilLocale: structure[name].isMutilLocale,
        label: structure[name].label,
        description: structure[name].description,
      }
    },
    handleSubmit: (e) => {
      if (e) e.preventDefault()
      formState.handleSubmit()
    },
    isSubmitting: formState.isSubmitting,
    getValue: (name) => formState.values[name],
    setValues: (values) => formState.setValues({ ...formState.values, ...values }),
    setErrors: (errors) => {
      formState.setErrors({ ...formState.errors, ...errors })
      formState.setTouched({
        ...formState.touched,
        ...Object.keys(errors).reduce((output, key) => {
          output[key] = true
          return output
        }, {}),
      })
    },
    values: formState.values,
    getDirtyFields,
  }
}

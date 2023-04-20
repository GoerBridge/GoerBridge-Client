import { toPascalCase } from 'utils/pascalCase'
import { useRouterPath } from './useRouterPath'

export const useBreadcrumbsPath = () => {
  const route = useRouterPath()
  const removeQuestionMark = route.replace(/\?.*$/g, '')
  const removeEquals = removeQuestionMark.replace(/\\=/g, '/')

  const pathToPascalCase = toPascalCase(removeEquals)

  return pathToPascalCase.split('/')
}

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function PageTitle() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('title') + ' 💳💸🧮🇭🇰'
  }, [t, i18n.language])

  return null
}

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function PageTitle() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('title') + ' 💳💸🧮🇭🇰'
  }, [t, i18n.language])

  return null
}

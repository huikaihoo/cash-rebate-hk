import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      title: 'Cash Rebate Calculator',
      disclaimer: {
        title: 'Disclaimer',
        content:
          'The results are for reference only. Please refer to official documents for details. No legal responsibility is assumed for any errors, omissions, or damages arising from the use, inability to use, or reliance on this information.',
      },
      type: {
        online: 'Online',
        physical: 'Physical',
        overseas: 'Overseas',
      },
      filter: {
        title: 'Filter',
        category: 'Shop Category',
        name: 'Shop Name',
        location: 'Location',
        amount: 'Amount',
        placeholder: {
          name: 'Search for shop ...',
          location: 'Search for location ...',
        },
        emptyText: {
          name: 'No shop found.',
          location: 'No location found.',
        },
      },
      categories: {
        any: '(Any)',
        supermarket: 'Supermarket',
        departmentStore: 'Department Store',
        restaurant: 'Restaurant',
        hotel: 'Hotel',
        electronicAppliance: 'Electronic Appliance',
        travel: 'Travel',
        transportation: 'Transportation',
        entertainment: 'Entertainment',
      },
    },
  },
  // zh-hk
  zh: {
    translation: {
      title: '現金回贈計算機',
      disclaimer: {
        title: '免責聲明',
        content:
          '結果僅供參考，詳情請參閱官方文件。對於任何錯誤、遺漏，或因使用、無法使用或依賴該資訊而引起的損失，概不承擔法律責任。',
      },
      type: {
        online: '網上',
        physical: '實體',
        overseas: '海外',
      },
      filter: {
        title: '篩選',
        category: '商店類別',
        name: '商店名稱',
        location: '地點',
        amount: '金額',
        placeholder: {
          name: '搜尋商店 ...',
          location: '搜尋地點 ...',
        },
        emptyText: {
          name: '未找到商店',
          location: '未找到地點',
        },
      },
      categories: {
        any: '(任何)',
        supermarket: '超級市場',
        departmentStore: '百貨公司',
        restaurant: '餐廳',
        hotel: '酒店',
        electronicAppliance: '電器',
        travel: '旅遊',
        transportation: '交通',
        entertainment: '娛樂',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: {
      hk: ['zh'],
      tw: ['zh'],
      cn: ['zh'],
      hant: ['zh'],
      hans: ['zh'],
      default: ['en'],
    },
    load: 'languageOnly', // Normalize values like "en-US" to "en"
    detection: {
      lookupQuerystring: 'lang',
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  })

export default i18n

import Main from "~/components/main"
import { DictionaryProvider } from "~/lib/i18n"
import { Locale } from "~/lib/i18n/config"
import { getDictionary } from "~/lib/i18n/dictionary"

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang)

  return (
    <DictionaryProvider value={dictionary}>
      <Main />
    </DictionaryProvider>
  )
}

export default Page

import { QrCode } from "@ark-ui/react"
import env from "~/lib/env"

export const EndingContent = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-center font-hand pointer-events-auto">
      <h1 className="text-4xl tracking-wide mb-12">Grazie per aver utilizzato Sketchlagoon!</h1>
      <p className="text-xl mb-12">
        Ti è piaciuta la demo? Scansiona il QR code per lasciare un tuo feedback anonimo.
        <br /> Bastano pochi minuti del tuo tempo per aiutarci a migliorare l'esperienza!
      </p>
      <div className="bg-white p-2 rounded-xl border-2 border-black">
        <QrCode.Root value={env.NEXT_PUBLIC_QUESTIONNAIRE_URL ?? ""} className="h-48 w-48">
          <QrCode.Frame>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode.Root>
      </div>
      <button className="text-4xl absolute-center-x bottom-6" onClick={() => location.reload()}>
        ↺
      </button>
    </div>
  )
}

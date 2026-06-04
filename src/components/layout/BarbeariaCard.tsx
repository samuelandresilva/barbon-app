import type { Barbearia } from '../../types'
import { formatBrazilianPhone } from "../../utils/formatPhone"
import { getInitials } from '../../utils/getInitials'
import { hasValidImageUrl } from '../../utils/hasValidImageUrl'
import { createGoogleMapsHref, createInstagramHref, createPhoneHref } from '../../utils/linkUtils'
import { FaInstagram } from "react-icons/fa"
import { FaClock, FaPhone, FaLocationDot } from "react-icons/fa6"

interface BarbeariaCardProps {
  barbearia: Barbearia
}

export function BarbeariaCard({ barbearia }: BarbeariaCardProps) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[#f3d4dc] bg-white shadow-2xl shadow-[#3f3437]/10"
      aria-label="Informações do salão"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.12),transparent_35%)]" />

      <div className="relative p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#c97891]">
          Sua próxima experiência começa aqui
        </p>

        <div className="flex items-center gap-4">
          {hasValidImageUrl(barbearia.logoUrl) ? (
            <img
              src={barbearia.logoUrl}
              alt={`Logo da ${barbearia.nome}`}
              className="size-20 shrink-0 rounded-2xl border border-[#f3d4dc] object-cover shadow-lg shadow-[#3f3437]/10 sm:size-24"
            />
          ) : (
            <div
              className="grid size-20 shrink-0 place-items-center rounded-2xl border border-[#f3d4dc] bg-[#fff7f8] text-xl font-black text-[#c97891] sm:size-24"
              aria-hidden="true"
            >
              {getInitials(barbearia.nome)}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-2xl font-black tracking-tight text-[#3f3437] sm:text-3xl">
              {barbearia.nome}
            </h2>

            {barbearia.descricao ? (
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#7b666d]">
                {barbearia.descricao}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 h-px bg-gradient-to-r from-[#e8bdca] via-[#f8e7ed] to-transparent" />

        <dl className="mt-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#f8e7ed] text-[#c97891]">
              <FaPhone className="size-4 text-[#c97891]" />
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-[#b98a99]">
                Telefone
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-[#3f3437]">
                <a
                  href={createPhoneHref(barbearia.telefoneWhatsapp)}
                  className="text-sm font-semibold text-[#3f3437] underline-offset-4 transition hover:text-[#b66f87] hover:underline"
                  aria-label={`Ligar para ${barbearia.nome}`}
                >
                  {formatBrazilianPhone(barbearia.telefoneWhatsapp)}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#f8e7ed] text-[#c97891]">
              <FaLocationDot className="size-4 text-[#c97891]" />
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-[#b98a99]">
                Endereço
              </dt>
              <dd className="mt-0.5 text-sm font-semibold leading-5 text-[#3f3437]">
                <a
                  href={createGoogleMapsHref(barbearia.endereco)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold leading-5 text-[#3f3437] underline-offset-4 transition hover:text-[#b66f87] hover:underline"
                  aria-label={`Abrir endereço da ${barbearia.nome} no Google Maps`}
                >
                  {barbearia.endereco}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#f8e7ed] text-[#c97891]">
              <FaInstagram className="size-4 text-[#c97891]" />
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-[#b98a99]">
                Instagram
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-[#3f3437]">
                <a
                  href={createInstagramHref(barbearia.instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#3f3437] underline-offset-4 transition hover:text-[#b66f87] hover:underline"
                  aria-label={`Abrir Instagram da ${barbearia.nome}`}
                >
                  {barbearia.instagram.startsWith("@")
                    ? barbearia.instagram
                    : `@${barbearia.instagram.replace("https://www.instagram.com/", "").replace("/", "")}`}
                </a>
              </dd>
            </div>
          </div>

          {barbearia.funcionamento ? (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#f8e7ed] text-[#c97891]">
                <FaClock className="size-4 text-[#c97891]" />
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-bold uppercase tracking-widest text-[#b98a99]">
                  Funcionamento
                </dt>
                <dd className="mt-0.5 whitespace-pre-line text-sm font-semibold leading-5 text-[#3f3437]">
                  {barbearia.funcionamento}
                </dd>
              </div>
            </div>
          ) : null}
        </dl>
      </div >
    </section >
  )
}

import type { DadosEmpresa } from '../../types'
import { formatBrazilianPhone } from "../../utils/formatPhone"
import { getInitials } from '../../utils/getInitials'
import { hasValidImageUrl } from '../../utils/hasValidImageUrl'
import { createGoogleMapsHref, createInstagramHref, createPhoneHref } from '../../utils/linkUtils'
import { FaInstagram } from "react-icons/fa"
import { FaClock, FaPhone, FaLocationDot } from "react-icons/fa6"

interface DadosEmpresaCardProps {
  dadosEmpresa: DadosEmpresa
}

export function DadosEmpresaCard({ dadosEmpresa }: DadosEmpresaCardProps) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-[color:var(--color-shadow)]"
      aria-label="Informações do salão"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-hero-glow),transparent_35%)]" />

      <div className="relative p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-primary-hover)]">
          Sua próxima experiência começa aqui
        </p>

        <div className="flex items-center gap-4">
          {hasValidImageUrl(dadosEmpresa.logoUrl) ? (
            <img
              src={dadosEmpresa.logoUrl}
              alt={`Logo da ${dadosEmpresa.nome}`}
              className="size-20 shrink-0 rounded-2xl border border-[var(--color-border)] object-cover shadow-lg shadow-[color:var(--color-shadow)] sm:size-24"
            />
          ) : (
            <div
              className="grid size-20 shrink-0 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] text-xl font-black text-[var(--color-primary-hover)] sm:size-24"
              aria-hidden="true"
            >
              {getInitials(dadosEmpresa.nome)}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-2xl font-black tracking-tight text-[var(--color-text)] sm:text-3xl">
              {dadosEmpresa.nome}
            </h2>

            {dadosEmpresa.descricao ? (
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--color-muted)]">
                {dadosEmpresa.descricao}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 h-px bg-gradient-to-r from-[var(--color-border-hover)] via-[var(--color-secondary)] to-transparent" />

        <dl className="mt-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-secondary)] text-[var(--color-primary-hover)]">
              <FaPhone className="size-4 text-[var(--color-primary-hover)]" />
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-label)]">
                Telefone
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">
                <a
                  href={createPhoneHref(dadosEmpresa.telefoneWhatsapp)}
                  className="text-sm font-semibold text-[var(--color-text)] underline-offset-4 transition hover:text-[var(--color-accent)] hover:underline"
                  aria-label={`Ligar para ${dadosEmpresa.nome}`}
                >
                  {formatBrazilianPhone(dadosEmpresa.telefoneWhatsapp)}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-secondary)] text-[var(--color-primary-hover)]">
              <FaLocationDot className="size-4 text-[var(--color-primary-hover)]" />
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-label)]">
                Endereço
              </dt>
              <dd className="mt-0.5 text-sm font-semibold leading-5 text-[var(--color-text)]">
                <a
                  href={createGoogleMapsHref(dadosEmpresa.endereco)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold leading-5 text-[var(--color-text)] underline-offset-4 transition hover:text-[var(--color-accent)] hover:underline"
                  aria-label={`Abrir endereço da ${dadosEmpresa.nome} no Google Maps`}
                >
                  {dadosEmpresa.endereco}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-secondary)] text-[var(--color-primary-hover)]">
              <FaInstagram className="size-4 text-[var(--color-primary-hover)]" />
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-label)]">
                Instagram
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">
                <a
                  href={createInstagramHref(dadosEmpresa.instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[var(--color-text)] underline-offset-4 transition hover:text-[var(--color-accent)] hover:underline"
                  aria-label={`Abrir Instagram da ${dadosEmpresa.nome}`}
                >
                  {dadosEmpresa.instagram.startsWith("@")
                    ? dadosEmpresa.instagram
                    : `@${dadosEmpresa.instagram.replace("https://www.instagram.com/", "").replace("/", "")}`}
                </a>
              </dd>
            </div>
          </div>

          {dadosEmpresa.funcionamento ? (
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-secondary)] text-[var(--color-primary-hover)]">
                <FaClock className="size-4 text-[var(--color-primary-hover)]" />
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-label)]">
                  Funcionamento
                </dt>
                <dd className="mt-0.5 whitespace-pre-line text-sm font-semibold leading-5 text-[var(--color-text)]">
                  {dadosEmpresa.funcionamento}
                </dd>
              </div>
            </div>
          ) : null}
        </dl>
      </div >
    </section >
  )
}

import {useMemo, useState} from 'react';
import {
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Download,
  Expand,
  FileText,
  Instagram,
  Mail,
  MessageCircle,
} from 'lucide-react';
import {LightboxModal} from './components/LightboxModal';
import {ResilientImage} from './components/ResilientImage';
import {
  ACHIEVEMENTS,
  CERTIFICATES,
  HERO_METRICS,
  INTERNSHIP,
  ORGANIZATIONS,
  PROFILE,
  type GalleryPhoto,
} from './data/portfolioData';

type OrgFilter =
  | 'Semua'
  | 'Kepemimpinan'
  | 'Keuangan & Administrasi'
  | 'Pendidikan & Keilmuan';

const ORG_FILTERS: OrgFilter[] = [
  'Semua',
  'Kepemimpinan',
  'Keuangan & Administrasi',
  'Pendidikan & Keilmuan',
];

export default function App() {
  const [orgFilter, setOrgFilter] = useState<OrgFilter>('Semua');
  const [heroPhotoMode, setHeroPhotoMode] = useState<'award' | 'podium'>('award');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Lightbox state storing the current collection and active index
  const [lightboxPhotos, setLightboxPhotos] = useState<GalleryPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredOrganizations = useMemo(() => {
    if (orgFilter === 'Semua') return ORGANIZATIONS;
    return ORGANIZATIONS.filter((item) => item.focus === orgFilter);
  }, [orgFilter]);

  const openLightbox = (photos: GalleryPhoto[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contacts.emailDisplay);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = PROFILE.contacts.emailUrl;
    }
  };

  const activeHeroPhoto =
    heroPhotoMode === 'award' ? PROFILE.heroPortrait : PROFILE.podiumPhoto;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111827]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAFAF8]/92 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#beranda"
            className="font-display text-lg font-bold tracking-tight text-[#111827] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
          >
            {PROFILE.name}
          </a>

          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4B5563]"
          >
            <a
              href="#pengalaman"
              className="hover:text-[#111827] hover:underline underline-offset-4 decoration-[#0F5132] transition-colors whitespace-nowrap shrink-0"
            >
              Pengalaman
            </a>
            <a
              href="#organisasi"
              className="hover:text-[#111827] hover:underline underline-offset-4 decoration-[#0F5132] transition-colors whitespace-nowrap shrink-0"
            >
              Organisasi
            </a>
            <a
              href="#prestasi"
              className="hover:text-[#111827] hover:underline underline-offset-4 decoration-[#0F5132] transition-colors whitespace-nowrap shrink-0"
            >
              Prestasi
            </a>
            <a
              href="#sertifikat"
              className="hover:text-[#111827] hover:underline underline-offset-4 decoration-[#0F5132] transition-colors whitespace-nowrap shrink-0"
            >
              Sertifikat
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <a
              href="#kontak"
              className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#0F5132] hover:bg-[#0B3D26] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
            >
              Hubungi Saya
            </a>
          </div>
        </div>
      </header>

      <main id="beranda">
        {/* Section 1: Split-Screen Editorial Hero */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="text-xs sm:text-sm font-medium text-[#0F5132]">
                  {PROFILE.discipline} <span aria-hidden="true">·</span> {PROFILE.origin}
                </p>

                <h1 className="font-display text-[clamp(2.15rem,4vw,3.45rem)] font-bold leading-[1.08] tracking-tight text-[#111827] text-balance">
                  {PROFILE.headline}
                </h1>

                <p className="text-base sm:text-[17px] leading-[1.65] text-[#374151] max-w-[62ch]">
                  {PROFILE.lead}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#kontak"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F5132] hover:bg-[#0B3D26] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                  >
                    <span>Hubungi Abdul Wafi</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href={PROFILE.pdfPath}
                    download="Portofolio-Abdul-Wafi.pdf"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#111827] bg-white border border-[#D1D5DB] hover:border-[#0F5132] hover:text-[#0F5132] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Unduh Portofolio PDF</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#4B5563]">
                  <span>Lahir: {PROFILE.birthInfo}</span>
                  <span aria-hidden="true">·</span>
                  <span>Fokus: Administrasi Perkantoran, Akuntansi Syariah &amp; Public Speaking</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full-height Visual Portrait Anchor */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative flex-1 min-h-[380px] lg:min-h-[450px] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#EFEFE9] group">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox([PROFILE.heroPortrait, PROFILE.podiumPhoto], heroPhotoMode === 'award' ? 0 : 1)
                  }
                  aria-label={`Perbesar foto: ${activeHeroPhoto.caption}`}
                  className="block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                >
                  <ResilientImage
                    src={activeHeroPhoto.src}
                    alt={activeHeroPhoto.alt}
                    fallbackTitle={activeHeroPhoto.caption}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
                    <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Perbesar</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <p className="text-xs text-white/75 mb-1">
                      {activeHeroPhoto.category}
                    </p>
                    <p className="text-sm font-medium leading-snug text-white">
                      {activeHeroPhoto.caption}
                    </p>
                  </div>
                </button>
              </div>

              <div
                role="tablist"
                aria-label="Pilih foto profil utama"
                className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-[#EFEFE9] border border-[#E5E7EB]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={heroPhotoMode === 'award'}
                  onClick={() => setHeroPhotoMode('award')}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
                    heroPhotoMode === 'award'
                      ? 'bg-white text-[#111827] shadow-xs'
                      : 'text-[#4B5563] hover:text-[#111827]'
                  }`}
                >
                  Apresiasi Nasional
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={heroPhotoMode === 'podium'}
                  onClick={() => setHeroPhotoMode('podium')}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
                    heroPhotoMode === 'podium'
                      ? 'bg-white text-[#111827] shadow-xs'
                      : 'text-[#4B5563] hover:text-[#111827]'
                  }`}
                >
                  Podium Ketua SEMA
                </button>
              </div>
            </div>
          </div>

          {/* 4-Column Quantitative Proof Strip directly below Hero Split */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E7EB] rounded-2xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="p-5 sm:p-6 flex flex-col gap-1.5">
                <span className="font-mono text-base sm:text-lg font-medium tabular-nums text-[#0F5132]">
                  {metric.value}
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  {metric.label}
                </span>
                <span className="text-xs text-[#4B5563] leading-relaxed">
                  {metric.context}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="border-y border-[#E5E7EB] bg-[#F3F4F0] overflow-hidden py-3"
        >
          <div className="flex w-max animate-marquee whitespace-nowrap text-xs font-medium text-[#4B5563] tracking-wide">
            <span className="px-4">
              DPRD Kabupaten Situbondo · SEMA FEBI UIN KHAS Jember · PMII Rayon FEBI · GenBI Jember · Ikatan Mahasiswa Situbondo · HMPS Akuntansi Syariah · Ikatan Akuntan Indonesia · BNSP Public Speaking ·
            </span>
            <span className="px-4">
              DPRD Kabupaten Situbondo · SEMA FEBI UIN KHAS Jember · PMII Rayon FEBI · GenBI Jember · Ikatan Mahasiswa Situbondo · HMPS Akuntansi Syariah · Ikatan Akuntan Indonesia · BNSP Public Speaking ·
            </span>
          </div>
        </div>

        {/* Section 2: Pengalaman Magang */}
        <section
          id="pengalaman"
          className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#0F5132]">
                  01 · {INTERNSHIP.period}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] text-balance">
                  {INTERNSHIP.institution}
                </h2>
                <p className="font-serif-editorial italic text-lg text-[#374151]">
                  {INTERNSHIP.role}
                </p>
              </div>

              <p className="text-[15px] leading-[1.7] text-[#374151]">
                {INTERNSHIP.summary}
              </p>

              <ol className="space-y-4 pt-2 border-t border-[#E5E7EB]">
                {INTERNSHIP.duties.map((duty, idx) => (
                  <li key={duty} className="flex gap-4 text-[15px] leading-[1.65] text-[#1F2937]">
                    <span className="font-mono text-xs font-medium tabular-nums text-[#0F5132] pt-1 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Bento Gallery for DPRD Situbondo */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {INTERNSHIP.photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => openLightbox(INTERNSHIP.photos, idx)}
                  aria-label={`Lihat dokumentasi: ${photo.caption}`}
                  className={`group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#EFEFE9] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132] ${
                    idx === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={photo.src}
                    alt={photo.alt}
                    fallbackTitle={photo.caption}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
                    <p className="text-xs sm:text-sm font-medium text-white leading-snug line-clamp-2">
                      {photo.caption}
                    </p>
                    <Expand
                      className="w-4 h-4 text-white/80 shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Pengalaman Organisasi */}
        <section
          id="organisasi"
          className="border-t border-[#E5E7EB] bg-white py-16 sm:py-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-medium text-[#0F5132]">
                  02 · Rekam Jejak Organisasi
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] text-balance">
                  Lima Peran Strategis di Kampus &amp; Komunitas Daerah
                </h2>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="group"
                aria-label="Filter peran organisasi"
                className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#F3F4F0] border border-[#E5E7EB] self-start md:self-auto"
              >
                {ORG_FILTERS.map((filter) => {
                  const isActive = orgFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setOrgFilter(filter)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#111827] shadow-xs'
                          : 'text-[#4B5563] hover:text-[#111827]'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-[#E5E7EB] border-t border-[#E5E7EB]">
              {filteredOrganizations.map((org) => (
                <article
                  key={org.id}
                  className="py-10 first:pt-8 last:pb-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left: Editorial Prose & Responsibilities */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#4B5563]">
                      <span className="font-mono tabular-nums font-medium text-[#0F5132]">
                        {org.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#111827]">{org.role}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{org.highlightStat}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#111827] text-balance">
                      {org.organization}
                    </h3>

                    <p className="text-[15px] leading-[1.65] text-[#374151]">
                      {org.summary}
                    </p>

                    <ul className="space-y-2.5 pt-2">
                      {org.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-[1.65] text-[#374151]"
                        >
                          <span
                            aria-hidden="true"
                            className="text-[#0F5132] font-semibold select-none"
                          >
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Clickable Documentation Photo Grid */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                    {org.photos.map((photo, pIdx) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => openLightbox(org.photos, pIdx)}
                        aria-label={`Perbesar foto ${org.organization}: ${photo.caption}`}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F3F4F0] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                      >
                        <ResilientImage
                          src={photo.src}
                          alt={photo.alt}
                          fallbackTitle={photo.caption}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute bottom-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-md bg-black/65 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Prestasi Kuliah (Dark Editorial Showcase) */}
        <section
          id="prestasi"
          className="bg-[#0B1310] text-[#F9FAFB] py-16 sm:py-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/12 pb-8">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-medium tracking-wide text-[#F59E0B]">
                  03 · Prestasi Kuliah &amp; Kompetisi
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                  Pengakuan Akademik &amp; Presentasi Tingkat Nasional
                </h2>
              </div>
              <p className="text-sm text-white/75 max-w-sm leading-relaxed">
                Capaian forum ilmiah nasional FORNASMEBI dan kompetisi media kreatif tingkat universitas selama masa studi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Featured National Achievement */}
              {ACHIEVEMENTS.map((ach, idx) => (
                <article
                  key={ach.id}
                  className={`${
                    idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                  } rounded-2xl border border-white/12 bg-[#121D18] p-6 sm:p-8 flex flex-col justify-between gap-6`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/70">
                      <span className="font-mono tabular-nums text-[#F59E0B]">
                        {ach.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{ach.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{ach.year}</span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white text-balance">
                        {ach.title}
                      </h3>
                      <p className="text-sm font-medium text-white/80">
                        {ach.event}
                      </p>
                    </div>

                    <p className="text-sm sm:text-[15px] leading-[1.65] text-white/75 tracking-[0.01em]">
                      {ach.description}
                    </p>

                    {ach.reward && (
                      <div className="inline-flex items-center gap-2 text-xs font-mono tabular-nums text-[#FCD34D] pt-1">
                        <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{ach.reward}</span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`grid gap-3 ${
                      ach.photos.length > 1 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'
                    }`}
                  >
                    {ach.photos.map((photo, pIdx) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => openLightbox(ach.photos, pIdx)}
                        aria-label={`Perbesar bukti prestasi: ${photo.caption}`}
                        className={`group relative overflow-hidden rounded-xl border border-white/12 bg-black/40 cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                          ach.photos.length === 1 ? 'aspect-[4/3]' : 'aspect-[4/3]'
                        }`}
                      >
                        <ResilientImage
                          src={photo.src}
                          alt={photo.alt}
                          fallbackTitle={photo.caption}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute bottom-2.5 right-2.5 inline-flex items-center justify-center w-7 h-7 rounded-md bg-black/70 text-white">
                          <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Sertifikat Kompetensi */}
        <section
          id="sertifikat"
          className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
        >
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E7EB] pb-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-medium text-[#0F5132]">
                  04 · Sertifikasi Kompetensi &amp; Keahlian
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] text-balance">
                  Validasi Profesional Akuntansi, Syariah &amp; Komunikasi Publik
                </h2>
              </div>
              <p className="text-sm text-[#4B5563]">
                Klik sertifikat mana saja untuk memeriksa dokumen dalam resolusi penuh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATES.map((cert, idx) => (
                <article
                  key={cert.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        CERTIFICATES.map((c) => c.photo),
                        idx
                      )
                    }
                    aria-label={`Perbesar sertifikat ${cert.title}`}
                    className="group relative aspect-[4/3] w-full bg-[#F3F4F0] border-b border-[#E5E7EB] overflow-hidden p-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                  >
                    <ResilientImage
                      src={cert.photo.src}
                      alt={cert.photo.alt}
                      fallbackTitle={cert.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111827]/85 text-white text-xs font-medium">
                      <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Inspeksi Dokumen</span>
                    </span>
                  </button>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4B5563]">
                        <span className="font-mono tabular-nums font-medium text-[#0F5132]">
                          {cert.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{cert.competency}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold tracking-tight text-[#111827]">
                        {cert.title}
                      </h3>

                      <p className="text-sm text-[#374151]">{cert.issuer}</p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB] space-y-1 text-xs text-[#4B5563]">
                      <div className="flex items-center justify-between gap-4">
                        <span>Tanggal</span>
                        <span className="font-mono tabular-nums text-[#111827] text-right">
                          {cert.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Nomor Sertifikat</span>
                        <span className="font-mono tabular-nums text-[#111827] text-right">
                          {cert.regNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Keterangan</span>
                        <span className="text-[#111827] text-right">
                          {cert.locationOrNote}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Kontak & Dokumen */}
        <section
          id="kontak"
          className="border-t border-[#E5E7EB] bg-[#F3F4F0] py-16 sm:py-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-5">
                <p className="text-xs font-medium text-[#0F5132]">
                  05 · Kontak Langsung
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] text-balance">
                  Terbuka untuk Peluang Karier, Administrasi &amp; Akuntansi Syariah
                </h2>
                <p className="text-[15px] leading-[1.7] text-[#374151] max-w-[54ch]">
                  Hubungi Abdul Wafi secara langsung melalui WhatsApp, email, atau Instagram untuk kebutuhan rekrutmen staf administrasi, keuangan, maupun kolaborasi program kelembagaan.
                </p>

                <div className="pt-2">
                  <a
                    href={PROFILE.pdfPath}
                    download="Portofolio-Abdul-Wafi.pdf"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#0F5132] hover:bg-[#0B3D26] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Unduh Berkas Portofolio Lengkap (PDF)</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl border border-[#E5E7EB] bg-white divide-y divide-[#E5E7EB]">
                {/* WhatsApp */}
                <a
                  href={PROFILE.contacts.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-[#0F5132]/10 text-[#0F5132] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#4B5563]">WhatsApp</p>
                      <p className="font-mono text-base font-medium tabular-nums text-[#111827] truncate">
                        {PROFILE.contacts.whatsappDisplay}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-[#4B5563] group-hover:text-[#0F5132] transition-colors shrink-0"
                    aria-hidden="true"
                  />
                </a>

                {/* Email */}
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                  <a
                    href={PROFILE.contacts.emailUrl}
                    className="flex items-center gap-4 min-w-0 group flex-1"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#0F5132]/10 text-[#0F5132] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#4B5563]">Email</p>
                      <p className="text-base font-medium text-[#111827] group-hover:text-[#0F5132] transition-colors truncate">
                        {PROFILE.contacts.emailDisplay}
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Salin alamat email"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[#E5E7EB] hover:border-[#0F5132] text-[#374151] hover:text-[#0F5132] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#0F5132]" aria-hidden="true" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instagram */}
                <a
                  href={PROFILE.contacts.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-[#0F5132]/10 text-[#0F5132] flex items-center justify-center shrink-0">
                      <Instagram className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#4B5563]">Instagram</p>
                      <p className="text-base font-medium text-[#111827] truncate">
                        {PROFILE.contacts.instagramDisplay}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-[#4B5563] group-hover:text-[#0F5132] transition-colors shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E5E7EB] bg-[#FAFAF8] py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B5563]">
          <p>
            © {new Date().getFullYear()} Abdul Wafi — Portofolio Akuntansi Syariah &amp; Kepemimpinan.
          </p>
          <div className="flex items-center gap-6">
            <a href="#pengalaman" className="hover:text-[#111827] transition-colors">
              Pengalaman
            </a>
            <a href="#organisasi" className="hover:text-[#111827] transition-colors">
              Organisasi
            </a>
            <a href="#prestasi" className="hover:text-[#111827] transition-colors">
              Prestasi
            </a>
            <a href="#sertifikat" className="hover:text-[#111827] transition-colors">
              Sertifikat
            </a>
            <a href="#beranda" className="font-medium text-[#0F5132] hover:underline">
              Kembali ke Atas
            </a>
          </div>
        </div>
      </footer>

      <LightboxModal
        photos={lightboxPhotos}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onSelectIndex={setLightboxIndex}
      />
    </div>
  );
}

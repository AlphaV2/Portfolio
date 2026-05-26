import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowRight,
  MapPin,
} from 'lucide-react';

import { personalInfo } from '../data';

const whatsappNumber = personalInfo.phone.replace(/\D/g, '');
const profileImageSrc = '/images/profile.webp';

function openWhatsapp(message: string) {
  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export default function Sidebar() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((value) => !value);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside
      id="portfolio-sidebar"
      className="
        w-full
        lg:w-[21.5rem]
        shrink-0
        border-b
        lg:border-b-0
        lg:border-r
        border-white/10
        bg-[#06080B]
        flex
        flex-col
        justify-between
        p-4
        sm:p-5
        lg:p-5
        lg:h-screen
        sticky
        top-0
        z-40
        text-white
        overflow-hidden
        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,#050505_0%,#090909_42%,#030303_100%)]
      "
    >
      {/* TOP */}
      <div className="flex flex-col gap-4">

        {/* MAIN CARD */}
        <div
          className="
            rounded-[1.8rem]
            border
            border-white/10
            bg-[linear-gradient(180deg,#0A0A0A_0%,#111111_100%)]
            p-4
            shadow-[0_20px_50px_rgba(0,0,0,0.28)]
          "
        >

          {/* LOCATION */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span
              className={`h-2 w-2 rounded-full bg-white/80 transition-opacity duration-500 ${
                pulse ? 'opacity-50' : 'opacity-100'
              }`}
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/65">
              Hyderabad, India
            </span>
          </div>

          {/* PROFILE BLOCK */}
          <div
            className="
              relative
              mt-4
              overflow-hidden
              rounded-[1.7rem]
              border
              border-white/10
              bg-[linear-gradient(180deg,#090909_0%,#121212_100%)]
              p-4
            "
          >

            {/* ambient glow */}
            <div className="absolute -top-10 right-0 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

            {/* top row */}
            <div className="relative flex items-center gap-4">

              {/* IMAGE */}
              <div className="relative flex-shrink-0">

                {/* outer ring */}
                <div className="absolute inset-0 scale-[1.12] rounded-[38%_62%_58%_42%/45%_38%_62%_55%] border border-sky-400/10" />

                {/* organic shape */}
                <div
                  className="
                    relative
                    h-20
                    w-16
                    sm:h-24
                    sm:w-20
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#101010]
                    shadow-[0_18px_34px_rgba(0,0,0,0.35)]

                    rounded-[38%_62%_58%_42%/45%_38%_62%_55%]
                  "
                >
                  <img
                    src={profileImageSrc}
                    alt={`${personalInfo.name} profile`}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-center
                      scale-[1.08]
                    "
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_45%,rgba(0,0,0,0.18))]" />
                </div>
              </div>

              {/* TEXT */}
              <div className="min-w-0 flex-1">

                <h1
                  className="
                    text-[1.9rem]
                    sm:text-[2rem]
                    font-bold
                    leading-[0.92]
                    tracking-[-0.05em]
                    text-white
                  "
                >
                  Hemanth
                  <br />
                  Goshika
                </h1>

                <div className="mt-2 h-[3px] w-12 rounded-full bg-sky-500" />

                <p
                  className="
                    mt-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.24em]
                    text-white/70
                  "
                >
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* SUMMARY */}
            <p
              className="
                mt-4
                text-[13px]
                leading-relaxed
                text-white/72
              "
            >
            Exploring & experimenting by breaking things early,
            figuring them out along the way. Interested not just in software,
            but also in workflows, product designs, and solving real business problems.
            </p>
          </div>

          {/* CTA */}
          <button
            id="btn-direct-contact"
            type="button"
            onClick={() =>
              openWhatsapp(
                'Hi Hemanth, I saw your portfolio and would like to discuss a project.'
              )
            }
            className="
              group
              mt-4
              inline-flex
              w-full
              items-center
              justify-between
              overflow-hidden
              rounded-full
              bg-[#FF6B00]
              px-5
              py-3
              text-white
              transition-all
              duration-300
              hover:bg-[#ff7f24]
            "
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]">
              Initiate Conversation
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">

        {/* CONTACTS */}
        <div className="grid grid-cols-1 gap-2.5">

          <a
            href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white/75
              transition-all
              duration-200
              hover:border-sky-400/30
              hover:bg-white/[0.07]
            "
          >
            <Phone className="h-4 w-4 text-white/40" />

            <span className="font-mono text-[11px]">
              {personalInfo.phone}
            </span>
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white/75
              transition-all
              duration-200
              hover:border-sky-400/30
              hover:bg-white/[0.07]
            "
          >
            <Mail className="h-4 w-4 text-white/40" />

            <span className="font-mono text-[11px] truncate">
              {personalInfo.email}
            </span>
          </a>

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white/75
            "
          >
            <MapPin className="h-4 w-4 text-emerald-300" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
              Based in Hyderabad
            </span>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="flex items-center gap-3 pt-1">

          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              p-2.5
              text-white/80
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white/10
            "
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              p-2.5
              text-white/80
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white/10
            "
          >
            <Github className="w-4 h-4" />
          </a>

          <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            Connect
          </span>
        </div>
      </div>
    </aside>
  );
}
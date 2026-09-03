import Image, { type StaticImageData } from "next/image";

import ft from "@/imgs/logos/ft.webp";
import usp from "@/imgs/logos/usp.webp";
import ita from "@/imgs/logos/ita.webp";
import imes from "@/imgs/logos/imes.webp";
import sciences from "@/imgs/logos/sciences.webp";

import styles from "./Partners.module.css";

const partners: { src: StaticImageData; alt: string; size: string }[] = [
  { src: ft, alt: "FT UNICAMP", size: styles.ft },
  { src: usp, alt: "POLI USP", size: styles.usp },
  { src: ita, alt: "ITA", size: styles.ita },
  { src: imes, alt: "IMES", size: styles.imes },
  { src: sciences, alt: "Sciences Po Paris", size: styles.sciences },
];

export function Partners() {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <div>
          <p className={styles.title}>
            Grupo de Engenharia de Sistemas Complexos
          </p>
          <br />
        </div>
        <div className={styles.logos}>
          {partners.map((partner) => (
            <Image
              key={partner.alt}
              src={partner.src}
              alt={partner.alt}
              sizes="250px"
              className={`${styles.logo} ${partner.size}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

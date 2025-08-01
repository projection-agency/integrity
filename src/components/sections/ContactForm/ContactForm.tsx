import React, { JSX } from 'react'
import styles from './ContactForm.module.css'
import Image from 'next/image'
import Link from 'next/link'
import FillForm from '@/components/FillForm/FillForm'

const ContactForm = () => {
  const whatsapp = (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
      <path d="M9.80884 35.6215C12.5377 37.1333 15.6719 38 19.0092 38C29.5002 38 38 29.4818 38 18.9907C38 8.49971 29.5002 0 19.0092 0C8.51821 0 0 8.49971 0 18.9907C0 22.3649 0.885071 25.4992 2.41532 28.2465L0 38L9.80884 35.6215ZM10.8598 10.6016C11.3022 10.1775 11.9477 10.0116 12.5377 10.1407L13.146 10.2698C13.7545 10.3987 14.2523 10.8045 14.4921 11.3575L15.6904 14.0126C15.9855 14.6579 15.8749 15.4323 15.3954 15.967L14.6579 16.8336C14.4183 17.1101 14.363 17.5341 14.5473 17.8661C16.7229 21.7748 19.5807 23.0471 20.8529 23.4341C21.2217 23.5633 21.6458 23.3974 21.8486 23.0654L22.3833 22.2358C22.8996 21.443 23.9136 21.1663 25.0383 21.7195L27.2508 22.8258C28.099 23.2314 28.4861 24.2269 28.1727 25.112C27.0481 28.3754 24.1718 27.9698 24.1718 27.9698C17.7924 27.8039 12.7957 21.9223 10.6386 18.8986C9.64292 17.4788 9.0345 15.7642 9.21882 14.0126C9.40329 12.2794 10.2146 11.1916 10.8598 10.6016Z" />
    </svg>
  )

  const linkedin = (
    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38">
      <g clip-path="url(#clip0_1374_6439)">
        <path d="M38.6668 37.9981L38.6763 37.9965V24.06C38.6763 17.2422 37.2085 11.9902 29.238 11.9902C25.4064 11.9902 22.835 14.0929 21.7853 16.0863H21.6744V12.6267H14.1172V37.9965H21.9864V25.4343C21.9864 22.1267 22.6134 18.9284 26.7094 18.9284C30.7454 18.9284 30.8055 22.7031 30.8055 25.6465V37.9981H38.6668Z" />
        <path d="M1.30469 12.6289H9.18336V37.9987H1.30469V12.6289Z" />
        <path d="M5.23895 0C2.71986 0 0.675781 2.04408 0.675781 4.56317C0.675781 7.08225 2.71986 9.16908 5.23895 9.16908C7.75803 9.16908 9.80212 7.08225 9.80212 4.56317C9.80053 2.04408 7.75645 0 5.23895 0Z" />
      </g>
      <defs>
        <clipPath id="clip0_1374_6439">
          <rect width="38" height="38" transform="translate(0.675781)" />
        </clipPath>
      </defs>
    </svg>
  )

  const x = (
    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6937 0L21.4257 13.8729L33.5428 0H36.7836L22.908 15.9866L38.3516 38H26.8006L16.5653 23.2945L3.80126 38H0.351562L15.0713 21.1484L0.351562 0H11.6937ZM5.40028 2.57831L16.9331 19.0174L16.9395 19.0093L18.4306 21.1444L18.4271 21.149L19.9323 23.2945L20.3916 23.9518L20.3927 23.9506L28.4407 35.4228L33.1075 35.4234L23.6031 21.7687L23.6084 21.7658L21.4638 18.6951L21.0603 18.1153L21.0591 18.1159L19.5756 15.9912L19.5797 15.9872L10.2472 2.57831H5.40028Z"
      />
    </svg>
  )

  const youtube = (
    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38">
      <g clip-path="url(#clip0_1374_4761)">
        <path d="M37.191 9.38695L37.2385 9.69729C36.7793 8.06804 35.5396 6.81087 33.9641 6.35329L33.9309 6.34537C30.9685 5.54104 19.0476 5.54104 19.0476 5.54104C19.0476 5.54104 7.15672 5.5252 4.16422 6.34537C2.55872 6.81087 1.31738 8.06804 0.866133 9.66404L0.858216 9.69729C-0.248534 15.478 -0.256451 22.4241 0.907299 28.6134L0.858216 28.2999C1.31738 29.9291 2.55713 31.1863 4.13255 31.6439L4.1658 31.6518C7.12505 32.4577 19.0491 32.4577 19.0491 32.4577C19.0491 32.4577 30.9384 32.4577 33.9325 31.6518C35.5395 31.1863 36.7809 29.9291 37.2321 28.3331L37.24 28.2999C37.7435 25.6114 38.0317 22.5175 38.0317 19.3572C38.0317 19.2416 38.0317 19.1245 38.0301 19.0073C38.0317 18.8996 38.0317 18.7714 38.0317 18.6431C38.0317 15.4812 37.7435 12.3874 37.191 9.38695ZM15.2444 24.7801V13.2329L25.1656 19.0152L15.2444 24.7801Z" />
      </g>
      <defs>
        <clipPath id="clip0_1374_4761">
          <rect width="38" height="38" transform="translate(0.03125)" />
        </clipPath>
      </defs>
    </svg>
  )

  const iconMap: Record<string, JSX.Element> = {
    whatsapp,
    linkedin,
    x,
    youtube,
  }

  const socials = ['whatsapp', 'linkedin', 'x', 'youtube']

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowLayout}>
        {/* TalkToExpertBlock */}
        <div className={styles.expertBlock}>
          <div className={styles.expertCard}>
            <div className={styles.expertAvatarWrapper}>
              <Image
                src="/images/icons/frame.png"
                alt="Avatar"
                className={styles.expertAvatar}
                width={98}
                height={98}
              />
              <Image
                src="/images/icons/chatWhite.svg"
                alt="Chat"
                className={styles.expertChatIcon}
                width={98}
                height={98}
              />
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={styles.contactItems}>
              <div className={`${styles.contactItem} ${styles.phone}`}>
                <div className={styles.contactInfo}>
                  <p>
                    <span>{phone}</span> Phone:
                  </p>
                  <Link href={'tel:+380639304403'}>+38 (063) 930 44 03</Link>
                </div>
              </div>
              <div className={`${styles.contactItem} ${styles.email}`}>
                <div className={styles.contactInfo}>
                  <p>
                    <span>{email}</span> E-mail:
                  </p>
                  <Link href={'mailto:info@integritymarketingsystem.com'}>
                    info@integritymarketingsystem.com
                  </Link>
                </div>
              </div>
            </div>
            <ul className={styles.socialsList}>
              {socials.map((item, idx) => {
                return <li key={idx}>{iconMap[item]}</li>
              })}
            </ul>
          </div>
        </div>
        <FillForm />
      </div>
    </div>
  )
}

export default ContactForm

const phone = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <g clip-path="url(#clip0_1252_9198)">
      <path
        d="M5.76137 7.38022C4.73239 6.53412 4.04533 5.49006 3.68412 4.89599L3.41468 4.38804C3.50889 4.28696 4.22732 3.51766 4.53865 3.10026C4.9299 2.57612 4.36265 2.10275 4.36265 2.10275C4.36265 2.10275 2.76653 0.506406 2.40277 0.189753C2.03901 -0.127343 1.62028 0.0487725 1.62028 0.0487725C0.855748 0.54276 0.0631744 0.972242 0.0156266 3.03774C0.0138533 4.97158 1.48185 6.96615 3.06933 8.51029C4.65935 10.2541 6.84245 12.002 8.95306 12C11.0183 11.9529 11.4477 11.1604 11.9417 10.3959C11.9417 10.3959 12.1179 9.97751 11.8012 9.61342C11.4842 9.24944 9.88761 7.65299 9.88761 7.65299C9.88761 7.65299 9.41457 7.08563 8.89033 7.4772C8.49964 7.76925 7.79806 8.41885 7.62904 8.57634C7.62937 8.5769 6.45575 7.95124 5.76137 7.38022Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1252_9198">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const email = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.963767 1.92085L4.5702 5.52885C5.35678 6.31391 6.64255 6.31459 7.42977 5.52885L11.0362 1.92085C11.0725 1.88453 11.0672 1.82472 11.0251 1.79534C10.6573 1.5388 10.2097 1.38672 9.72762 1.38672H2.27238C1.79026 1.38672 1.34271 1.53883 0.974874 1.79534C0.93274 1.82472 0.927447 1.88453 0.963767 1.92085ZM0 3.65907C0 3.27997 0.0939936 2.92177 0.259558 2.60694C0.285449 2.55769 0.351075 2.54773 0.390419 2.58707L3.9512 6.14785C5.07878 7.27708 6.92054 7.27773 8.0488 6.14785L11.6096 2.58707C11.6489 2.54773 11.7146 2.55769 11.7404 2.60694C11.906 2.92177 12 3.27999 12 3.65907V8.40274C12 9.65667 10.98 10.6751 9.72762 10.6751H2.27238C1.02003 10.6751 0 9.65667 0 8.40274V3.65907Z"
      fill="white"
    />
  </svg>
)

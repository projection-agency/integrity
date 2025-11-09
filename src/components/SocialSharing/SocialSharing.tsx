'use client'

import { useState } from 'react'
import s from './SocialSharing.module.css'
import { useCustomToastContext } from '@/contexts/CustomToastProvider'

interface SocialSharingProps {
  title: string
  url: string
}

const copyLink = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
    <mask
      id="mask0_1941_4848"
      style={{ maskType: 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="19"
      height="18"
    >
      <path d="M18 0.5V17.5H1V0.5H18Z" fill="white" stroke="white" />
    </mask>
    <g mask="url(#mask0_1941_4848)">
      <path
        d="M8 9.74997C8.32209 10.1806 8.73302 10.5369 9.20491 10.7947C9.67681 11.0525 10.1986 11.2058 10.735 11.2442C11.2713 11.2826 11.8097 11.2052 12.3135 11.0173C12.8173 10.8294 13.2748 10.5353 13.655 10.155L15.905 7.90497C16.5881 7.19772 16.9661 6.25046 16.9575 5.26722C16.949 4.28398 16.5546 3.34343 15.8593 2.64815C15.164 1.95287 14.2235 1.55849 13.2403 1.54995C12.257 1.5414 11.3098 1.91938 10.6025 2.60247L9.3125 3.88497"
        stroke="#222222"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0007 8.24992C10.6786 7.81933 10.2676 7.46304 9.79573 7.20522C9.32383 6.9474 8.80201 6.79409 8.26565 6.75567C7.7293 6.71726 7.19095 6.79465 6.68713 6.98259C6.18331 7.17053 5.72581 7.46462 5.34564 7.84492L3.09564 10.0949C2.41255 10.8022 2.03457 11.7494 2.04311 12.7327C2.05166 13.7159 2.44604 14.6565 3.14132 15.3517C3.8366 16.047 4.77715 16.4414 5.76039 16.45C6.74362 16.4585 7.69088 16.0805 8.39814 15.3974L9.68064 14.1149"
        stroke="#222222"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

const linkedin = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
    <g clipPath="url(#clip0_1941_3049)">
      <path
        d="M18.4959 17.9992L18.5004 17.9984V11.3969C18.5004 8.16744 17.8052 5.67969 14.0297 5.67969C12.2147 5.67969 10.9967 6.67569 10.4994 7.61994H10.4469V5.98119H6.86719V17.9984H10.5947V12.0479C10.5947 10.4812 10.8917 8.96619 12.8319 8.96619C14.7437 8.96619 14.7722 10.7542 14.7722 12.1484V17.9992H18.4959Z"
        fill="#222222"
      />
      <path d="M0.796875 5.98242H4.52888V17.9997H0.796875V5.98242Z" fill="#222222" />
      <path
        d="M2.6615 0C1.46825 0 0.5 0.96825 0.5 2.1615C0.5 3.35475 1.46825 4.34325 2.6615 4.34325C3.85475 4.34325 4.823 3.35475 4.823 2.1615C4.82225 0.96825 3.854 0 2.6615 0Z"
        fill="#222222"
      />
    </g>
    <defs>
      <clipPath id="clip0_1941_3049">
        <rect width="18" height="18" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
)

const facebook = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <mask
      id="mask0_1941_10664"
      style={{ maskType: 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
    >
      <path d="M17.668 0.5H0.667969V17.5H17.668V0.5Z" fill="white" />
    </mask>
    <g mask="url(#mask0_1941_10664)">
      <path
        d="M6.99756 7.8441C7.24583 7.8441 7.4471 7.64283 7.4471 7.39456V4.98623C7.4471 4.03548 7.8108 3.12698 8.45307 2.45974C9.09477 1.79308 9.96137 1.42188 10.8612 1.42188H12.7299V3.73392H10.8612C10.5314 3.73392 10.2187 3.8702 9.99092 4.10684C9.76371 4.34289 9.63894 4.65951 9.63894 4.98623V7.39456C9.63894 7.64283 9.8402 7.8441 10.0885 7.8441H12.6089L12.0525 10.1562H10.0885C9.8402 10.1562 9.63894 10.3574 9.63894 10.6057V16.5784H7.4471V10.6057C7.4471 10.3574 7.24583 10.1562 6.99756 10.1562H5.12891V7.8441H6.99756Z"
        fill="#222222"
        stroke="#222222"
        strokeWidth="0.899069"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

const whatsapp = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
    <path
      d="M5.1463 16.8734C6.43891 17.5895 7.92355 18 9.50435 18C14.4738 18 18.5 13.9651 18.5 8.9956C18.5 4.02618 14.4738 0 9.50435 0C4.53494 0 0.5 4.02618 0.5 8.9956C0.5 10.5939 0.919244 12.0786 1.6441 13.3799L0.5 18L5.1463 16.8734ZM5.64413 5.02181C5.85369 4.82092 6.15942 4.74233 6.43891 4.8035L6.72706 4.86463C7.01529 4.92572 7.25111 5.1179 7.36466 5.37988L7.9323 6.63755C8.07206 6.9432 8.01968 7.31002 7.79257 7.5633L7.44321 7.97379C7.3297 8.10477 7.30352 8.30562 7.39083 8.46288C8.42138 10.3144 9.77508 10.917 10.3777 11.1004C10.5524 11.1615 10.7533 11.083 10.8493 10.9257L11.1026 10.5327C11.3472 10.1572 11.8275 10.0262 12.3602 10.2882L13.4083 10.8122C13.81 11.0043 13.9934 11.4759 13.845 11.8952C13.3122 13.441 11.9498 13.2489 11.9498 13.2489C8.92796 13.1702 6.56112 10.3842 5.53932 8.95197C5.0677 8.27945 4.7795 7.46724 4.86681 6.63754C4.95419 5.81655 5.33848 5.3013 5.64413 5.02181Z"
      fill="#222222"
    />
  </svg>
)

const twitter = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.8726 0L10.4825 6.57137L16.2221 0H17.7573L11.1846 7.57259L18.5 18H13.0285L8.18019 11.0342L2.13407 18H0.5L7.47249 10.0177L0.5 0H5.8726ZM2.8915 1.22131L8.3544 9.00822L8.35746 9.00439L9.06377 10.0157L9.0621 10.0179L9.77508 11.0342L9.99264 11.3456L9.99319 11.345L13.8054 16.7792L16.016 16.7795L11.5139 10.3115L11.5164 10.3101L10.5006 8.85556L10.3094 8.58093L10.3088 8.5812L9.60614 7.57478L9.60809 7.57286L5.18741 1.22131H2.8915Z"
      fill="#222222"
    />
  </svg>
)

const telegram = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
    <g clipPath="url(#clip0_1941_2919)">
      <path
        d="M7.33863 11.8632L7.05742 16.8888C7.45975 16.8888 7.63401 16.6692 7.84297 16.4055L9.72931 14.115L13.638 17.7519C14.3549 18.2595 14.8599 17.9922 15.0533 16.914L17.619 1.63926C17.8463 0.292864 17.2364 -0.234534 16.538 0.0957643L1.4572 7.43162C0.427964 7.93922 0.443548 8.66822 1.28223 8.99852L5.13778 10.5222L14.0935 3.40235C14.515 3.04775 14.8982 3.24395 14.583 3.59855L7.33863 11.8632Z"
        fill="#222222"
      />
    </g>
    <defs>
      <clipPath id="clip0_1941_2919">
        <rect width="18" height="18" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
)

export function SocialSharing({ title, url }: SocialSharingProps) {
  const [copied, setCopied] = useState(false)
  const { showSuccessToast } = useCustomToastContext()

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      showSuccessToast('Link copied!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    let shareUrl = ''

    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        break
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        break
      default:
        return
    }

    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <ul className={s.socialsList}>
      <li>
        <button
          onClick={handleCopyLink}
          className={s.socialButton}
          title={copied ? 'Link copied!' : 'Copy link'}
        >
          {copyLink}
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShare('linkedin')}
          className={s.socialButton}
          title="Share on LinkedIn"
        >
          {linkedin}
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShare('facebook')}
          className={s.socialButton}
          title="Share on Facebook"
        >
          {facebook}
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShare('whatsapp')}
          className={s.socialButton}
          title="Share on WhatsApp"
        >
          {whatsapp}
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShare('twitter')}
          className={s.socialButton}
          title="Share on Twitter"
        >
          {twitter}
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShare('telegram')}
          className={s.socialButton}
          title="Share on Telegram"
        >
          {telegram}
        </button>
      </li>
    </ul>
  )
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import '../Sass/ShareBtns.scss'
import { useTranslation } from 'react-i18next'

interface Props {
  lives: number
}

function ShareBtns ({ lives }: Props) {
  const { t } = useTranslation()
  const winMsg = t('win_share_msg', { lives: lives })
  const loseMsg = t('lose_share_msg')
  const pageUrl = encodeURI(document.location.href)
  const pageTittle = lives > 0 ? encodeURI(winMsg) : encodeURI(loseMsg)
  const pageTittleAlt = lives > 0 ? winMsg : loseMsg

  const share = () => {
    void navigator.share({
      title: 'Give Me a Beer',
      text: pageTittleAlt,
      url: pageUrl
    })
  }

  return (
    <div className='share-btn-container'>
      <a href={`https://twitter.com/share?text=${pageTittle}&url=${pageUrl}`}><FontAwesomeIcon className='icon twitter' icon={faTwitter} /></a>
      <a href={`https://telegram.me/share/url?url=${pageUrl}&text=${pageTittle}`} target='_blank' rel='noreferrer'><FontAwesomeIcon className='icon telegram' icon={faTelegram} /></a>
      <a href={`https://api.whatsapp.com/send?text=${pageTittle} ${pageUrl}`} target='_blank' rel='noreferrer'><FontAwesomeIcon className='icon whatsapp' icon={ faWhatsapp} /></a>
      <button onClick={share} className='no-style' ><FontAwesomeIcon className='icon share' icon={faShare} /></button>
    </div>
  )
}

export default ShareBtns

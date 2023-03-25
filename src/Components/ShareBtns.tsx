/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import '../Sass/ShareBtns.scss'

interface Props {
  lives: number
}

function ShareBtns ({ lives }: Props) {
  const pageUrl = encodeURI(document.location.href)
  const pageTittle = lives > 0 ? encodeURI(`He conseguido la cerveza y me han sobrado ${lives} ❤ ¿Puedes hacerlo mejor?`) : encodeURI('¡No he conseguido la cerveza! ¿Puedes hacerlo mejor?')
  const pageTittleAlt = lives > 0 ? `He conseguido la cerveza y me han sobrado ${lives} ❤ ¿Puedes hacerlo mejor?` : '¡No he conseguido la cerveza! ¿Puedes hacerlo mejor?'

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

import './styles.scss';
import kevinPhoto from '../../assets/img/teamPics/kevin.jpg';
// import talelPhoto from '../../assets/img/teamPics/talel.jpg';
// import jasonPhoto from '../../assets/img/teamPics/jason.jpg';
// import guillaumePhoto from '../../assets/img/teamPics/guillaume.jpg';
// import rafaelPhoto from '../../assets/img/teamPics/rafael.jpg';
import twitter from '../../assets/img/iconsSocials/twitter.svg'
import github from '../../assets/img/iconsSocials/github.svg'
import linkedin from '../../assets/img/iconsSocials/linkedin.svg'

export default function Team() {
  return (
    <div className='team-container'>
      <div className='team-container-background'>
      <h1 className='page-title'>PrU+00e9sentation de l'U+00e9quipe</h1>
      <article className='team-card'>
        <div className='team-card-infos-container'>
          <div className='team-card-picture-frame'>
              <img className='team-card-picture' src={kevinPhoto} alt="photo de la personne" />
          </div>
          <section className='team-card-infos'>
            <h2 className='team-card-name'>Kevin Sotomayor</h2>
              <div className='team-card-social-links'>
                <a className='team-card-social-link' href="">
                  <img className='team-card-social-img' src={github} alt="" />
                </a>
                <a className='team-card-social-link' href="">
                  <img className='team-card-social-img' src={linkedin} alt="" />
                </a><a className='team-card-social-link' href="">
                  <img className='team-social-img' src={twitter} alt="" />
                </a>
              </div>
            </section>
        </div>
        <div className='team-description'>
          <p className='team-description-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iusto corporis quos iste quod, at ratione libero odio modi ut! Eaque, vitae. Accusamus expedita beatae alias doloribus illum enim consectetur.</p>
        </div>
      </article>

      
      
      </div>
    </div>
  )
}
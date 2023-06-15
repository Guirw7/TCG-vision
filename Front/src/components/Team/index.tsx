import './styles.scss';
import kevinPhoto from '../../assets/img/teamPics/kevin.jpg';
import talelPhoto from '../../assets/img/teamPics/talel.jpg';
import jasonPhoto from '../../assets/img/teamPics/jason.jpg';
import guillaumePhoto from '../../assets/img/teamPics/guillaume.png';
import rafaelPhoto from '../../assets/img/teamPics/rafael.jpg';
import twitter from '../../assets/img/iconsSocials/twitter.svg'
import github from '../../assets/img/iconsSocials/github.svg'
import linkedin from '../../assets/img/iconsSocials/linkedin.svg'

export default function Team() {
  return (
    <div className='team-container'>
      <div className='team-container-background'>
      <h1 className='page-title'>Présentation de l'équipe</h1>
{/* Kevin */}
      <article className='team-card'>
        <div className='team-card-infos-container'>
          <div className='team-card-picture-frame'>
              <img className='team-card-picture' src={kevinPhoto} alt="photo de la personne" />
          </div>
          <section className='team-card-infos'>
            <h2 className='team-card-name'>Kevin Sotomayor</h2>
              <div className='team-card-social-links'>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={github} alt="" />
                </a>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={linkedin} alt="" />
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
{/* Talel */}
      <article className='team-card'>
        <div className='team-card-infos-container'>
          <div className='team-card-picture-frame'>
              <img className='team-card-picture' src={talelPhoto} alt="photo de la personne" />
          </div>
          <section className='team-card-infos'>
            <h2 className='team-card-name'>Talel Jandoubi</h2>
              <div className='team-card-social-links'>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={github} alt="" />
                </a>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={linkedin} alt="" />
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
{/* Rafael */}
      <article className='team-card'>
        <div className='team-card-infos-container'>
          <div className='team-card-picture-frame'>
              <img className='team-card-picture' src={rafaelPhoto} alt="photo de la personne" />
          </div>
          <section className='team-card-infos'>
            <h2 className='team-card-name'>Rafael Filipe</h2>
              <div className='team-card-social-links'>
                <a className='team-card-social-link' href="https://github.com/elFilipeLu">
                  <img className='team-social-img' src={github} alt="" />
                </a>
                <a className='team-card-social-link' href="https://www.linkedin.com/in/lrfilipe/">
                  <img className='team-social-img' src={linkedin} alt="" />
                </a>
                {/* <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={twitter} alt="" />
                </a> */}
              </div>
            </section>
        </div>
        <div className='team-description'>
          <p className='team-description-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iusto corporis quos iste quod, at ratione libero odio modi ut! Eaque, vitae. Accusamus expedita beatae alias doloribus illum enim consectetur.</p>
        </div>
      </article>
{/* Jason */}
      <article className='team-card'>
        <div className='team-card-infos-container'>
          <div className='team-card-picture-frame'>
              <img className='team-card-picture' src={jasonPhoto} alt="photo de la personne" />
          </div>
          <section className='team-card-infos'>
            <h2 className='team-card-name'>Jason Daoust</h2>
              <div className='team-card-social-links'>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={github} alt="" />
                </a>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={linkedin} alt="" />
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
{/* Guillaume */}
      <article className='team-card'>
        <div className='team-card-infos-container'>
          <div className='team-card-picture-frame'>
              <img className='team-card-picture' src={guillaumePhoto} alt="photo de la personne" />
          </div>
          <section className='team-card-infos'>
            <h2 className='team-card-name'>Guillaume Barban</h2>
              <div className='team-card-social-links'>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={github} alt="" />
                </a>
                <a className='team-card-social-link' href="">
                  <img className='team-social-img' src={linkedin} alt="" />
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
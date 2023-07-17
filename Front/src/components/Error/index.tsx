// import './styles.scss';

export default function Error () {
  return (
    <div className='error-container'>
      <div className='error-container-background'>
        <h1 className='page-title'>Cette page n'existe pas encore</h1>
        <h2 className='page-subtitle'>Erreur 404</h2>
        <a className='redirection' href="/">Cliquez ici pour retourner sur la page d'accueil</a>
      </div>
    </div>
  )
}

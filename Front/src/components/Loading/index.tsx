import animation from '../../assets/loading.svg'
// import './styles.scss'

export default function loading() {
  return (
    // <div className="loading-container">
    //   <div className='loading-container-background'>
        <img className='loading' src={animation} alt="loading" />
    //   </div>
    // </div>
  )
}

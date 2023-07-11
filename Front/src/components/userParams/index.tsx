import { useEffect, useState } from 'react';
// import { axiosRequest } from '../../utils/axiosRequest';
// import { getIDFromToken } from '../../utils/getIDFromToken';
import './styles.scss'

export default function UserParams(user: any) {

    const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const [newUsername, setNewUsername] = useState<string>(user.user.username);
    const [newEmail, setNewEmail] = useState<string>(user.user.email);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(newUsername, newEmail)  
    }

    const handleChangeUsername = (e: any) => {
        setNewUsername(e.target.value);
    }
      
    const handleChangeEmail = (e: any) => {
        setNewEmail(e.target.value);
    }



    const handleInfoOpen = () => {
        setIsInfoOpen(true);
        setIsPasswordOpen(false);
        setIsDeleteOpen(false);
    }

    const handlePasswordOpen = () => {
        setIsInfoOpen(false);
        setIsPasswordOpen(true);
        setIsDeleteOpen(false);
    }

    const handleDeleteOpen = () => {
        setIsInfoOpen(false);
        setIsPasswordOpen(false);
        setIsDeleteOpen(true);
    }


return (
    <div className='userParams'>

    <div className="userParams-actions">
        <button onClick={handleInfoOpen}>Gerer Mes Informations</button>
        <button onClick={handlePasswordOpen}>Changer Mon Mot de Passe</button>
        <button onClick={handleDeleteOpen}>Supprimer Mon Compte</button>
    </div>
    <div className='userParams-content'>
        {isInfoOpen && 
        <>
            <h1>Infos de L'Utilisateur</h1>
            <form onSubmit={handleSubmit}>
            <h2>Changer mon Username</h2>
            <input type="text" placeholder={user.user.username} defaultValue={user.user.username} onChange={handleChangeUsername}/>
            <h2>Changer Mon Adresse E-mail</h2>
            <input type="text" placeholder={user.user.email} defaultValue={user.user.email} onChange={handleChangeEmail}/>
            <h2>Sauvegarder les Changements?</h2>
            <button >Confirmer</button>
            </form>

        </>
            }
        {isPasswordOpen && <h1>Infos de Mot de Passe</h1>}
        {isDeleteOpen && <h1>Partir</h1>}
    </div>
    </div>
)

}
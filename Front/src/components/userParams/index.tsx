import { useEffect, useState } from 'react';
import { axiosRequest } from '../../utils/axiosRequest';
// import './styles.scss';
import { useNavigate } from 'react-router-dom';

export default function UserParams({ user, setRefresh }: any) {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const [newUsername, setNewUsername] = useState<string>(user.username);
  const [newEmail, setNewEmail] = useState<string>(user.email);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newUsername !== user.username || newEmail !== user.email) {
      const url = `https://daoust-jason-server.eddi.cloud/private/profil/${user.id}`;
      axiosRequest('put', url, {
        data: {
          username: newUsername,
          email: newEmail,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      })
        .then((data) => {
          // console.log(data);
          setConfirmMessage(true);
          setRefresh(true);
        })
        .catch((error) => {
          console.log('Erreur lors de la requête', error);
        });
    }
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    console.log(currentPassword, newPassword, confirmPassword);
    axiosRequest('post', 'https://daoust-jason-server.eddi.cloud/public/user/login', {
      data: {
        username: user.username,
        password: currentPassword,
      },
    })
      .then(data => {
        if (newPassword === confirmPassword) {
          axiosRequest('put', `https://daoust-jason-server.eddi.cloud/private/profil/${user.id}`, {
            data: {
              password: newPassword,
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
          })
            .then(data => {
              setConfirmMessage(true);
              setRefresh(true);
            })
            .catch(error => {
              console.log('Erreur lors de la requête', error);
              setConfirmMessage(false);
            });
        }
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
        setConfirmMessage(false);
      });
  };

  const handleChangeUsername = (e: any) => {
    setNewUsername(e.target.value);
  };

  const handleChangeEmail = (e: any) => {
    setNewEmail(e.target.value);
  };

  const handleChangeCurrentPassword = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNewPassword = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleInfoOpen = () => {
    setIsInfoOpen(true);
    setIsPasswordOpen(false);
    setIsDeleteOpen(false);
    setConfirmMessage(false);
    setPasswordCheck(false);
  };

  const handlePasswordOpen = () => {
    setIsInfoOpen(false);
    setIsPasswordOpen(true);
    setIsDeleteOpen(false);
    setConfirmMessage(false);
    setPasswordCheck(false);

  };

  const handleDeleteOpen = () => {
    setIsInfoOpen(false);
    setIsPasswordOpen(false);
    setIsDeleteOpen(true);
    setConfirmMessage(false);
    setPasswordCheck(false);

  };

  const passwordChecker = (e: any) => {
    e.preventDefault();
    console.log(currentPassword, newPassword, confirmPassword);
    axiosRequest('post', 'https://daoust-jason-server.eddi.cloud/public/user/login', {
      data: {
        username: user.username,
        password: currentPassword,
      },
    })
      .then(data => {
        setPasswordCheck(true);
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
        setConfirmMessage(false);
      });
  };

  const deleteUserAccount = () => {
    const url = `https://daoust-jason-server.eddi.cloud/private/profil/${user.id}`;
    axiosRequest('delete', url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    })
      .then(data => {
        // console.log(data);
        sessionStorage.removeItem('jwt');
        navigate('/');
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
  }

  return (
    <div className='userParams'>
      <div className='userParams-actions'>
        <button onClick={handleInfoOpen}>Gerer Mes Informations</button>
        <button onClick={handlePasswordOpen}>Changer Mon Mot de Passe</button>
        <button onClick={handleDeleteOpen}>Supprimer Mon Compte</button>
      </div>
      <div className='userParams-content'>
        {isInfoOpen && (
          <>
            <h1>Infos de L'Utilisateur</h1>
            <form onSubmit={handleSubmit}>
              <h2>Changer mon Username</h2>
              <input
                type='text'
                placeholder={user.username}
                defaultValue={user.username}
                onChange={handleChangeUsername}
              />
              <h2>Changer Mon Adresse E-mail</h2>
              <input
                type='text'
                placeholder={user.email}
                defaultValue={user.email}
                onChange={handleChangeEmail}
              />
              <h2>Sauvegarder les Changements?</h2>
              <button>Confirmer</button>
            </form>
          </>
        )}
        {isPasswordOpen && (
          <>
            <h1>Infos de Mot de Passe</h1>
            <form onSubmit={handlePasswordSubmit}>
              <h2>Mon mot de passe actuel</h2>
              <input
                type='password'
                placeholder='Mot de passe actuel'
                value={currentPassword}
                onChange={handleChangeCurrentPassword}
              />
              <h2>Mon nouveau mot de passe</h2>
              <input
                type='password'
                placeholder='Nouveau mot de passe'
                value={newPassword}
                onChange={handleChangeNewPassword}
              />
              <h2>Confirmer le nouveau mot de passe</h2>
              <input
                type='password'
                placeholder='Confirmer le mot de passe'
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
              <h2>Sauvegarder les Changements?</h2>
              <button type="submit">Confirmer</button>
            </form>
          </>
        )}
        {isDeleteOpen && (
          <>
          <h1>Supprimer mon compte</h1>
          <h2>Pour continuer entrez votre mot de passe</h2>
          <form onSubmit={passwordChecker}>
            <input
                  type='password'
                  placeholder='Mot de passe actuel'
                  value={currentPassword}
                  onChange={handleChangeCurrentPassword}
                  />
            <button type="submit">Confirmer</button>
          </form>
          </>
        )}
        {passwordCheck && (
          <>
          <h2>Cliquez sur confirmer pour supprimmer votre compte</h2>
          <p>Attention, ce changement est irreversible!</p>
          <button onClick={deleteUserAccount}>Supprimmer</button>
          </>
        )}
      </div>
      {confirmMessage && newPassword === confirmPassword && (
        <p>Les changements ont été sauvegardés</p>
      )}
    </div>
  );
}

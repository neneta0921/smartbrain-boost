import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, loadUser, toggleModal, user }) => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pet, setPet] = useState('');

  const onFormChange = (event) => {
    switch(event.target.name) {
      case 'user-name':
        setName(event.target.value)
        break;
      case 'user-age':
        setAge(event.target.value)
        break;
      case 'user-pet':
        setPet(event.target.value)
        break;
      default:
        return;
    }
  }

  const updateUser = (name, age, pet) => {
    user.name = name;
    user.age = age;
    user.pet = pet
  }

  const onProfileUpdate = (data) => {
    updateUser(data.name, data.age, data.pet)
    fetch(`http://localhost:3000/profile/${user.id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formInput: data })
    }).then(resp => {
        toggleModal();
        loadUser(user)
    }).catch(console.log)
  }

  return (
    <div className="profile-modal">
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib" alt="avatar" />
          <h2>{name || user.name}</h2>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr/>
          <label className="mt2 fw6" htmlFor="user-name">Name :</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="user-age">Age :</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.age || age}
            type="text"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw6" htmlFor="user-pet">Pet :</label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.pet || pet}
            type="text"
            name="user-pet"
            id="pet"
          />
          <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => onProfileUpdate({name, age, pet})}>
              Save
            </button>
            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>
    </div>
  )
}

export default Profile
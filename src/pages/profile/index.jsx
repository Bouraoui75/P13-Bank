import style from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUser } from '../../tools/slices/profileSlice';
import { editName } from '../../tools/slices/profileSlice';

import EditName from '../../components/user/edit/name';
import ShowName from '../../components/user/show/name';
import { Base } from '../../layout/base';

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load user data from DB 
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // To display user name based on DB
  useEffect(() => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
  }, [profile.firstName, profile.lastName, profile]);

  const handleEditName = () => {
    setIsEditing(true);
  };

  // To update user name in DB
  const handleSubmit = (e) => {
    dispatch(editName({ firstName, lastName }));
    setIsEditing(false);
  };

  // To cancel editing user name, so the input fields will be hidden
  const handleCancel = (e) => {
    setIsEditing(false);
  };

  return (
    <Base>
      <main className={`background ${style.containerProfile}`}>
        <div className={style.header}>
          <h1>
            Welcome back
            <br />
            {!isEditing ? (
              <>
                <ShowName firstName={firstName} lastName={lastName} />
                <button className={style.editButton} onClick={handleEditName}>
                  Update information
                </button>
              </>
            ) : (
              <EditName
                firstName={firstName}
                lastName={lastName}
                onClickCancel={handleCancel}
                save={handleSubmit}
                firstNameOnChange={(e) => {
                  setFirstName(e.target.value);
                }}
                lastNameOnChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            )}
          </h1>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className={style.account}>
          <div className={style.accountContentWrapper}>
            <h3 className={style.accountTitle}>Argent Bank Checking (x8349)</h3>
            <p className={style.accountAmount}>$2,082.79</p>
            <p className={style.accountAmountDescription}>Available Balance</p>
          </div>
          <div className={`${style.accountContentWrapper} ${style.cta}`}>
            <button className={style.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
        <section className={style.account}>
          <div className={style.accountContentWrapper}>
            <h3 className={style.accountTitle}>Argent Bank Savings (x6712)</h3>
            <p className={style.accountAmount}>$10,928.42</p>
            <p className={style.accountAmountDescription}>Available Balance</p>
          </div>
          <div className={`${style.accountContentWrapper} ${style.cta}`}>
            <button className={style.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
        <section className={style.account}>
          <div className={style.accountContentWrapper}>
            <h3 className={style.accountTitle}>
              Argent Bank Credit Card (x8349)
            </h3>
            <p className={style.accountAmount}>$184.30</p>
            <p className={style.accountAmountDescription}>Current Balance</p>
          </div>
          <div className={`${style.accountContentWrapper} ${style.cta}`}>
            <button className={style.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
      </main>
    </Base>
  );
};

export default Profile;

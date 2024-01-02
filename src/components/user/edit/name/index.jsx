import style from './usernameEdit.module.scss';

const UsernameEdit = ({
  firstName,
  lastName,
  firstNameOnChange,
  save,
  lastNameOnChange,
  onClickCancel,
}) => {
  return (
    <div>
      <form className={style.container}>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder={firstName}
            onChange={firstNameOnChange}
          />
          <button onClick={save}>
            Save
          </button>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder={lastName}
            onChange={lastNameOnChange}
          />
          <button onClick={onClickCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsernameEdit;

import style from './usernameShow.module.scss';

const UsernameShow = (props) => {
  return (
    <div className={style.container}>
      <span>{props.firstName} {props.lastName}</span>
    </div>
  );
};

export default UsernameShow;

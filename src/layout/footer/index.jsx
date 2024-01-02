import style from './footer.module.scss';

const Footer = () => {

  const date = new Date().getFullYear();

  return (
    <footer>
      <p className={style.content}>{`Copyright ${date} Argent Bank`}</p>
    </footer>
  );
};

export default Footer;

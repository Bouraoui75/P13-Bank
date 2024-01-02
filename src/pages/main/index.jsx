import style from './main.module.scss';
import iconChat from '../../assets/icon-chat.png';
import iconMoney from '../../assets/icon-money.png';
import iconSecurity from '../../assets/icon-security.png';
import { Base } from '../../layout/base';

const Main = (props) => {
  return (
    <Base>
      <main>
        <div className={style.hero}>
          <section className={style.heroContent}>
            <h2 className="srOnly">Promoted Content</h2>
            <p className={style.subtitle}>No fees.</p>
            <p className={style.subtitle}>No minimum deposit.</p>
            <p className={style.subtitle}>High interest rates.</p>
            <p className={style.text}>
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className={style.features}>
          <h2 className="srOnly">Features</h2>
          <div className={style.featureItem}>
            <img src={iconChat} alt="Chat Icon" className={style.featureIcon} />
            <h3 className={style.featureItemTitle}>You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className={style.featureItem}>
            <img
              src={iconMoney}
              alt="Chat Icon"
              className={style.featureIcon}
            />
            <h3 className={style.featureItemTitle}>
              More savings means higher rates
            </h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className={style.featureItem}>
            <img
              src={iconSecurity}
              alt="Chat Icon"
              className={style.featureIcon}
            />
            <h3 className={style.featureItemTitle}>Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>
    </Base>
  );
};

export default Main;

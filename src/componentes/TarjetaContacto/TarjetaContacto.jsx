import styles from './TarjetaContacto.module.css';

export function TarjetaContacto({ nombre, email, puesto, foto }) {
  return (
    <div className={styles.tarjeta}>
      <img src={foto} alt={`Foto de ${nombre}`} className={styles.avatar} />
      <div className={styles.cuerpo}>
        <h4 className={styles.nombre}>{nombre}</h4>
        <span className={styles.insignia}>{puesto}</span>
        <p className={styles.email}>✉️ {email}</p>
      </div>
    </div>
  );
}
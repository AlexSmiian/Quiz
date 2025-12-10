import styles from './buttonNextStep.module.scss'


export default function ButtonNextStep({onNext}: {onNext: () => void;}) {
    return (
        <button className={styles.nextButton} onClick={onNext}>
            Далі <span>→</span>
        </button>
    )
}

import { useState } from "react";
import styles from "./emailScreen.module.scss";
import { validateEmail } from "../../../../shared/lib/validation.ts";
import TitleH2 from "../../../../ui/TitleH2";

export default function EmailScreen({
                                        email,
                                        onChange,
                                        onSubmit,
                                    }: {
    email: string;
    onChange: (email: string) => void;
    onSubmit: () => void;
}) {
    const [error, setError] = useState('');
    const inputClasses = [styles.emailInput];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Будь ласка, введіть email');
            return;
        }
        if (!validateEmail(email)) {
            setError('Будь ласка, введіть коректний email');
            return;
        }

        setError('');
        onSubmit();
    };

    if (error) inputClasses.push(styles.emailInputError);

    return (
        <div className={styles.screen}>
            <TitleH2 classModifier={styles.title}>
                Введіть ваш email
            </TitleH2>
            <form className={styles.emailContainer} onSubmit={handleSubmit}>
                <label className={styles.labelWrapper}>
                    <input
                        type="text"
                        value={email}
                        onFocus={() => setError('')}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="example@email.com"
                        className={inputClasses.join(" ")}
                    />
                    {error && <p className={styles.errorText}>{error}</p>}
                </label>

                <button type="submit" className={styles.submitButton}>
                    Завершити квіз
                </button>
            </form>
        </div>
    );
}

import styles from './Input.module.css';

type Props = {
    placeholder:string
    type?:string
    onChange?:React.ChangeEventHandler
}

const Input = ({ placeholder, type , onChange} : Props) => {
    return (
        <div data-testid='inputContainer' className={styles.inputContainer}>
            <input data-testid='input' className={styles.input} placeholder={placeholder} type={type} onChange={onChange} spellCheck='false'/>
        </div>
    )
}

Input.defaultProps = {
    text: '',
    placeholder: 'placeholder',
    type: 'text'
}

export default Input;
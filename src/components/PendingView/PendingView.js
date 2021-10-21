import { ImSpinner} from 'react-icons/im';
import s from './PendingView.module.css';


export default function PendingView(){
    return (
        <div className={s.spinnerBox} role="alert">
            <ImSpinner size="45" className={s.spinner}/>
            Loading...
        </div>
    )
}
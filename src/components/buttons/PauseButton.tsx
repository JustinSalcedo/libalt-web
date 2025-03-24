import PauseIcon from '../icons/PauseIcon'
import {ButtonProps} from './ButtonProps'
import DarkIconButton from './DarkIconButton'

const PauseButton = (props: ButtonProps) => {
    return (
        <DarkIconButton {...props}>
            <PauseIcon />
        </DarkIconButton>
    )
}

export default PauseButton

import StopIcon from '../icons/StopIcon'
import {ButtonProps} from './ButtonProps'
import DarkIconButton from './DarkIconButton'

const StopButton = (props: ButtonProps) => {
    return (
        <DarkIconButton {...props} type="danger">
            <StopIcon />
        </DarkIconButton>
    )
}

export default StopButton

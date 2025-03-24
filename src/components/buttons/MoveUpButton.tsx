import ArrowUpIcon from '../icons/ArrowUpIcon'
import {ButtonProps} from './ButtonProps'
import DarkIconButton from './DarkIconButton'

const MoveUpButton = (props: ButtonProps) => {
    return (
        <DarkIconButton {...props}>
            <ArrowUpIcon />
        </DarkIconButton>
    )
}

export default MoveUpButton

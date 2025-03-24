import ViewIcon from '../icons/ViewIcon'
import {ButtonProps} from './ButtonProps'
import DarkIconButton from './DarkIconButton'

const ViewButton = (props: ButtonProps) => {
    return (
        <DarkIconButton {...props}>
            <ViewIcon />
        </DarkIconButton>
    )
}

export default ViewButton

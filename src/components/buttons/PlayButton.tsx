import PlayIcon from '../icons/PlayIcon'
import {ButtonProps} from './ButtonProps'
import DarkIconButton from './DarkIconButton'

const PlayButton = (props: ButtonProps) => {
    return (
        <DarkIconButton {...props} type="primary">
            <PlayIcon />
        </DarkIconButton>
    )
}

export default PlayButton

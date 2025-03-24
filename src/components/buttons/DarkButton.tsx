import styled from 'styled-components'

type ButtonType = 'primary' | 'secondary' | 'danger'

interface DarkButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    type?: ButtonType
}

const getBackgroundColor = ({disabled, type}: DarkButtonProps) => {
    if (disabled) return '#3e3e3e'
    switch (type) {
        case 'primary':
            return '#0ed00e'
        case 'danger':
            return '#c61584'
        default:
            return 'blue'
    }
}

const getBorderColor = ({disabled, type}: DarkButtonProps) => {
    if (disabled) return 'gray'
    switch (type) {
        case 'primary':
            return 'green'
        case 'danger':
            return 'maroon'
        default:
            return '#2424ff'
    }
}

// blue styled DarkButton component
const DarkButton = styled.button<{disabled?: boolean; type?: ButtonType}>`
    background-color: ${({disabled, type}) =>
        getBackgroundColor({disabled, type})};
    color: azure;
    border-radius: 4px;
    border-color: ${({disabled, type}) => getBorderColor({disabled, type})};
`

export default DarkButton
